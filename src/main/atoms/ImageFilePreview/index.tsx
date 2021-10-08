import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';

export type ImageFilePreviewProps = {
  sx?: SxProps;
  width?: number;
  height?: number;
  file: File | null;
};

const ImageFilePreview: React.FC<ImageFilePreviewProps> = ({ sx, width, height, file }) => {
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
    <Box sx={{ mt: 3, ml: 3, outline: 'none', borderWidth: '0px', ...sx }}>
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
    </Box>
  );
};

export default React.memo(ImageFilePreview);
