/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import { Button, Paper, PaperProps, Stack } from '@mui/material';
// import { ReactComponent as SmileIcon } from '@assets/icons/outline/mood-smile.svg';
import { ReactComponent as AttachIcon } from '@assets/icons/outline/attach.svg';
import { Gray, Highlight } from '@theme/colors';
import UploadButton from '@common/atoms/UploadButton';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CommentFormModel, Emoji } from '@main/types';
// import EmojiPopover from '@main/organisms/EmojiPopover';
import EmojiMartPopover from '@main/organisms/EmojiMartPopover';
// import MentionPopover from '@main/atoms/MentionPopover';
import { useSetRecoilState } from 'recoil';
import { showMentionPopover } from '@main/organisms/MentionPopover/states';
import CommentInput from '@main/atoms/CommentInput';

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
  attach: () => ({
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

const StyledButton = styled(Button)(() => ({
  backgroundColor: Gray[1],
  padding: '0.5px 16px',
  borderRadius: 4,
  color: '#fff',
  fontSize: '0.875rem',
  fontWeight: 600,
  '&:disabled': {
    backgroundColor: Gray[3],
    color: '#fff',
  },
  '&:hover': {
    backgroundColor: Gray[2],
  },
}));

const SendButton: React.VFC = (props) => {
  const { filled } = useFormControl() || {};

  return (
    <StyledButton disabled={!filled} type="submit" {...props}>
      Send
    </StyledButton>
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
  placeholder?: string;
  style?: React.CSSProperties;
}

const CommentBox: React.VFC<CommentFormProps> = ({
  onSubmit,
  showAttach = true,
  showSend = true,
  showEmoji = true,
  placeholder = '💬 Comment here…',
  style = {},
}) => {
  const setShowMentionPopover = useSetRecoilState(showMentionPopover);
  const classes = useStyles();
  const commentInputRef = useRef<React.RefObject<HTMLInputElement>>();
  const formRef = useRef<HTMLFormElement>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitted },
  } = useForm<CommentFormModel>({
    defaultValues: {
      content: '',
    },
  });

  useEffect(() => {
    if (isSubmitted) {
      reset();
    }
  }, [isSubmitted, reset]);

  const handleMention = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value } = event.currentTarget;
    if (value.substr(value.length - 1) === '@') {
      setShowMentionPopover({ element: formRef.current });
    }
  };

  const onSelectEmoji = (emoji: Emoji) => {
    console.log(emoji);
    console.log('Check commentInputRef = ', commentInputRef);
  };

  // const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
  //   console.log('Check event = ', event);
  // };

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
                onEnterPress={handleSubmit(onSubmit)}
                onMention={handleMention}
                placeholder={placeholder}
                // onRef={commentInputRef}
              />
            )}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            {/* {!!showEmoji && <EmojiPopover onSelectEmoji={onSelectEmoji} />} */}
            {!!showEmoji && <EmojiMartPopover onSelectEmoji={onSelectEmoji} />}
            {/* <MentionPopover /> */}
            {/* <EmojiMartPopover /> */}
            {!!showAttach && (
              <UploadButton className={classes.attach} id="icon-button-file" accept="image/*">
                <AttachIcon />
              </UploadButton>
            )}
            {!!showSend && <SendButton />}
          </Stack>
        </Container>
      </FormControl>
    </form>
  );
};

export default CommentBox;
