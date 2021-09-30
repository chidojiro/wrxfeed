import React, { ChangeEvent, Ref, useState } from 'react';
import { styled, SxProps } from '@mui/system';
import { Input, InputProps } from '@mui/material';

const StyledFormInput = styled(Input)<InputProps>(() => ({
  flex: 1,
  padding: '11px 24px',
}));

const FormInput: React.ForwardRefRenderFunction<Ref<unknown>, InputProps & { sx?: SxProps }> = (
  { sx, onChange, onFocus, onBlur, ...rest },
  ref,
) => {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilled(!!event.target?.value);
    if (onChange) {
      onChange(event);
    }
  };

  const handleFocus = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <StyledFormInput
      ref={ref}
      sx={{ backgroundColor: focused || filled ? '#fff' : 'transparent', ...sx }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleOnChange}
      {...rest}
    />
  );
};

export default React.forwardRef(FormInput);
