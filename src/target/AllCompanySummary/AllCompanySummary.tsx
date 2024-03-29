import { TargetArrowFilled } from '@/assets';
import { OverlayLoader } from '@/common/components';
import { useDisclosure, useFetcher, useScrollbarDetector } from '@/common/hooks';
import { ClassName } from '@/common/types';
import { useRestrictedItems } from '@/role/useRestrictedItems';
import { DepartmentApis } from '@/team/apis';
import clsx from 'clsx';
import React from 'react';
import { SummaryRow } from './SummaryRow';

type AllCompanySummaryProps = ClassName;

export const AllCompanySummary = ({ className }: AllCompanySummaryProps) => {
  const summaryListRef = React.useRef<HTMLDivElement>(null);
  const isOnTopDisclosure = useDisclosure();

  const { data: summaries = [], isValidating } = useFetcher(['allCompanySummaries'], () =>
    DepartmentApis.getSummaries(),
  );

  const { scrollbarWidth: summaryListScrollbarWidth } = useScrollbarDetector(summaryListRef, [
    summaries,
  ]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const isOnTop = (e.target as HTMLInputElement).scrollTop === 0;
    isOnTopDisclosure.set(!isOnTop);
  };

  const { restrictedItems } = useRestrictedItems();

  return (
    <OverlayLoader loading={isValidating} className={className}>
      <div className={clsx('rounded-card shadow-card bg-white h-[450px] flex flex-col')}>
        <div className="p-5 flex items-center gap-2 font-semibold text-Gray-3">
          <TargetArrowFilled width={16} height={16} />
          <span>Summary</span>
        </div>
        <div
          className={clsx(
            'grid grid-cols-12',
            'text-center font-semibold text-2xs',
            'border-t border-b border-Gray-28',
            'py-2.5 px-1',
            { 'shadow-md': isOnTopDisclosure.isOpen },
          )}
          style={{ paddingRight: summaryListScrollbarWidth }}
        >
          <div className="pl-2 col-span-5 text-left">Team</div>
          <div className="col-span-2">Spend</div>
          <div className="col-span-2">Target</div>
          <div className="col-span-2">Comments</div>
        </div>
        <div
          onScroll={handleScroll}
          className="overflow-auto hide-scrollbar flex-1 pb-5 p-px"
          ref={summaryListRef}
        >
          {summaries
            .filter(
              ({ id }) =>
                !restrictedItems.find(
                  (restrictedItem) =>
                    restrictedItem.id === id && restrictedItem.type === 'DEPARTMENT',
                ),
            )
            .map((summary) => (
              <SummaryRow data={summary} key={summary.id} />
            ))}
        </div>
      </div>
    </OverlayLoader>
  );
};
