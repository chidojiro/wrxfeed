import { TargetArrowFilled } from '@/assets';
import { useFetcher, useScrollbarDetector } from '@/common/hooks';
import { ClassName } from '@/common/types';
import { MainLayoutLoader } from '@/layout/MainLayoutLoader';
import { DepartmentApis } from '@/team/apis';
import clsx from 'clsx';
import React from 'react';
import { SummaryRow } from './SummaryRow';

type AllCompanySummaryProps = ClassName;

export const AllCompanySummary = ({ className }: AllCompanySummaryProps) => {
  const summaryListRef = React.useRef<HTMLDivElement>(null);

  const { data: summaries = [], isValidating } = useFetcher(['allCompanySummaries'], () =>
    DepartmentApis.getSummaries(),
  );

  const { scrollbarWidth: summaryListSCrollbarWidth } = useScrollbarDetector(summaryListRef, [
    summaries,
  ]);

  return (
    <MainLayoutLoader active={isValidating}>
      <div
        className={clsx(
          'rounded-card shadow-shadowCard bg-white h-[450px] flex flex-col',
          className,
        )}
      >
        <div className="p-5 flex items-center gap-2 font-semibold text-Gray-3">
          <TargetArrowFilled width={16} height={16} />
          <span>Summary</span>
        </div>
        <div
          className={clsx(
            'grid grid-cols-10',
            'text-center font-semibold text-2xs',
            'border-t border-b border-Gray-28',
            'py-2.5 px-1',
          )}
          style={{ paddingRight: summaryListSCrollbarWidth }}
        >
          <div className="pl-2 col-span-5 text-left">Team</div>
          <div className="col-span-2">Spend</div>
          <div className="col-span-2">Target</div>
        </div>
        <div className="overflow-auto flex-1 pb-5" ref={summaryListRef}>
          {summaries.map((summary) => (
            <SummaryRow data={summary} key={summary.id} />
          ))}
        </div>
      </div>
    </MainLayoutLoader>
  );
};
