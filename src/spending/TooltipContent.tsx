import { decimalLogic, DecimalType } from '@/main/utils';
import { TargetStatusConfig } from '@/target/types';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { TrackingStatus } from './types';

export type TooltipContentProps = TooltipProps<ValueType, NameType> & {
  showTarget?: boolean;
  trackingStatus?: TrackingStatus;
  overallTarget?: boolean;
};

export const TooltipContent = ({
  active,
  payload,
  showTarget,
  trackingStatus,
  overallTarget,
}: TooltipContentProps) => {
  if (active && payload) {
    const dataPoints = payload[0]?.payload;
    return (
      <div className="flex bg-primary p-2 rounded-sm">
        <div className="flex flex-col space-y-1">
          <div className="flex flex-row items-center">
            <p className="text-white text-3xs font-semibold">{dataPoints?.name ?? 'unknown'}</p>
          </div>
          {showTarget && (
            <div
              key="target"
              className="flex flex-row flex-grow justify-between items-center space-x-10"
            >
              <div className="flex flex-row items-center space-x-1">
                <div className="w-1 h-1 rounded bg-Gray-6" />
                <p className="text-white text-2xs">Target</p>
              </div>
              <p className="text-white text-2xs text-right font-semibold">
                {decimalLogic(dataPoints?.target ?? 0, DecimalType.SummedNumbers, '$')}
              </p>
            </div>
          )}
          <div
            key="this-year"
            className="flex flex-row flex-grow justify-between items-center space-x-10"
          >
            <div className="flex flex-row items-center space-x-1">
              <div
                className="w-1 h-1 rounded"
                style={{
                  background: overallTarget
                    ? '#818CF8'
                    : trackingStatus && TargetStatusConfig[trackingStatus].dot,
                }}
              />
              <p className="text-white text-2xs">Current</p>
            </div>
            <p className="text-white text-2xs text-right font-semibold">
              {decimalLogic(dataPoints?.thisYear ?? 0, DecimalType.SummedNumbers, '$')}
            </p>
          </div>
          <div
            key="last-year"
            className="flex flex-row flex-grow justify-between items-center space-x-10"
          >
            <div className="flex flex-row items-center space-x-1">
              <div className="w-1 h-1 rounded bg-Gray-11" />
              <p className="text-white text-2xs">Last Year</p>
            </div>
            <p className="text-white text-2xs text-right font-semibold">
              {decimalLogic(dataPoints?.lastYear ?? 0, DecimalType.SummedNumbers, '$')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
