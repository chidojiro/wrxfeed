/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { styled, makeStyles } from '@mui/styles';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import { Button, ButtonProps, InputBase, Paper, PaperProps, Stack } from '@mui/material';
import { ReactComponent as SmileIcon } from '@assets/icons/outline/mood-smile.svg';
import { ReactComponent as AttachIcon } from '@assets/icons/outline/attach.svg';
import { Gray } from '@theme/colors';

const useStyles = makeStyles(() => ({
  container: () => ({
    display: 'flex',
    flexGrow: 0,
    minWidth: '70%',
    backgroundColor: '#F6F7F3',
    borderRadius: 8,
    padding: '6px 6px 6px 8px',
    alignItems: 'center',
    border: '1px solid #F6F7F3',
    transition: 'flex-grow 300ms ease-in-out',
    '&.focus': {
      flexGrow: 1,
      borderColor: Gray[2],
    },
  }),
}));

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

const SendButton: React.VFC<ButtonProps> = (props) => {
  const { filled } = useFormControl() || {};

  return (
    <StyledButton disabled={!filled} {...props}>
      Send
    </StyledButton>
  );
};

const Input = styled('input')({
  display: 'none',
});

const Label = styled('label')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 25,
  height: 25,
  borderRadius: 12.5,
  '&:hover': {
    backgroundColor: '#DDFF55',
  },
});

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
  return (
    <FormControl sx={{ flexDirection: 'row', marginBottom: 0 }}>
      <Container>
        <InputBase
          sx={{ ml: 1, mr: 1, flex: 1, fontSize: '0.875rem', height: '1rem' }}
          placeholder="Comment here…"
          inputProps={{ 'aria-label': 'comment here' }}
        />
        <Stack direction="row" spacing={1} alignItems="center">
          <SmileIcon />
          <Label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" />
            <AttachIcon />
          </Label>
          <SendButton />
        </Stack>
      </Container>
    </FormControl>
  );
};

export default CommentBox;
