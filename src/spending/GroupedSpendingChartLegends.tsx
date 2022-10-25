import { Button } from '@/common/components';
import { getDisplayUsdAmount } from '@/main/utils';
import { Entities } from '@/types';
import clsx from 'clsx';
import { Spending } from './types';
import { getThisYearTotalsGroupedByItem } from './utils';

export type GroupedSpendingChartLegendsProps = {
  spendings: Spending[];
  groupBy: Entities;
  highlightedItemId?: number;
  onItemMouseEnter: (itemId: number) => void;
  onItemMouseLeave: () => void;
};

const LabelsByGroupBy = {
  DEPARTMENT: 'Teams',
  CATEGORY: 'Categories',
  VENDOR: 'Vendors',
};

export const GroupedSpendingChartLegends = ({
  spendings,
  groupBy,
  highlightedItemId,
  onItemMouseEnter,
  onItemMouseLeave,
}: GroupedSpendingChartLegendsProps) => {
  const thisYearTotals = getThisYearTotalsGroupedByItem(spendings);

  return (
    <div className="flex flex-col">
      <h3 className="font-semibold">{LabelsByGroupBy[groupBy]}</h3>
      <div className="border border-Gray-12 rounded-lg p-2 w-[180px] mt-2 text-[10px] flex flex-col flex-1 overflow-auto max-h-[400px]">
        {thisYearTotals.flat().map(({ color, id, name, total }) => (
          <Button
            key={id}
            className={clsx('flex items-center justify-between gap-2 py-1', {
              'opacity-30': highlightedItemId && highlightedItemId !== id,
            })}
            onMouseEnter={() => onItemMouseEnter?.(id)}
            onMouseLeave={onItemMouseLeave}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: color }}
              ></div>
              <span className="break-words">{name}</span>
            </div>
            <span className="text-Gray-3">{getDisplayUsdAmount(total)}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
