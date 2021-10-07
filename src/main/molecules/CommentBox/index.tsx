/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
  FocusEventHandler,
} from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import { Box, Divider, Paper, PaperProps, Stack } from '@mui/material';
// import { ReactComponent as SmileIcon } from '@assets/icons/outline/mood-smile.svg';
import { ReactComponent as AttachIcon } from '@assets/icons/outline/attach.svg';
import { ReactComponent as SmileIcon } from '@assets/icons/outline/mood-smile.svg';
import { Gray, Highlight } from '@theme/colors';
import UploadButton from '@common/atoms/UploadButton';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CommentFormModel } from '@main/types';
// import EmojiPopover from '@main/organisms/EmojiPopover';
import EmojiPicker from '@main/molecules/EmojiPicker';
import MentionPopover from '@main/organisms/MentionPopover';
// import { useSetRecoilState } from 'recoil';
// import { showMentionPopover } from '@main/organisms/MentionPopover/states';
import CommentInput from '@main/atoms/CommentInput';
import { EmojiData } from 'emoji-mart';
import { User } from '@main/entity';
import { EssentialsSendIcon, EssentialsSendEnableIcon } from '@assets/index';

const useStyles = makeStyles(() => ({
  container: () => ({
    display: 'flex',
    flexGrow: 1,
    minWidth: '70%',
    backgroundColor: '#F6F7F3',
    borderRadius: 8,
    padding: '6px 6px 6px 8px',
    alignItems: 'flex-end',
    border: '1px solid #F6F7F3',
    transition: 'all 300ms ease-in-out',
    '&.focus': {
      borderColor: Gray[2],
      backgroundColor: '#fff',
    },
  }),
  inputOption: () => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    '&:hover': {
      backgroundColor: Highlight,
    },
  }),
}));

// const StyledButton = styled(Button)(() => ({
//   backgroundColor: Gray[1],
//   padding: '0.5px 16px',
//   borderRadius: 4,
//   color: '#fff',
//   fontSize: '0.875rem',
//   fontWeight: 600,
//   '&:disabled': {
//     backgroundColor: Gray[3],
//     color: '#fff',
//   },
//   '&:hover': {
//     backgroundColor: Gray[2],
//   },
// }));

// const SendButton: React.VFC = (props) => {
//   const { filled } = useFormControl() || {};

//   return (
//     <StyledButton disabled={!filled} type="submit" {...props}>
//       Send
//     </StyledButton>
//   );
// };

const StyledButtonAirplane = styled('button')(() => ({
  display: 'flex',
  marginLeft: '10px',
  backgroundColor: 'transparent',
  padding: '0px',
  borderRadius: '0px',
  borderWidth: '0px',
  flexDirection: 'row',
  alignItems: 'center',
  outline: 'none',
  paddingRight: '5px',
}));

const SendButtonAirplane: React.VFC = (props) => {
  const { filled } = useFormControl() || {};

  const SendIcon = filled ? <EssentialsSendEnableIcon /> : <EssentialsSendIcon />;

  return (
    <StyledButtonAirplane type="submit" {...props}>
      <Divider orientation="vertical" sx={{ height: '19px' }} style={{ marginRight: '10px' }} />
      {SendIcon}
    </StyledButtonAirplane>
  );
};

const Container: React.VFC<PaperProps> = ({ children }) => {
  const classes = useStyles();
  const { focused } = useFormControl() || {};

  return (
    <Paper className={`${classes.container} ${focused && 'focus'}`} elevation={0}>
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
}

const CommentBox: React.VFC<CommentFormProps> = ({
  onSubmit,
  showAttach = true,
  showSend = true,
  showEmoji = true,
  enableMention = true,
  placeholder = '💬 Comment here…',
  style = {},
}) => {
  // const setShowMentionPopover = useSetRecoilState(showMentionPopover);
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
    if (value.substr(value.length - 1) === '@' && formRef.current) {
      // setShowMentionPopover({ element: formRef.current });
      setInputElement(formRef.current);
      openMention(true);
    }
  };

  const onSelectUserMention = useCallback(
    (user: User) => {
      console.log('Check user ', user);
      const values = getValues();
      setValue('content', `${values.content}${user.fullName}`);
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
        <Container onSubmit={handleSubmit(onSubmit)}>
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
              />
            )}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            {showEmoji && (
              <>
                <Box ref={emojiRef} className={classes.inputOption} onClick={onOpenEmojiPicker}>
                  <SmileIcon />
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
                <AttachIcon />
              </UploadButton>
            )}
            {!!showSend && <SendButtonAirplane />}
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
