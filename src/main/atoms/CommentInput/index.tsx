import React, {
  forwardRef,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  convertToRaw,
  DraftHandleValue,
  EditorProps,
  EditorState,
  KeyBindingUtil,
  RichUtils,
} from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData,
  defaultTheme,
} from '@draft-js-plugins/mention';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import MentionEntry from '@main/atoms/MentionEntry';
import { useCombinedRefs } from '@common/hooks/useCombinedRefs';

const { isSoftNewlineEvent } = KeyBindingUtil;

const linkifyPlugin = createLinkifyPlugin({
  target: '_blank',
  rel: 'noopener noreferrer',
  component(props) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...props} aria-hidden="true" onClick={() => window.open(props.href, '_blank')} />;
  },
});

interface CommentInputProps extends EditorProps {
  onEnterPress?: () => void;
  mentions?: MentionData[];
  autoFocus?: boolean;
}

const CommentInput: React.ForwardRefRenderFunction<Editor, CommentInputProps> = (
  { onEnterPress, mentions, onChange, autoFocus, ...rest },
  ref,
) => {
  const editorRef = useRef<Editor>(null);
  const combinedRef = useCombinedRefs(ref, editorRef);
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

  useEffect(() => {
    if (combinedRef?.current && autoFocus) {
      // Waiting for initializing mentions
      setTimeout(() => combinedRef.current?.focus(), 200);
    }
  }, [autoFocus, combinedRef]);

  const handleReturn = (event: KeyboardEvent): DraftHandleValue => {
    if (event.key === 'Enter' && !isSoftNewlineEvent(event)) {
      const isMentionOpen = openMention && suggestions.length > 0;
      if (onEnterPress && !isMentionOpen) {
        onEnterPress();
        return 'handled';
      }
    }
    return 'not-handled';
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
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
    onChange(state);
  };

  return (
    <div
      ref={containerRef}
      className="editor hide-scrollbar"
      onClick={() => combinedRef.current?.focus()}
      aria-hidden="true"
    >
      <Editor
        ref={combinedRef}
        handleReturn={handleReturn}
        handleKeyCommand={handleKeyCommand}
        editorKey="editor"
        plugins={plugins}
        onChange={handleEditorChange}
        {...rest}
      />
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
