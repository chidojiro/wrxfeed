import React, { ReactEventHandler, useState } from 'react';
import Loading from '@/common/atoms/Loading';

const PORTION_HEIGHT = 140;

interface CommentImageProps {
  src: string;
}

interface Dimentions {
  width?: number;
  height?: number;
}

const CommentImage: React.FC<CommentImageProps> = ({ src }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isPortionView, setPortionView] = useState(true);
  const [dimentions, setDimentions] = useState<Dimentions>({});
  const hasPortionView = (dimentions?.height ?? 0) > PORTION_HEIGHT;

  const togglePortionView = () => hasPortionView && setPortionView((prev) => !prev);

  const onLoad: ReactEventHandler<HTMLImageElement> = ({ target: img }) => {
    setDimentions({
      height: (img as HTMLImageElement).offsetHeight,
      width: (img as HTMLImageElement).offsetWidth,
    });
    setImgLoaded(true);
  };

  return (
    <div
      aria-hidden="true"
      style={{ minHeight: hasPortionView || !imgLoaded ? PORTION_HEIGHT : 'unset' }}
      className="block relative max-w-full my-2"
      onClick={togglePortionView}
    >
      <img
        className={isPortionView && hasPortionView ? 'absolute image-clip' : ''}
        alt="attachment"
        loading="lazy"
        style={{ maxWidth: '100%' }}
        src={src}
        onLoad={onLoad}
      />
      {!imgLoaded && <Loading className="absolute top-1/2 left-1/2" />}
      {hasPortionView && isPortionView && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-LightBG" />
      )}
    </div>
  );
};

export default React.memo(CommentImage);
