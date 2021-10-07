import React, { ChangeEvent, KeyboardEvent } from 'react';
import { styled } from '@mui/system';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import EventEmitter, { EventName } from '@main/EventEmitter';

interface CommentInputProps extends InputBaseProps {
  onEnterPress?: (event: KeyboardEvent) => void;
  onMention?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number;
  maxRows?: number;
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

const CommentInput: React.ForwardRefRenderFunction<HTMLInputElement, CommentInputProps> = (
  { name, value, placeholder, onChange, onBlur, onFocus, onEnterPress, onMention, rows, maxRows },
  ref,
) => {
  const handleKeyPress = (event: KeyboardEvent): boolean => {
    // Enter without Shift Key
    if (event.key === 'Enter' && !event.shiftKey) {
      // Stops enter from creating a new line
      event.preventDefault();
      if (onEnterPress) {
        onEnterPress(event);
      }
      return true;
    }
    return false;
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onMention) {
      onMention(event);
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <StyledInput
      inputRef={ref}
      name={name}
      value={value}
      placeholder={placeholder}
      inputProps={{ 'aria-label': 'comment here' }}
      multiline
      rows={rows}
      maxRows={maxRows}
      onKeyPress={handleKeyPress}
      onChange={handleTextChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={() => {
        EventEmitter.dispatch(EventName.ON_KEY_DOWN);
      }}
      onKeyUp={() => {
        EventEmitter.dispatch(EventName.ON_KEY_UP);
      }}
    />
  );
};

export default React.forwardRef(CommentInput);
