import React, { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

interface CommentImageProps {
  src: string;
}

const CommentImage: React.VFC<CommentImageProps> = ({ src }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <>
      {!imgLoaded && (
        <Skeleton variant="rectangular" sx={{ borderRadius: '4px' }} width="50%" height={118} />
      )}
      <img
        alt="attachment"
        loading="lazy"
        style={{ maxWidth: '50%', borderRadius: '4px' }}
        src={src}
        onLoad={() => setImgLoaded(true)}
      />
    </>
  );
};

export default React.memo(CommentImage);
