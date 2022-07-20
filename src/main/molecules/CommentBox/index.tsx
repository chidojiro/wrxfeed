import { ReactComponent as AttachIcon } from '@/assets/icons/outline/attach.svg';
import { ReactComponent as SmileIcon } from '@/assets/icons/outline/mood-smile.svg';
import UploadButton from '@/common/atoms/UploadButton';
import EmojiPicker from '@/common/molecules/EmojiPicker';
import { UPLOAD_FILE_ACCEPT } from '@/config';
import CommentInput from '@/main/atoms/CommentInput';
import SendButton from '@/main/atoms/SendButton';
import { CommentFormModel } from '@/main/types';
import { MentionData } from '@draft-js-plugins/mention';
import clsx from 'clsx';
import { EditorState, Modifier } from 'draft-js';
import { EmojiData } from 'emoji-mart';
import React, { FocusEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface CommentFormProps {
  id?: string;
  className?: string;
  defaultContent?: EditorState;
  onSubmit?: SubmitHandler<CommentFormModel>;
  showAttach?: boolean;
  showSend?: boolean;
  showEmoji?: boolean;
  enableMention?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  rows?: number;
  maxRows?: number;
  maxCharacter?: number;
  alwaysFocus?: boolean;
  onAttachFile?: (file: File) => void;
  onChange?: (content?: EditorState) => void;
  mentionData?: MentionData[];
}

const CommentBox: React.FC<CommentFormProps> = ({
  id,
  className,
  defaultContent,
  onSubmit,
  showAttach = true,
  showSend = true,
  showEmoji = true,
  placeholder = '💬 Add a comment',
  style = {},
  alwaysFocus = false,
  onAttachFile,
  onChange,
  mentionData,
}) => {
  const defaultState = defaultContent ?? EditorState.createEmpty();
  const [editorState, setEditorState] = React.useState(defaultContent ?? EditorState.createEmpty());

  const handleEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    onChange?.(editorState);
  };

  const emojiRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<any>(null);

  const reset = () => {
    setEditorState(defaultState);
  };

  const handleSubmit = () => {
    onSubmit?.({ content: editorState });
    reset();
  };

  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isEmojiHovering, setEmojiHovering] = useState(false);
  // useCallback functions
  const onSelectEmoji = useCallback((emoji: EmojiData) => {
    if ('native' in emoji) {
      (inputRef.current as any).insertText(emoji.native);
    }
    // Turn off emoji picker after picked
    EmojiPicker.close();
  }, []);

  useEffect(() => {
    if (!(focused || hovered || isEmojiHovering)) {
      EmojiPicker.close();
    }
  }, [focused, hovered, isEmojiHovering]);

  const onFocusCommentInput: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement> = (
    event,
  ) => {
    setFocused(true);
    // Move the cursor to end of text
    if (typeof event.target.selectionStart === 'number') {
      // eslint-disable-next-line no-param-reassign
      event.target.selectionStart = event.target.value.length;
      // eslint-disable-next-line no-param-reassign
      event.target.selectionEnd = event.target.value.length;
    }
  };

  const openEmojiPicker = () => {
    EmojiPicker.open({
      anchorEl: emojiRef.current,
      onSelectEmoji,
      onHover: setEmojiHovering,
    });
  };

  const onFileSelected = (file: File | null) => {
    if (file && onAttachFile) {
      onAttachFile(file);
    }
  };

  return (
    <div>
      <div
        className={clsx(
          focused || alwaysFocus ? 'border-purple-5 bg-white' : ' border-Gray-11',
          'relative group flex flex-grow min-w-[70%] items-end border transition-all rounded-[1px] py-1.5 pl-2 pr-1.5',
          className ?? '',
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CommentInput
          ref={inputRef}
          autoFocus={alwaysFocus}
          value={editorState}
          onChange={handleEditorStateChange}
          onFocus={onFocusCommentInput}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          mentions={mentionData}
          onSubmit={handleSubmit}
        />
        <div
          style={{ transform: focused || hovered || isEmojiHovering ? 'scaleX(1)' : 'scaleX(0)' }}
          className="flex h-full transform space-x-2 items-end scale-x-0 group-hover:scale-x-100 origin-right transition-all"
        >
          {showEmoji && (
            <>
              <button
                type="button"
                ref={emojiRef}
                className="flex justify-center items-center w-5 h-5 rounded-sm hover:bg-purple-8 transition-all"
                onClick={openEmojiPicker}
              >
                <span className="sr-only">Emoji picker</span>
                <SmileIcon
                  className="fill-current text-gray-6 opacity-50 hover:opacity-100 hover:text-purple-5 path-no-filled"
                  width={14}
                  height={14}
                  viewBox="0 0 17 17"
                />
              </button>
            </>
          )}
          {!!showAttach && (
            <UploadButton
              className="flex justify-center items-center w-5 h-5 rounded-sm hover:bg-purple-8"
              id={`button-file-${id}`}
              accept={UPLOAD_FILE_ACCEPT}
              onFileSelected={onFileSelected}
            >
              <AttachIcon
                className="stroke-current text-gray-6 opacity-50 hover:opacity-100 hover:text-purple-5 path-no-stroke"
                width={14}
                height={14}
                viewBox="0 0 17 17"
              />
            </UploadButton>
          )}
          {!!showSend && (
            <>
              <hr className="divider divider-vertical h-5" />
              <SendButton
                className="w-5 h-5"
                disabled={!editorState.getCurrentContent().hasText()}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
