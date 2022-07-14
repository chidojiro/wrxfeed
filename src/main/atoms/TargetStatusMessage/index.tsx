import { TargetStatusConfig, TargetStatusType } from '@/target/types';
import React from 'react';

interface TargetStatusMessageProps {
  type: TargetStatusType;
  riskRange: number;
  exceeding: number;
}

const TargetStatusMessage: React.FC<TargetStatusMessageProps> = ({
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
            {` ${riskRange.toFixed(0)}% `}
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
            {` ${exceeding.toFixed(2)}% `}
          </span>
        </p>
      );
    default:
      return <p>Spend is below the target</p>;
  }
};

export default TargetStatusMessage;
