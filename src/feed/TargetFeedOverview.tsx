import { ClassName } from '@/common/types';
import TargetStatus from '@/main/atoms/TargetStatus';
import { getDisplayUsdAmount, getTargetPeriodsAmountTotal } from '@/main/utils';
import { MiniChartView } from '@/target/MiniChartView';
import { Target, TargetStatusConfig, TargetStatusType } from '@/target/types';
import clsx from 'clsx';
import React from 'react';

type TargetFeedOverviewProps = ClassName & {
  target: Target;
};

export const TargetFeedOverview: React.FC<TargetFeedOverviewProps> = ({ className, target }) => {
  const { overallTarget, currentSpend, targetToDate, exceeding } =
    getTargetPeriodsAmountTotal(target);

  const renderTrackingStatusIndicator = (trackingStatus?: TargetStatusType) => {
    const statusColor = trackingStatus ? TargetStatusConfig[trackingStatus]['dot'] : '#7D8490';
    return (
      <div className="flex w-2 h-2 justify-center items-center">
        <div
          className="w-1.5 h-1.5 rounded-full bg-Green-400"
          style={{ backgroundColor: statusColor }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className={clsx('flex flex-col mt-4 w-full px-8', className)}>
        <div className="flex flex-row space-x-4 w-auto items-center">
          <div className="flex flex-col">
            <div className="flex items-center">
              {renderTrackingStatusIndicator(target.trackingStatus)}
              <p className="text-xs text-Gray-2 ml-1">Current Spend</p>
            </div>
            <p className="text-xl text-primary font-bold mt-1">
              {getDisplayUsdAmount(currentSpend)}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              {renderTrackingStatusIndicator()}
              <p className="text-xs text-Gray-2 ml-1">Target To Date</p>
            </div>
            <p className="text-xl text-primary font-bold mt-1">
              {getDisplayUsdAmount(targetToDate)}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              {renderTrackingStatusIndicator()}
              <p className="text-xs text-Gray-2 ml-1">Overall Target</p>
            </div>
            <p className="text-xl text-primary font-bold mt-1">
              {getDisplayUsdAmount(overallTarget)}
            </p>
          </div>
          <div className="flex flex-1 justify-end flex-col items-end">
            {target.trackingStatus && (
              <TargetStatus type={target.trackingStatus} exceeding={exceeding} />
            )}
          </div>
        </div>
        <div className="p-2 rounded-card h-[240px]">
          <MiniChartView target={target} />
        </div>
      </div>
    </div>
  );
};
