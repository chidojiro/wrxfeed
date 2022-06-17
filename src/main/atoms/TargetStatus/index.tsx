import React from 'react';
import { InfoCircleIcon } from '@assets';
import { classNames } from '@common/utils';
import { TargetStatusConfig, TargetStatusType } from '@main/entity';
import { getTrackingStatusName } from '@main/utils';

interface TargetStatusMessageProps {
  type: TargetStatusType;
  riskRange: number;
  exceeding: number;
}

export const TargetStatusMessage: React.VFC<TargetStatusMessageProps> = ({
  type,
  riskRange,
  exceeding,
}) => {
  switch (type) {
    case TargetStatusType.OnTrack:
      return <p>Spend is below the target</p>;
    case TargetStatusType.AtRisk:
      return (
        <p>
          Spend is within
          <span style={{ color: TargetStatusConfig[TargetStatusType.AtRisk].dot }}>
            {` ${riskRange}% `}
          </span>
          of the target
        </p>
      );
    case TargetStatusType.Exceeded:
      return (
        <p>
          Spend is exceeding the target by
          <span
            className="mx-2"
            style={{ color: TargetStatusConfig[TargetStatusType.Exceeded].dot }}
          >
            {` ${exceeding}% `}
          </span>
        </p>
      );
    default:
      return <p>Spend is below the target</p>;
  }
};

interface TargetStatusProps {
  className?: string;
  type: TargetStatusType;
  exceeding: number;
}

const TargetStatus: React.VFC<TargetStatusProps> = ({ className = '', type, exceeding }) => {
  const { label, background, dot } = TargetStatusConfig[type];
  return (
    <div
      className={classNames(
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
      <p className="text-Green-800 text-xs font-medium" style={{ color: label }}>
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
