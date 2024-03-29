import { HiddenItem } from '@/auth/HiddenItem';
import { decimalLogic } from '@/main/utils';
import { useRestrictedItems } from '@/role/useRestrictedItems';
import React from 'react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

export type TopCategoriesChartTooltipProps = TooltipProps<ValueType, NameType>;

const TopCategoriesChartTooltip: React.FC<TopCategoriesChartTooltipProps> = ({
  active,
  payload,
}) => {
  const { restrictedItems } = useRestrictedItems();

  const restrictedCategoryIds = restrictedItems
    .filter(({ type }) => type === 'CATEGORY')
    .map(({ id }) => id);

  if (active && payload) {
    return (
      <div className="flex bg-primary p-2 rounded-sm">
        <div className="flex flex-col">
          {payload.map(({ name, value, payload: { fill, percentage, id } }) => (
            <div key={name} className="">
              <div className="flex gap-1">
                <div className="h-4 flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full flex" style={{ background: fill }}></div>
                </div>
                {restrictedCategoryIds.includes(id) ? (
                  <HiddenItem className="text-xs" />
                ) : (
                  <p className="text-white text-2xs">
                    {name}
                    <span>:</span>
                  </p>
                )}
              </div>
              <p className="text-white text-2xs">
                <span>Spend: </span>
                <span>{decimalLogic(value as number, '$')} </span>
                <span className="text-Accent-4">{percentage.toFixed(2)}%</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default TopCategoriesChartTooltip;
