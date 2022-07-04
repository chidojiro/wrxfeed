import clsx from 'clsx';
import React from 'react';
import { DepartmentSummary, TargetStatusType } from '../types';

type SummaryRowProps = {
  data: DepartmentSummary;
};

const getStatusColor = (status?: TargetStatusType) => {
  switch (status) {
    case TargetStatusType.OnTrack:
      return 'bg-Green-400';
    case TargetStatusType.AtRisk:
      return 'bg-yellow-2';
    case TargetStatusType.Exceeded:
      return 'bg-red-1';
    default:
      return 'bg-transparent';
  }
};

export const SummaryRow = ({
  data: { commentCount, id, name, spends, target },
}: SummaryRowProps) => {
  return (
    <div
      className={clsx(
        'grid grid-cols-10 py-0.5',
        'border-b border-Gray-28',
        'py-0.5 px-1',
        'flex items-center',
        'text-xs',
      )}
    >
      <div className="col-span-5 flex items-center gap-2 text-Gray-3">
        <div className={clsx('rounded-full h-9 w-1', getStatusColor(target?.trackingStatus))}></div>
        <p>{name}</p>
      </div>
      <div className="col-span-2 text-Gray-6 text-center">{spends}</div>
      <div className="col-span-2 text-Gray-6 text-center">{target?.spends}</div>
      <div className="col-span-1">{commentCount}</div>
    </div>
  );
};
