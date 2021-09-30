import React from 'react';
import { styled } from '@mui/system';
import { showAttachmentModalState } from '@main/organisms/AttachmentModal/states';
import { useSetRecoilState } from 'recoil';

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

const UploadButton: React.VFC<UploadButtonProps> = ({ children, id, className, accept }) => {
  const setAttachModal = useSetRecoilState(showAttachmentModalState);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files) {
      return;
    }
    setAttachModal({
      isShow: true,
      file: event.target.files[0],
    });
  };

  return (
    <Label className={className} htmlFor={id}>
      <FileInput accept={accept} id={id} type="file" onChange={handleFileInput} />
      {children}
    </Label>
  );
};

export default UploadButton;
