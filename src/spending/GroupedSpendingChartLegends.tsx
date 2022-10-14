import { getDisplayUsdAmount } from '@/main/utils';
import { GetVendorSpendingsParams } from '@/vendor/types';
import React from 'react';
import { Spending } from './types';
import { getThisYearTotalsGroupedByItem } from './utils';

export type GroupedSpendingChartLegendsProps = {
  spendings: Spending[];
  groupBy: Exclude<GetVendorSpendingsParams['groupBy'], undefined>;
};

const LabelsByGroupBy = {
  DEPARTMENT: 'Teams',
  CATEGORY: 'Categories',
};

export const GroupedSpendingChartLegends = ({
  spendings,
  groupBy,
}: GroupedSpendingChartLegendsProps) => {
  const thisYearTotals = getThisYearTotalsGroupedByItem(spendings);

  return (
    <div className="flex flex-col">
      <h3 className="font-semibold">{LabelsByGroupBy[groupBy]}</h3>
      <div className="border border-Gray-12 rounded-lg p-2 w-[180px] mt-2 text-[10px] flex flex-col gap-2 flex-1 overflow-auto max-h-[400px]">
        {thisYearTotals.flat().map(({ color, id, name, total }) => (
          <div key={id} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: color }}
              ></div>
              <span className="break-words">{name}</span>
            </div>
            <span className="text-Gray-3">{getDisplayUsdAmount(total)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
