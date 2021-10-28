import React, { KeyboardEvent, useCallback, useMemo, useRef, useState } from 'react';

import { convertToRaw, DraftHandleValue, EditorProps, EditorState, KeyBindingUtil } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData,
  defaultTheme,
} from '@draft-js-plugins/mention';
import MentionEntry from '@main/atoms/MentionEntry';

const { isSoftNewlineEvent } = KeyBindingUtil;

interface CommentInputProps extends EditorProps {
  onEnterPress?: () => void;
  mentions?: MentionData[];
}

const CommentInput: React.VFC<CommentInputProps> = ({
  onEnterPress,
  mentions,
  onChange,
  ...rest
}) => {
  const editorRef = useRef<Editor>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
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
      },
    });
    return { plugins: [mentionPlugin], MentionSuggestions: mentionPlugin.MentionSuggestions };
  }, []);

  const handleReturn = (event: KeyboardEvent): DraftHandleValue => {
    if (event.key === 'Enter' && !isSoftNewlineEvent(event)) {
      if (onEnterPress && !open) {
        onEnterPress();
        return 'handled';
      }
    }
    return 'not-handled';
  };

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
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
      onClick={() => editorRef.current?.focus()}
      aria-hidden="true"
    >
      <Editor
        ref={editorRef}
        handleReturn={handleReturn}
        editorKey="editor"
        plugins={plugins}
        onChange={handleEditorChange}
        {...rest}
      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        entryComponent={MentionEntry}
        // popoverContainer={({ children }) => (
        //   <div className="mention-suggestion-container">{children}</div>
        // )}
      />
    </div>
  );
};

export default React.memo(CommentInput);
