import { getChartLevels } from '@/main/chart.utils';
import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';
import { Bar, Cell, ComposedChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import { TooltipContent } from './TooltipContent';
import { BarChartInfo, ChartInfo } from './types';
import { XAxis } from './XAxis';

const MIN_Y_VALUE = 100;

type BaseData = {
  month: number;
  thisYearTotal: number;
  lastYearTotal: number;
};

type SpendingChartV2Props<TData extends BaseData> = {
  charts: ChartInfo[];
  data: TData[];
  barGap?: number;
};

export const SpendingChartV2 = <TData extends BaseData>({
  data,
  charts,
  barGap,
}: SpendingChartV2Props<TData>) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number>();

  const maxValue = Math.max(
    ...data.map(({ thisYearTotal }) => thisYearTotal),
    ...data.map(({ lastYearTotal }) => lastYearTotal),
    MIN_Y_VALUE,
  );
  const maxValueWithSurplus = Math.ceil(maxValue * 1.1);
  const maxValueForChart = Math.max(maxValueWithSurplus, MIN_Y_VALUE);
  const chartLevels = getChartLevels(maxValueForChart);

  const chartData = data.map((item) => ({
    ...item,
    name: dayjs().set('month', item.month).format('MMM'),
  }));

  const renderBar = (chartInfo: BarChartInfo) => {
    if (!chartInfo.stackedBars) {
      return (
        <Bar
          dataKey={chartInfo.dataKey ?? ''}
          name={chartInfo.title}
          barSize={chartInfo.width ?? 24}
          color={chartInfo.color}
          fill={chartInfo.color}
          textAnchor="start"
        >
          {chartData.map((_, index) => (
            <Cell
              key={index}
              color={chartInfo.color}
              fill={chartInfo.color}
              opacity={hoveredIndex === undefined || hoveredIndex === index ? 1 : 0.5}
            />
          ))}
        </Bar>
      );
    }
    return (
      <>
        {chartInfo.stackedBars.map(({ color, dataKey, title }) => (
          <Bar
            key={dataKey}
            stackId={chartInfo.stackId ?? 'stacked-bar'}
            dataKey={dataKey}
            name={title}
            barSize={chartInfo.width ?? 24}
            color={color}
            fill={color}
            textAnchor="start"
          >
            {chartData.map((_, index) => (
              <Cell
                key={index}
                color={color}
                fill={color}
                opacity={hoveredIndex === undefined || hoveredIndex === index ? 1 : 0.5}
              />
            ))}
          </Bar>
        ))}
      </>
    );
  };

  const renderCharts = () => {
    return charts.map((chart) => {
      if (chart.type === 'BAR') return renderBar(chart);

      return null;
    });
  };

  return (
    <div className={clsx('flex flex-col w-full h-full')}>
      <div className="flex relative flex-col flex-1 max-h-[400px]">
        <div className="absolute top-[-3px] flex w-full h-full justify-between flex-col-reverse">
          {chartLevels.map((level) => {
            const textColor = level?.isTarget ? 'text-Accent-2' : 'text-Gray-6';
            return (
              <div
                key={`dataLevels-${level?.id}`}
                className="flex flex-row space-x-4 items-center w-full"
              >
                <p className={clsx('text-xs font-semibold text-right w-8', textColor)}>
                  {level?.title}
                </p>
                <div
                  className={clsx(
                    'flex flex-1 w-auto h-px',
                    level?.isTarget ? 'dashed-line' : 'bg-Gray-11',
                  )}
                />
              </div>
            );
          })}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 10,
              left: 50,
              bottom: 10,
            }}
            barGap={barGap}
            onMouseMove={(data) => setHoveredIndex(data.activeTooltipIndex)}
            onMouseLeave={() => setHoveredIndex(undefined)}
          >
            {renderCharts()}
            <YAxis domain={[0, maxValueForChart]} width={0} height={0} className="opacity-0" />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              position={{ y: 5 }}
              content={(props) => <TooltipContent {...props} showTarget={false} overallTarget />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <XAxis startMonth={1} endMonth={12} bar hoveredIndex={hoveredIndex} />
    </div>
  );
};
