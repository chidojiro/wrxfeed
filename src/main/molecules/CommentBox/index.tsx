import React, { useEffect, useRef, useState, useCallback, FocusEventHandler } from 'react';
import { ReactComponent as AttachIcon } from '@assets/icons/outline/attach.svg';
import { ReactComponent as SmileIcon } from '@assets/icons/outline/mood-smile.svg';
import UploadButton from '@common/atoms/UploadButton';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CommentFormModel } from '@main/types';
import EmojiPicker from '@main/molecules/EmojiPicker';
import CommentInput from '@main/atoms/CommentInput';
import SendButton from '@main/atoms/SendButton';
import { EmojiData } from 'emoji-mart';
import { EditorState, Modifier } from 'draft-js';
import { MentionData } from '@draft-js-plugins/mention';
import { UPLOAD_FILE_ACCEPT } from '@src/config';
import { classNames } from '@main/utils';

export interface CommentFormProps {
  id?: string;
  className?: string;
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

const CommentBox: React.VFC<CommentFormProps> = ({
  id,
  className,
  onSubmit,
  showAttach = true,
  showSend = true,
  showEmoji = true,
  placeholder = '💬 Comment here…',
  style = {},
  alwaysFocus = false,
  onAttachFile,
  onChange,
  mentionData,
}) => {
  const emojiRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { isSubmitted },
  } = useForm<CommentFormModel>({
    defaultValues: {
      content: EditorState.createEmpty(),
    },
  });
  const watchContent = watch('content', EditorState.createEmpty());
  const [isOpenEmojiPicker, openEmojiPicker] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  // useCallback functions
  const onSelectEmoji = useCallback(
    (emoji: EmojiData) => {
      if ('native' in emoji) {
        const values = getValues();
        const currentEditorState = values.content as EditorState;
        const currentContent = currentEditorState.getCurrentContent();
        const selection = currentEditorState.getSelection();
        const nextContent = Modifier.insertText(currentContent, selection, emoji.native);
        const nextEditorState = EditorState.push(
          currentEditorState,
          nextContent,
          'insert-characters',
        );
        setValue('content', nextEditorState);
      }
      // Turn off emoji picker after picked
      openEmojiPicker(false);
    },
    [getValues, setValue],
  );

  useEffect(() => {
    if (isSubmitted) {
      reset();
    }
  }, [isSubmitted, reset]);

  useEffect(() => {
    if (onChange) {
      onChange(watchContent);
    }
  }, [onChange, watchContent]);

  useEffect(() => {
    if (!(focused || hovered) && isOpenEmojiPicker) {
      openEmojiPicker(false);
    }
  }, [focused, hovered, isOpenEmojiPicker]);

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

  const onFileSelected = (file: File | null) => {
    if (file && onAttachFile) {
      onAttachFile(file);
    }
  };

  return (
    <form onSubmit={onSubmit && handleSubmit(onSubmit)} style={{ ...style }} ref={formRef}>
      <div
        className={classNames(
          focused || alwaysFocus ? 'border-purple-5 bg-white' : 'bg-purple-8 border-purple-8',
          'group flex flex-grow min-w-[70%] items-end border transition-all rounded-[1px] py-1.5 pl-2 pr-1.5',
          className ?? '',
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <CommentInput
              onChange={field.onChange}
              editorState={field.value as EditorState}
              onFocus={onFocusCommentInput}
              onBlur={() => setFocused(false)}
              onEnterPress={onSubmit && handleSubmit(onSubmit)}
              placeholder={placeholder}
              mentions={mentionData}
            />
          )}
        />
        <div
          style={{ transform: focused || hovered ? 'scaleX(1)' : 'scaleX(0)' }}
          className="flex h-full transform space-x-2 items-end scale-x-0 group-hover:scale-x-100 origin-right transition-all"
        >
          {showEmoji && (
            <>
              <button
                type="button"
                ref={emojiRef}
                className="flex justify-center items-center w-5 h-5 rounded-sm hover:bg-purple-8 transition-all"
                onClick={() => openEmojiPicker((prevState) => !prevState)}
              >
                <span className="sr-only">Emoji picker</span>
                <SmileIcon
                  className="fill-current text-gray-6 opacity-50 hover:opacity-100 hover:text-purple-5 path-no-filled"
                  width={14}
                  height={14}
                  viewBox="0 0 17 17"
                />
              </button>
              <EmojiPicker
                open={isOpenEmojiPicker}
                anchorEl={emojiRef?.current}
                onSelectEmoji={onSelectEmoji}
              />
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
                disabled={!watchContent.getCurrentContent().hasText()}
              />
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default CommentBox;
