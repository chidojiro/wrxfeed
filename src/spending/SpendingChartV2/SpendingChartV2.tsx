import { DateRangeFilter } from '@/feed/types';
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
  dateRange?: DateRangeFilter;
  highlightedDataKey?: number;
};

export const SpendingChartV2 = <TData extends BaseData>({
  data,
  charts,
  dateRange,
  highlightedDataKey,
}: SpendingChartV2Props<TData>) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number>();

  const getCellOpacity = (index: number, dataKey?: number) => {
    if (hoveredIndex && hoveredIndex !== index) {
      return 0.5;
    }

    if (highlightedDataKey && highlightedDataKey !== dataKey) {
      return 0.2;
    }

    return 1;
  };

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
    name: dayjs()
      .set('month', item.month - 1)
      .format('MMM'),
  }));

  const defaultBarSize = React.useMemo(() => {
    if (dateRange === '30-days') return 8;

    return 24;
  }, [dateRange]);

  const renderBar = (chartInfo: BarChartInfo) => {
    if (!chartInfo.stackedBars) {
      return (
        <Bar
          dataKey={chartInfo.dataKey ?? ''}
          name={chartInfo.title}
          barSize={chartInfo.width ?? defaultBarSize}
          color={chartInfo.color}
          fill={chartInfo.color}
          textAnchor="start"
        >
          {chartData.map((_, index) => (
            <Cell
              key={index}
              color={chartInfo.color}
              fill={chartInfo.color}
              opacity={getCellOpacity(index, chartInfo.dataKey ? +chartInfo.dataKey : 0)}
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
            barSize={chartInfo.width ?? defaultBarSize}
            color={color}
            fill={color}
            textAnchor="start"
          >
            {chartData.map((_, index) => (
              <Cell
                key={index}
                color={color}
                fill={color}
                opacity={getCellOpacity(
                  index,
                  !isNaN(Number(dataKey)) ? Number(dataKey) : undefined,
                )}
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

  const barGap = React.useMemo(() => {
    if (dateRange === '30-days') return -14;

    return -36;
  }, [dateRange]);

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
      <XAxis hoveredIndex={hoveredIndex} dateRange={dateRange} />
    </div>
  );
};
