// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import MentionEntry from '@/main/atoms/MentionEntry';
import Editor from '@draft-js-plugins/editor';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createMentionPlugin, {
  defaultSuggestionsFilter,
  defaultTheme,
  MentionData,
} from '@draft-js-plugins/mention';
import {
  ContentBlock,
  ContentState,
  convertToRaw,
  DraftHandleValue,
  EditorProps,
  EditorState,
  KeyBindingUtil,
  Modifier,
  RichUtils,
  SelectionState,
} from 'draft-js';
import React, {
  forwardRef,
  KeyboardEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

const { isSoftNewlineEvent } = KeyBindingUtil;

const linkifyPlugin = createLinkifyPlugin({
  target: '_blank',
  rel: 'noopener noreferrer',
  component(props) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...props} aria-hidden="true" onClick={() => window.open(props.href, '_blank')} />;
  },
});

export const getCurrentBlock = (editorState: EditorState) => {
  if (editorState.getSelection) {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selectionState.getStartKey());
    return block;
  }
};

export const findEntityRanges = (
  type: string,
  contentBlock: ContentBlock,
  contentState: ContentState,
) => {
  const ranges: [number, number][] = [];

  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === type;
    },
    (start, end) => ranges.push([start, end]),
  );

  return ranges;
};

export type ReplaceTextParams = {
  editorState: EditorState;
  entityType?: string;
  start?: number;
  end?: number;
  newText: string;
  data?: any;
  mutability?: 'MUTABLE' | 'IMMUTABLE';
};

export const replaceText = (params: ReplaceTextParams) => {
  const {
    editorState,
    entityType = '',
    start: startParam,
    end: endParam,
    newText,
    mutability = 'IMMUTABLE',
    data,
  } = params;

  const start = startParam ?? editorState.getSelection().getStartOffset();
  const end = endParam ?? editorState.getSelection().getEndOffset();

  const currentBlock = getCurrentBlock(editorState);
  if (!currentBlock) {
    return editorState;
  }
  const blockKey = currentBlock.getKey();

  const isWithEntity = entityType && mutability;

  const contentState = editorState.getCurrentContent();
  const modifiedContentState = isWithEntity
    ? contentState.createEntity(entityType, mutability, data)
    : contentState;
  const entityKey = isWithEntity ? modifiedContentState.getLastCreatedEntityKey() : undefined;

  const contentStateWithReplacedText = Modifier.replaceText(
    modifiedContentState,
    new SelectionState({
      anchorKey: blockKey,
      anchorOffset: start,
      focusKey: blockKey,
      focusOffset: end,
      isBackward: false,
      hasFocus: true,
    }),
    newText,
    undefined,
    entityKey,
  );

  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithReplacedText,
    selection: new SelectionState({
      anchorKey: blockKey,
      anchorOffset: start + newText.length,
      focusKey: blockKey,
      focusOffset: start + newText.length,
      isBackward: false,
      hasFocus: true,
    }),
  });

  return newEditorState;
};

interface CommentInputProps extends Omit<EditorProps, 'editorState' | 'onChange'> {
  onSubmit?: () => void;
  mentions?: MentionData[];
  autoFocus?: boolean;
  value: EditorState;
  onChange: (editorState: EditorState) => void;
}

const CommentInput: React.ForwardRefRenderFunction<Editor, CommentInputProps> = (
  { onSubmit, mentions, onChange, autoFocus, value, ...rest },
  ref,
) => {
  const editorRef = useRef<Editor>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [openMention, setOpenMention] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions || []);
  const [mentioned, setMentioned] = useState<MentionData[]>([]);
  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      entityMutability: 'IMMUTABLE',
      supportWhitespace: true,
      popperOptions: {
        placement: 'top-start',
        modifiers: [
          {
            name: 'offset',
            options: { offset: [0, 5] },
          },
        ],
      },
      theme: {
        ...defaultTheme,
        mentionSuggestionsEntry: 'mention-suggestion-entry',
        mentionSuggestionsEntryFocused: 'mention-suggestion-entry--focused',
        mentionSuggestionsEntryText: 'mention-suggestion-text',
        mentionSuggestionsEntryTextFocused: 'mention-suggestion-text--focused',
        mentionSuggestions: 'mention-suggestion-container',
        mention: 'mention',
      },
    });
    return {
      plugins: [mentionPlugin, linkifyPlugin],
      MentionSuggestions: mentionPlugin.MentionSuggestions,
    };
  }, []);

  const insertText = React.useCallback(
    (text: string) => {
      const newEditorState = replaceText({ editorState: value, newText: text });

      onChange(newEditorState);
    },
    [value, onChange],
  );

  useImperativeHandle(ref, () => ({
    ...(editorRef.current as any),
    insertText,
  }));

  useEffect(() => {
    if (editorRef?.current && autoFocus) {
      // Waiting for initializing mentions
      setTimeout(() => editorRef.current?.focus(), 200);
    }
  }, [autoFocus, editorRef]);

  const handleReturn = (event: KeyboardEvent): DraftHandleValue => {
    if (event.key === 'Enter' && !isSoftNewlineEvent(event)) {
      const isMentionOpen = openMention && suggestions.length > 0;
      if (onSubmit && !isMentionOpen) {
        onSubmit();
        return 'handled';
      }
    }
    return 'not-handled';
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange?.(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const onOpenChange = useCallback((_open: boolean) => {
    setOpenMention(_open);
  }, []);
  const onSearchChange = useCallback(
    ({ value }: { value: string }) => {
      // exclude mentioned items
      const availableMentions = mentions?.filter(
        (mention) => !mentioned.some((item) => item.id === mention.id),
      );
      setSuggestions(defaultSuggestionsFilter(value, availableMentions || []));
    },
    [mentions, mentioned],
  );

  const handleEditorChange = (state: EditorState) => {
    const { entityMap } = convertToRaw(state.getCurrentContent());
    const mentionedData = Object.values(entityMap).map((entity) => entity.data[entity.type]) ?? [];
    setMentioned(mentionedData);
    onChange?.(state);
  };

  return (
    <div
      ref={containerRef}
      className="editor hide-scrollbar"
      onClick={() => editorRef.current?.focus()}
      aria-hidden="true"
    >
      <Editor
        ref={editorRef}
        handleReturn={handleReturn}
        handleKeyCommand={handleKeyCommand}
        editorKey="editor"
        plugins={plugins}
        editorState={value}
        onChange={handleEditorChange}
        {...rest}
      ></Editor>
      <MentionSuggestions
        open={openMention}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        entryComponent={MentionEntry}
      />
    </div>
  );
};

export default React.memo(forwardRef(CommentInput));
