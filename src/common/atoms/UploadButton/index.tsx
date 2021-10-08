import React from 'react';
import { styled } from '@mui/system';

type UploadButtonProps = React.LabelHTMLAttributes<Element> & {
  id: string;
  className?: string;
  accept?: string;
  onFileSelected: (file: File | null) => void;
};

const FileInput = styled('input')({
  display: 'none',
});

const Label = styled('label')({
  display: 'flex',
});

const UploadButton: React.VFC<UploadButtonProps> = ({
  children,
  id,
  className,
  accept,
  onFileSelected,
}) => {
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files) {
      return;
    }
    onFileSelected(event.target.files[0]);
    // Reset file input
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };

  return (
    <Label className={className} htmlFor={id}>
      <FileInput accept={accept} id={id} type="file" onChange={handleFileInput} />
      {children}
    </Label>
  );
};

export default UploadButton;
