import { TargetArrowFilled } from '@/assets';
import { ClassName } from '@/common/types';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { DepartmentSummary, TargetStatusType } from '../types';
import { SummaryRow } from './SummaryRow';

type AllCompanySummaryProps = ClassName;

const summaries: DepartmentSummary[] = new Array(20).fill(null).map((_, idx) => ({
  id: idx,
  name: 'department name',
  target: {
    id: 2,
    trackingStatus: [TargetStatusType.AtRisk, TargetStatusType.Exceeded, TargetStatusType.OnTrack][
      idx % 3
    ],
    spends: 1234.56,
  },
  spends: 1234.56,
  commentCount: 10,
}));

export const AllCompanySummary = ({ className }: AllCompanySummaryProps) => {
  const history = useHistory();

  // const { data: summaries = [] } = useFetcher(['/target/summaries'], () => TargetApis.getSummaries());

  const goToFeedPage = (id: number) => {
    history.push(`/feed/${id}`);
  };

  return (
    <div
      className={clsx('rounded-card shadow-shadowCard bg-white h-[450px] flex flex-col', className)}
    >
      <div className="p-5 flex items-center gap-2 font-semibold text-Gray-3">
        <TargetArrowFilled width={16} height={16} />
        <span>Summary</span>
      </div>
      <div
        className={clsx(
          'grid grid-cols-10 p-2 font-semibold text-2xs',
          'border-t border-b border-Gray-28',
        )}
      >
        <div className="col-span-5">Team</div>
        <div className="col-span-2 text-center">Spend</div>
        <div className="col-span-2 text-center">Target</div>
      </div>
      <div className="overflow-auto flex-1 pb-5">
        {summaries.map((summary) => (
          <SummaryRow data={summary} key={summary.id} />
        ))}
      </div>
    </div>
  );
};
