import React from 'react';

const TransactionListEnd: React.VFC = () => {
  return (
    <>
      <div className="mt-8 mb-10 flex flex-row items-center">
        <hr className="divider divider-horizontal flex-1" />
        <div className="flex flex-row flex-shrink justify-center items-center h-[30px] px-4 pb-0.5 m-auto rounded-2xl border border-Gray-8">
          <p className="text-sm text-Gray-3">You’re all caught up</p>
        </div>
        <hr className="divider divider-horizontal flex-1" />
      </div>
      <p className="text-base text-center text-Neutral-4">
        That’s all for now
        <span role="img" aria-label="rocket">
          {' '}
          🚀
        </span>
      </p>
    </>
  );
};

export default TransactionListEnd;
