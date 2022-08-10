import { InfoCircleIcon } from '@/assets';
import clsx from 'clsx';
import {
  getTargetPeriodsAmountTotal,
  getTrackingStatusName,
  toMonthName,
  toUSD,
} from '@/main/utils';
import { Target, TargetStatusConfig, TargetStatusType } from '@/target/types';
import React from 'react';
import TargetStatusMessage from '../TargetStatusMessage';
import { Button } from '@/common/components';
import { RightSmallIcon } from '@/assets';

interface TargetStatusProps {
  className?: string;
  type: TargetStatusType;
  target: Target;
  onTargetSet: (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

const TargetStatus: React.FC<TargetStatusProps> = ({
  className = '',
  type,
  target,
  onTargetSet,
}) => {
  const { label, background, dot } = TargetStatusConfig[type];
  const { overallTarget = 0, exceeding } = getTargetPeriodsAmountTotal(target);

  if (overallTarget === 0) {
    return (
      <Button
        className="rounded-full px-2 h-5 max-h-5 bg-Accent-8 text-Accent-2 justify-center items-center space-x-1.5 hidden lg:flex"
        onClick={onTargetSet}
      >
        <span className="font-medium text-xs">Set target</span>
        <RightSmallIcon className="text-Accent-2 h-2 w-2 hidden lg:block" />
      </Button>
    );
  }
  return (
    <div
      className={clsx(
        'flex flex-row items-center space-x-1.5 bg-Green-8 rounded-full pl-2 pr-2.5 h-5 max-h-5 group relative',
        className,
      )}
      style={{
        backgroundColor: background,
      }}
    >
      <div className="flex w-2 h-2 justify-center items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-Green-400" style={{ backgroundColor: dot }} />
      </div>
      <p className="text-Green-800 text-xs font-medium whitespace-nowrap" style={{ color: label }}>
        {getTrackingStatusName(type)}
      </p>
      <div className="invisible group-hover:visible absolute -top-10 right-0">
        <div className="bg-primary p-2 rounded-sm h-8 px-4 py-2 flex flex-row items-center space-x-2">
          <div className="flex w-4 h-4 justify-center items-center">
            <InfoCircleIcon
              className="w-3 h-3 fill-current text-Accent-2 path-no-filled"
              aria-hidden="false"
              viewBox="0 0 12 12"
            />
          </div>
          <div className="text text-Gray-12 text-xs truncate font-semibold">
            <TargetStatusMessage type={type} riskRange={5} exceeding={exceeding} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetStatus;
