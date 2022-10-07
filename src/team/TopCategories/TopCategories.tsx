import { CategoryIcon } from '@/assets';
import { HiddenItem } from '@/auth/HiddenItem';
import { EmptyState } from '@/common/components/EmptyState';
import { TopCategories as TTopCategories } from '@/main/entity';
import { useRestrictedItems } from '@/role/useRestrictedItems';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { TimeRangeSelect } from '../TimeRangeSelect';
import { TimeRange } from '../types';
import PieActiveShape from './PieActiveShape';
import TopCategoriesChartTooltip from './TopCategoriesChartTooltip';

const COLORS = ['#165DFF', '#0FC6C2', '#F7BA1E', '#7A3FEB', '#3491FA', '#DFE1E6'];

export type CategoryPieCell = {
  percentage: number;
  color: string;
  id: number;
  name: string;
  spend: number;
};

type TopCategoriesProps = {
  timeRange: TimeRange;
  onTimeRangeChange: (value: TimeRange) => void;
  topCategories: TTopCategories[];
};

export const TopCategories = ({
  timeRange,
  onTimeRangeChange,
  topCategories,
}: TopCategoriesProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const history = useHistory();

  const { restrictedItems } = useRestrictedItems();

  const restrictedCategoryIds = restrictedItems
    .filter(({ type }) => type === 'CATEGORY')
    .map(({ id }) => id);

  const handlePieEnter = useCallback(
    (_: unknown, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  const handlePieLeave = useCallback(() => {
    setActiveIndex(-1);
  }, [setActiveIndex]);

  const sortedData = topCategories.sort((a, b) => b.spend - a.spend);

  const spendSum = sortedData.reduce((acc, cur) => acc + cur.spend, 0);

  const primaryCategories = sortedData.slice(0, 5);
  const otherCategories = sortedData
    .slice(5)
    .reduce((acc, cur) => ({ ...acc, spend: acc.spend + cur.spend }), {
      name: 'Other',
      spend: 0,
    } as TTopCategories);
  const chartData: CategoryPieCell[] = [
    ...primaryCategories,
    otherCategories.spend && otherCategories,
  ]
    .filter((item): item is TTopCategories => !!item)
    .map((item, idx) => ({
      ...item,
      percentage: spendSum ? (item.spend * 100) / spendSum : 0,
      color: COLORS[idx],
    }))
    .reverse();

  const handleClickCategoryCell = (cell: CategoryPieCell) => {
    if (isNaN(cell.id)) {
      return;
    }
    history.push({
      pathname: `/categories/${cell?.id}`,
    });
  };

  return (
    <div className="shadow-card rounded-card bg-white">
      <div className="flex items-center justify-between p-5 border-b border-gray-28">
        <div className="flex gap-2 items-center font-semibold">
          <CategoryIcon />
          Top Categories
        </div>
        <TimeRangeSelect value={timeRange} onChange={onTimeRangeChange} />
      </div>
      {chartData.length === 0 ? (
        <div className="flex flex-1 p-6">
          <EmptyState
            title="No recent categories"
            content="This will change as more transactions come in."
          />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-6 py-6 pr-6">
          <PieChart width={200} height={200}>
            <Tooltip content={(props) => <TopCategoriesChartTooltip {...props} />} />
            <Pie
              startAngle={90}
              endAngle={450}
              activeIndex={activeIndex}
              activeShape={PieActiveShape}
              data={chartData}
              cx={100}
              cy={100}
              innerRadius={60}
              outerRadius={80}
              dataKey="spend"
              labelLine={false}
              onMouseEnter={handlePieEnter}
              onMouseLeave={handlePieLeave}
              onClick={(_: unknown, index: number) => handleClickCategoryCell(chartData[index])}
            >
              {chartData.map(({ color, name }) => (
                // eslint-disable-next-line react/no-array-index-key
                <Cell key={name} fill={color} />
              ))}
            </Pie>
          </PieChart>
          <ul className="flex flex-col gap-4">
            {chartData
              .slice()
              .reverse()
              .map(({ name, color, id }) => {
                return (
                  <li
                    key={color}
                    className={clsx(
                      'text-2xs text-gray-3 flex items-baseline leading-4 gap-1 w-[fit-content]',
                      { '!items-center': restrictedCategoryIds.includes(id) },
                    )}
                  >
                    <div
                      className="rounded-full w-1.5 h-1.5 flex-shrink-0"
                      style={{ background: color }}
                    ></div>
                    {restrictedCategoryIds.includes(id) ? <HiddenItem /> : name}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};
