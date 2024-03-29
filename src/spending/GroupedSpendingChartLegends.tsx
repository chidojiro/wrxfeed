import { Button } from '@/common/components';
import { useDisclosure } from '@/common/hooks';
import { ClassName } from '@/common/types';
import { DateRangeFilter } from '@/feed/types';
import { getDisplayUsdAmount } from '@/main/utils';
import { RestrictedItem as TRestrictedItem } from '@/role/types';
import { useRestrictedItems } from '@/role/useRestrictedItems';
import { Entities } from '@/types';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { isEqual } from 'lodash-es';
import { useHistory } from 'react-router-dom';
import { Spending } from './types';
import { getSortedTotalSpendings } from './utils';

export type GroupedSpendingChartLegendsProps = ClassName & {
  spendings: Spending[];
  groupBy: Entities;
  highlightedItemId?: number;
  onItemMouseEnter: (itemId: number) => void;
  onItemMouseLeave: () => void;
  dateRange: DateRangeFilter;
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
  dateRange,
}: GroupedSpendingChartLegendsProps) => {
  const sortedTotalSpendings = getSortedTotalSpendings(spendings, dateRange);

  const showOthersDisclosure = useDisclosure();

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

  const firstTen = sortedTotalSpendings.flat().slice(0, 10);
  const remaining = sortedTotalSpendings.flat().slice(10);

  return (
    <div className={clsx('flex flex-col', className)}>
      <h3 className="font-semibold h-5 flex items-end">{LabelsByGroupBy[groupBy]}</h3>
      <div className="border border-Gray-12 rounded-lg p-2 min-w-[180px] mt-3 text-[10px] flex flex-col flex-1 overflow-auto max-h-[400px]">
        {firstTen
          .filter(({ id }) => !isRestricted(id ?? 0, groupBy))
          .flat()
          .map(({ color, id, name, total }) => (
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
          ))}
        {!!remaining.length && (
          <>
            <Button
              onClick={showOthersDisclosure.toggle}
              className="flex gap-1 my-1 -left-0.5 relative"
            >
              {!showOthersDisclosure.isOpen ? (
                <ChevronDownIcon width={14} />
              ) : (
                <ChevronUpIcon width={14} />
              )}
              Other
            </Button>
            {showOthersDisclosure.isOpen &&
              remaining
                .filter(({ id }) => !isRestricted(id ?? 0, groupBy))
                .flat()
                .map(({ color, id, name, total }) => (
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
                ))}
          </>
        )}
      </div>
    </div>
  );
};
