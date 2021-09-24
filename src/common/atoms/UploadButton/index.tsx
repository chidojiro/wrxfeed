import { styled } from '@mui/system';
import React from 'react';

type UploadButtonProps = React.LabelHTMLAttributes<Element> & {
  id: string;
  className?: string;
  accept?: string;
};

const FileInput = styled('input')({
  display: 'none',
});

const Label = styled('label')({
  display: 'flex',
});

const UploadButton: React.VFC<UploadButtonProps> = ({ children, id, className, accept }) => (
  <Label className={className} htmlFor={id}>
    <FileInput accept={accept} id={id} type="file" />
    {children}
  </Label>
);

export default UploadButton;
