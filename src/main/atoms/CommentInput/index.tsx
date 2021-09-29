import React, { KeyboardEvent, Ref } from 'react';
import { styled } from '@mui/system';
import { useFormControl } from '@mui/material/FormControl';
import { InputBase, InputBaseProps } from '@mui/material';

interface CommentInputProps extends InputBaseProps {
  handleEnterPress?: (event: KeyboardEvent) => void;
}

const StyledInput = styled(InputBase)<InputBaseProps>(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  flex: 1,
  fontSize: '0.875rem',
  padding: '2px 0px 3px',
  textarea: {
    transition: 'height 300ms ease-in-out',
  },
}));

const CommentInput: React.ForwardRefRenderFunction<Ref<unknown>, CommentInputProps> = (
  { name, onChange, onBlur, handleEnterPress, placeholder },
  ref,
) => {
  const { filled, focused } = useFormControl() || {};

  const handleKeyPress = (event: KeyboardEvent): boolean => {
    // Enter without Shift Key
    if (event.key === 'Enter' && !event.shiftKey) {
      // Stops enter from creating a new line
      event.preventDefault();
      if (handleEnterPress) {
        handleEnterPress(event);
      }
      return true;
    }
    return false;
  };

  return (
    <StyledInput
      ref={ref}
      name={name}
      // value={value}
      placeholder={placeholder}
      inputProps={{ 'aria-label': 'comment here' }}
      multiline
      rows={focused || filled ? 3 : 1}
      onKeyPress={handleKeyPress}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default React.forwardRef(CommentInput);
