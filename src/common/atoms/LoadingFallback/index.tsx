import React from 'react';
import Loading from '@/common/atoms/Loading';

const LoadingFallback: React.FC = () => {
  return (
    <div className="h-[200px] flex justify-center items-center">
      <Loading width={36} height={36} />
    </div>
  );
};

export default LoadingFallback;
