import React from 'react';

type UploadButtonProps = React.LabelHTMLAttributes<Element> & {
  id: string;
  className?: string;
  accept?: string;
  onFileSelected: (file: File | null) => void;
};

const UploadButton: React.VFC<UploadButtonProps> = ({
  children,
  id,
  className,
  accept,
  onFileSelected,
}) => {
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Check handleFileInput files = ', event.target.files);
    if (!event?.target?.files) {
      return;
    }
    onFileSelected(event.target.files[0]);
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
