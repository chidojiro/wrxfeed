import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
  FocusEventHandler,
} from 'react';
import { makeStyles } from '@mui/styles';
import FormControl, { useFormControl } from '@mui/material/FormControl';
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
import MentionPopover from '@main/organisms/MentionPopover';
import CommentInput from '@main/atoms/CommentInput';
import SendButton from '@main/atoms/SendButton';
import { EmojiData } from 'emoji-mart';
import { User } from '@main/entity';
import SvgColorIcon from '@common/atoms/SvgColorIcon';

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
  alwaysFocus: boolean;
}

const Container: React.VFC<ContainerProps> = ({ children, alwaysFocus }) => {
  const classes = useStyles();
  const { focused } = useFormControl() || {};

  return (
    <Paper className={`${classes.container} ${(focused || alwaysFocus) && 'focus'}`} elevation={0}>
      {children}
    </Paper>
  );
};

export interface CommentFormProps {
  onSubmit: SubmitHandler<CommentFormModel>;
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
}

const CommentBox: React.VFC<CommentFormProps> = ({
  onSubmit,
  showAttach = true,
  showSend = true,
  showEmoji = true,
  enableMention = true,
  placeholder = '💬 Comment here…',
  style = {},
  rows,
  maxRows = 6,
  alwaysFocus = false,
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
    formState: { isSubmitted },
  } = useForm<CommentFormModel>({
    defaultValues: {
      content: '',
    },
  });
  const [isOpenEmojiPicker, openEmojiPicker] = useState(false);
  const [isOpenMention, openMention] = useState(false);
  const [inputElement, setInputElement] = useState<HTMLFormElement | null>(null);
  // useCallback functions
  const onSelectEmoji = useCallback(
    (emoji: EmojiData) => {
      if ('native' in emoji) {
        const values = getValues();
        setValue('content', values.content + emoji.native);
      }
    },
    [getValues, setValue],
  );

  useEffect(() => {
    if (isSubmitted) {
      reset();
    }
  }, [isSubmitted, reset]);

  const handleMention = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (!enableMention) {
      return;
    }
    const { value } = event.currentTarget;
    // if (value.substr(value.length - 1) === '@' && formRef.current) {
    //   setInputElement(formRef.current);
    //   openMention(true);
    // }
    if (value.slice(-1) === '@' && formRef.current) {
      setInputElement(formRef.current);
      openMention(true);
    }
    if (value.slice(-1) === ' ' && formRef.current) {
      setInputElement(formRef.current);
      openMention(false);
    }
  };

  const onSelectUserMention = useCallback(
    (user: User) => {
      const values = getValues();
      // setValue(
      //   'content',
      //   `${values.content}<mention userid="${user?.id}" tagname="${user?.fullName}"/>`,
      // );
      setValue('content', `${values.content}${user?.fullName}`);
      // `<mention userid="6" tagname="${word.replace('@', '')}"/>`
    },
    [getValues, setValue],
  );

  const onCloseMention = () => {
    openMention(false);
  };

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
    // Move the cursor to end of text
    if (typeof event.target.selectionStart === 'number') {
      // eslint-disable-next-line no-param-reassign
      event.target.selectionStart = event.target.value.length;
      // eslint-disable-next-line no-param-reassign
      event.target.selectionEnd = event.target.value.length;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ ...style }} ref={formRef}>
      <FormControl sx={{ flexDirection: 'row', marginBottom: 0 }}>
        <Container onSubmit={handleSubmit(onSubmit)} alwaysFocus={alwaysFocus}>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <CommentInput
                {...field}
                onFocus={onFocusCommentInput}
                onEnterPress={handleSubmit(onSubmit)}
                onMention={handleMention}
                placeholder={placeholder}
                rows={rows}
                maxRows={maxRows}
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
              <UploadButton className={classes.inputOption} id="icon-button-file" accept="image/*">
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
                <SendButton />
              </>
            )}
          </Stack>
        </Container>
      </FormControl>
      <MentionPopover
        open={isOpenMention}
        onClose={onCloseMention}
        onSelectUser={onSelectUserMention}
        inputElement={inputElement}
      />
    </form>
  );
};

export default CommentBox;
