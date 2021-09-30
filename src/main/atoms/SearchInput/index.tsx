import React, { ChangeEvent, KeyboardEvent, Ref } from 'react';
import { styled } from '@mui/system';
import { useFormControl } from '@mui/material/FormControl';
import { InputBase, InputBaseProps } from '@mui/material';

interface SearchInputProps extends InputBaseProps {
  onEnterPress?: (event: KeyboardEvent) => void;
  onSearch?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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

const SearchInput: React.ForwardRefRenderFunction<Ref<unknown>, SearchInputProps> = (
  { name, value, placeholder, onChange, onBlur, onEnterPress, onSearch },
  ref,
) => {
  const { filled, focused } = useFormControl() || {};

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
    if (onSearch) {
      onSearch(event);
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <StyledInput
      ref={ref}
      name={name}
      value={value}
      placeholder={placeholder}
      inputProps={{ 'aria-label': 'comment here' }}
      multiline
      rows={focused || filled ? 1 : 1}
      onKeyPress={handleKeyPress}
      onChange={handleTextChange}
      onBlur={onBlur}
    />
  );
};

export default React.forwardRef(SearchInput);
