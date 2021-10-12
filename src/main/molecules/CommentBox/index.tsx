import React, { useEffect, useRef, useState, useCallback, FocusEventHandler } from 'react';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper, { PaperProps } from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { ReactComponent as AttachIcon } from '@assets/icons/outline/attach.svg';
import { ReactComponent as SmileIcon } from '@assets/icons/outline/mood-smile.svg';
import { Highlight, Neutral } from '@theme/colors';
import UploadButton from '@common/atoms/UploadButton';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CommentFormModel } from '@main/types';
import EmojiPicker from '@main/molecules/EmojiPicker';
import CommentInput from '@main/atoms/CommentInput';
import SendButton from '@main/atoms/SendButton';
import { EmojiData } from 'emoji-mart';
import SvgColorIcon from '@common/atoms/SvgColorIcon';
import { EditorState, Modifier } from 'draft-js';
import { MentionData } from '@draft-js-plugins/mention';
import { UPLOAD_FILE_ACCEPT } from '@src/config';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexGrow: 1,
    minWidth: '70%',
    backgroundColor: Neutral[10],
    borderRadius: 8,
    padding: '6px 6px 6px 8px',
    alignItems: 'flex-end',
    border: `1px solid ${Neutral[10]}`,
    transition: 'all 300ms ease-in-out',
    '&.focus': {
      borderColor: Neutral[5],
      backgroundColor: '#fff',
    },
  },
  inputOption: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    '&:hover': {
      backgroundColor: Highlight,
    },
  },
});
export interface ContainerProps extends PaperProps {
  focused: boolean;
  alwaysFocus: boolean;
}

const Container: React.VFC<ContainerProps> = ({ children, focused, alwaysFocus }) => {
  const classes = useStyles();
  return (
    <Paper className={`${classes.container} ${(focused || alwaysFocus) && 'focus'}`} elevation={0}>
      {children}
    </Paper>
  );
};

export interface CommentFormProps {
  id?: string;
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
  const classes = useStyles();
  const emojiRef = useRef<HTMLDivElement>();
  const formRef = useRef<HTMLFormElement>(null);
  const {
    control,
    handleSubmit,
    reset,
    setFocus,
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

  const onOpenEmojiPicker = () => {
    // setFocus('content');
    openEmojiPicker(true);
    setFocus('content');
  };

  const onCloseEmojiPicker = () => {
    openEmojiPicker(false);
  };

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
      <FormControl sx={{ flexDirection: 'row', marginBottom: 0 }}>
        <Container
          onSubmit={onSubmit && handleSubmit(onSubmit)}
          focused={focused}
          alwaysFocus={alwaysFocus}
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
          <Stack direction="row" spacing={1} alignItems="center">
            {showEmoji && (
              <>
                <Box ref={emojiRef} className={classes.inputOption} onClick={onOpenEmojiPicker}>
                  <SvgColorIcon
                    component={SmileIcon}
                    pathstyle={{ fill: Neutral[5] }}
                    viewBox="0 0 17 17"
                  />
                </Box>
                <EmojiPicker
                  open={isOpenEmojiPicker}
                  onClose={onCloseEmojiPicker}
                  anchorEl={emojiRef.current}
                  onSelectEmoji={onSelectEmoji}
                />
              </>
            )}
            {!!showAttach && (
              <UploadButton
                className={classes.inputOption}
                id={`button-file-${id}`}
                accept={UPLOAD_FILE_ACCEPT}
                onFileSelected={onFileSelected}
              >
                <SvgColorIcon
                  component={AttachIcon}
                  pathstyle={{ stroke: Neutral[5], fill: 'none' }}
                  viewBox="0 0 17 17"
                />
              </UploadButton>
            )}
            {!!showSend && (
              <>
                <Divider orientation="vertical" sx={{ height: '19px' }} />
                <SendButton disabled={!watchContent.getCurrentContent().hasText()} />
              </>
            )}
          </Stack>
        </Container>
      </FormControl>
    </form>
  );
};

export default CommentBox;
