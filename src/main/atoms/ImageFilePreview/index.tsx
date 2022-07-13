import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

export type ImageFilePreviewProps = {
  className?: string;
  width?: number;
  height?: number;
  file: File | null;
};

const ImageFilePreview: React.FC<ImageFilePreviewProps> = ({ className, width, height, file }) => {
  const [previewSrc, setPreviewSrc] = useState<string>(
    'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png',
  );

  useEffect(() => {
    if (!file) {
      return;
    }
    setPreviewSrc(URL.createObjectURL(file));
  }, [file]);

  return (
    <div className={clsx('outline-none border-0', className ?? '')}>
      <img
        id="image_preview_upload"
        alt="alt_image_upload"
        src={previewSrc}
        width={width}
        height={height}
        style={{
          borderRadius: '4px',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default React.memo(ImageFilePreview);
