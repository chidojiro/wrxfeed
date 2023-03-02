import React from 'react';
import ImageResizer from 'react-image-file-resizer';

type UploadButtonProps = React.LabelHTMLAttributes<Element> & {
  id: string;
  className?: string;
  accept?: string;
  onFileSelected: (file: File | null) => void;
  isImage?: boolean;
};

const UploadButton: React.FC<UploadButtonProps> = ({
  children,
  id,
  className,
  accept,
  onFileSelected,
  isImage = false,
}) => {
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files) {
      return;
    }
    if (isImage) {
      ImageResizer.imageFileResizer(
        event.target.files[0],
        148,
        148,
        'WEBP',
        100,
        0,
        (uri) => {
          return onFileSelected(uri as File);
        },
        'file',
      );
    } else {
      onFileSelected(event.target.files[0]);
    }
    // Reset file input
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };

  return (
    <label className={className} htmlFor={id}>
      <input className="w-0 h-0" accept={accept} id={id} type="file" onChange={handleFileInput} />
      {children}
    </label>
  );
};

export default UploadButton;
