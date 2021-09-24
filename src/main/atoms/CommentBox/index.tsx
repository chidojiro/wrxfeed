/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import {
  Button,
  ButtonProps,
  InputBase as MUIInputBase,
  InputBaseProps,
  Paper,
  PaperProps,
  Stack,
} from '@mui/material';
import { ReactComponent as SmileIcon } from '@assets/icons/outline/mood-smile.svg';
import { ReactComponent as AttachIcon } from '@assets/icons/outline/attach.svg';
import { Gray } from '@theme/colors';
import UploadButton from '@common/atoms/UploadButton';

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
      backgroundColor: '#DDFF55',
    },
  }),
}));

const StyledInputBase = styled(MUIInputBase)<InputBaseProps>(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  flex: 1,
  fontSize: '0.875rem',
  padding: '2px 0px 3px',
  textarea: {
    transition: 'height 300ms ease-in-out',
  },
}));

const InputBase: React.VFC<InputBaseProps> = () => {
  const { filled, focused } = useFormControl() || {};

  return (
    <StyledInputBase
      placeholder="Comment here…"
      inputProps={{ 'aria-label': 'comment here' }}
      multiline
      rows={focused || filled ? 3 : 1}
    >
      Send
    </StyledInputBase>
  );
};

const StyledButton = styled(Button)<ButtonProps>(() => ({
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

const SendButton: React.VFC<ButtonProps> = () => {
  const { filled } = useFormControl() || {};

  return <StyledButton disabled={!filled}>Send</StyledButton>;
};

const Container: React.VFC<PaperProps> = ({ children }) => {
  const classes = useStyles();
  const { focused } = useFormControl() || {};

  return (
    <Paper className={`${classes.container} ${focused && 'focus'}`} component="form" elevation={0}>
      {children}
    </Paper>
  );
};

const CommentBox: React.VFC = () => {
  const classes = useStyles();
  return (
    <FormControl sx={{ flexDirection: 'row', marginBottom: 0 }}>
      <Container>
        <InputBase />
        <Stack direction="row" spacing={1} alignItems="center">
          <SmileIcon />
          <UploadButton className={classes.attach} id="icon-button-file" accept="image/*">
            <AttachIcon />
          </UploadButton>
          <SendButton />
        </Stack>
      </Container>
    </FormControl>
  );
};

export default CommentBox;
