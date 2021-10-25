import React from 'react';
import Loading from '@common/atoms/Loading';

const ListLoading: React.VFC = () => {
  return (
    <div className="flex justify-between items-center w-[8.2rem] h-[1.875rem] pl-5 pr-4 m-auto rounded-[15px] border border-Gray-3">
      <Loading width={16} height={16} />
      <p className="text-sm text-Gray-1 mb-0.5">Loading...</p>
    </div>
  );
};

export default React.memo(ListLoading);
