import React from 'react';

interface LoadingProps {
  width?: number;
  height?: number;
}

const Loading: React.VFC<LoadingProps> = ({ width, height }) => {
  return (
    <div className=" flex justify-center items-center">
      <div
        style={{ width: width ?? 32, height: height ?? 32 }}
        className="animate-spin rounded-full h-2 w-2 border-b-2 border-gray-900"
      />
    </div>
  );
};

export default React.memo(Loading);
