import React, { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { convertToRaw, DraftHandleValue, EditorProps, EditorState, KeyBindingUtil } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData,
  defaultTheme,
} from '@draft-js-plugins/mention';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import MentionEntry from '@main/atoms/MentionEntry';

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

const CommentInput: React.VFC<CommentInputProps> = ({
  onEnterPress,
  mentions,
  onChange,
  autoFocus,
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
        mention: 'mention',
      },
    });
    return {
      plugins: [mentionPlugin, linkifyPlugin],
      MentionSuggestions: mentionPlugin.MentionSuggestions,
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && autoFocus) {
      // Waiting for initializing mentions
      setTimeout(editorRef.current.focus, 200);
    }
  }, [autoFocus]);

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
