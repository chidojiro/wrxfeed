import React, { useState } from 'react';
import Loading from '@common/atoms/Loading';

interface CommentImageProps {
  src: string;
}

const CommentImage: React.VFC<CommentImageProps> = ({ src }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div className="relative max-w-full min-w-[32px] min-h-[32px] flex items-center justify-center pt-2">
      <img
        alt="attachment"
        loading="lazy"
        style={{ maxWidth: '100%' }}
        src={src}
        onLoad={() => setImgLoaded(true)}
      />
      {!imgLoaded && (
        <div className="absolute">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default React.memo(CommentImage);
