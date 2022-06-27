import { TargetArrowFilled } from '@/assets';
import clsx from 'clsx';
import React from 'react';

const TargetSummary: React.FC = () => {
  return (
    <div className="shadow-shadowCard rounded-card bg-white flex p-6">
      <div className="flex gap-3">
        <div className="border-r border-solid pr-5 flex gap-3">
          <div className={clsx('rounded-full bg-Gray-12 p-3 flex items-center justify-center')}>
            <TargetArrowFilled />
          </div>
          <div>
            <p className="text-Gray-6">Targets</p>
            <p className="text-2xl font-semibold">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetSummary;
