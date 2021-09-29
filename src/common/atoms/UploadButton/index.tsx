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
  // const [selectedFile, setSelectedFile] = React.useState<any>(null);
  const setAttachModal = useSetRecoilState(showAttachmentModalState);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // handle validations
    console.log('Check event.target.files[0] = ', event);
    // const element = window.document.getElementById('foobar');

    if (!event?.target?.files) {
      alert('oops, something was wrong!');
      return;
    }

    if (Array.isArray(event.target.files)) {
      alert('Unsupport multiple attachment!');
      return;
    }

    console.log('Check event.target.files[0] = ', event.target.files[0]);

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
