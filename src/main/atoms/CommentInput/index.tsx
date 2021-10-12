import React, { KeyboardEvent, useCallback, useMemo, useRef, useState } from 'react';

import { DraftHandleValue, EditorProps, KeyBindingUtil } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData,
} from '@draft-js-plugins/mention';
// import { MentionPopover } from '@main/organisms';
import MentionEntry from '@main/atoms/MentionEntry';

const { isSoftNewlineEvent } = KeyBindingUtil;

interface CommentInputProps extends EditorProps {
  onEnterPress?: () => void;
  mentions?: MentionData[];
}

const CommentInput: React.VFC<CommentInputProps> = ({ onEnterPress, mentions, ...rest }) => {
  const editorRef = useRef<Editor>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions || []);
  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      entityMutability: 'IMMUTABLE',
      supportWhitespace: true,
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
      setSuggestions(defaultSuggestionsFilter(value, mentions || []));
    },
    [mentions],
  );

  return (
    <div
      ref={containerRef}
      className="editor"
      onClick={() => editorRef.current?.focus()}
      aria-hidden="true"
    >
      <Editor
        ref={editorRef}
        handleReturn={handleReturn}
        editorKey="editor"
        plugins={plugins}
        {...rest}
      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        onAddMention={() => {
          // get the mention object selected
        }}
        entryComponent={MentionEntry}
        // popoverContainer={({ children }) => (
        //   <MentionPopover inputElement={containerRef.current} open={open}>
        //     {children}
        //   </MentionPopover>
        // )}
      />
    </div>
  );
};

export default React.memo(CommentInput);
