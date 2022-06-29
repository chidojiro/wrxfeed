import { CategoryIcon } from '@/assets';
import { TopCategories as TTopCategories } from '@/main/entity';
import TopCategoriesChartTooltip from '@/main/molecules/TopCategoriesChartTooltip';
import React, { useCallback, useState } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { useTopCategories } from '../useTopCategories';
import PieActiveShape from './PieActiveShape';

const COLORS = ['#165DFF', '#0FC6C2', '#F7BA1E', '#7A3FEB', '#3491FA', '#DFE1E6'];

export const TopCategories = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const { data = [] } = useTopCategories();

  const handlePieEnter = useCallback(
    (_: unknown, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  const handlePieLeave = useCallback(() => {
    setActiveIndex(-1);
  }, [setActiveIndex]);

  const sortedData = data.sort((a, b) => b.spend - a.spend);

  const spendSum = sortedData.reduce((acc, cur) => acc + cur.spend, 0);

  const primaryCategories = sortedData.slice(0, 5);
  const otherCategories = sortedData
    .slice(5)
    .reduce((acc, cur) => ({ ...acc, spend: acc.spend + cur.spend }), {
      name: 'Other',
      spend: 0,
    } as TTopCategories);
  const chartData = [...primaryCategories, otherCategories.spend && otherCategories]
    .filter((item): item is TTopCategories => !!item)
    .map((item, idx) => ({
      ...item,
      percentage: spendSum ? (item.spend * 100) / spendSum : 0,
      color: COLORS[idx],
    }))
    .reverse();

  return (
    <div className="shadow-shadowCard rounded-card bg-white">
      <div className="flex items-center justify-between p-5 border-b border-gray-28">
        <div className="flex gap-2 items-center font-semibold">
          <CategoryIcon />
          Top Categories
        </div>
        <p className="text-Gray-6 text-xs">Last 30 Days</p>
      </div>
      <div className="flex items-center gap-6 py-6 pr-6">
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
          >
            {chartData.map(({ color, name }) => (
              // eslint-disable-next-line react/no-array-index-key
              <Cell key={name} fill={color} />
            ))}
          </Pie>
        </PieChart>
        <ul className="flex flex-col gap-4 flex-1">
          {chartData
            .slice()
            .reverse()
            .map(({ name, color }) => {
              return (
                <li
                  key={color}
                  className="text-2xs text-gray-3 flex items-baseline leading-4 gap-1 w-full"
                >
                  <div className="rounded-full w-1.5 h-1.5" style={{ background: color }}></div>
                  {name}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
