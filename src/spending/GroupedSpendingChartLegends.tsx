import { RestrictedItem } from '@/auth/RestrictedItem';
import { Button } from '@/common/components';
import { ClassName } from '@/common/types';
import { getDisplayUsdAmount } from '@/main/utils';
import { RestrictedItem as TRestrictedItem } from '@/role/types';
import { useRestrictedItems } from '@/role/useRestrictedItems';
import { Entities } from '@/types';
import clsx from 'clsx';
import { isEqual } from 'lodash-es';
import { useHistory } from 'react-router-dom';
import { Spending } from './types';
import { getThisYearTotalsGroupedByItem } from './utils';

export type GroupedSpendingChartLegendsProps = ClassName & {
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
  className,
  onItemMouseEnter,
  onItemMouseLeave,
}: GroupedSpendingChartLegendsProps) => {
  const thisYearTotals = getThisYearTotalsGroupedByItem(spendings);

  const { restrictedItems } = useRestrictedItems();

  const history = useHistory();

  const isRestricted = (id: number, type: TRestrictedItem['type']) => {
    return !!restrictedItems.find((item) => isEqual({ id, type }, item));
  };

  const handleRedirectUrl = (id: number) => {
    if (groupBy === 'CATEGORY') {
      history.push(`/categories/${id}`);
    }
    if (groupBy === 'VENDOR') {
      history.push(`/vendors/${id}`);
    }
    if (groupBy === 'DEPARTMENT') {
      history.push(`/departments/${id}`);
    }
  };

  return (
    <div className={clsx('flex flex-col', className)}>
      <h3 className="font-semibold h-10 flex items-end">{LabelsByGroupBy[groupBy]}</h3>
      <div className="border border-Gray-12 rounded-lg p-2 min-w-[180px] mt-3 text-[10px] flex flex-col flex-1 overflow-auto max-h-[400px]">
        {thisYearTotals.flat().map(({ color, id, name, total }) => (
          <>
            {isRestricted(id ?? 0, groupBy) ? (
              <RestrictedItem />
            ) : (
              <Button
                key={id}
                className={clsx('flex items-center justify-between gap-2 py-1', {
                  'opacity-30': highlightedItemId && highlightedItemId !== id,
                })}
                onMouseEnter={() => onItemMouseEnter?.(id)}
                onMouseLeave={onItemMouseLeave}
                onClick={() => handleRedirectUrl(id)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: color }}
                  ></div>
                  <span className="break-words text-left">{name}</span>
                </div>
                <span className="text-Gray-3">{getDisplayUsdAmount(total)}</span>
              </Button>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
