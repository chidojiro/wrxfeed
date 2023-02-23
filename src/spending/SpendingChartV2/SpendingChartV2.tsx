import { DateRangeFilter } from '@/feed/types';
import { getChartLevels } from '@/main/chart.utils';
import clsx from 'clsx';
import React from 'react';
import { Bar, Cell, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getChartTimelineUnit } from '../utils';
import { TooltipContent } from './TooltipContent';
import { BarChartInfo, ChartInfo } from './types';

const MIN_Y_VALUE = 100;

function CustomizedTick(props: any) {
  const { x, y, payload, hoveredIndex } = props;
  const { value, index } = payload;

  const [line1, line2] = value?.toString().split('\n');

  return (
    <g transform={`translate(${x},${y})`} className="text-xs font-semibold">
      <text
        x={0}
        y={0}
        dy={10}
        fill="#7D8490"
        className={clsx({
          'opacity-50': typeof hoveredIndex === 'number' && hoveredIndex !== index,
        })}
      >
        <tspan textAnchor="middle" x="0">
          {line1}
        </tspan>
        <tspan textAnchor="middle" x="0" dy="12">
          {line2}
        </tspan>
      </text>
    </g>
  );
}

type BaseData = {
  currentYearTotal: number;
  previousYearTotal: number;
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

  const timelineUnit = dateRange ? getChartTimelineUnit(dateRange) : 'month';

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
    ...data.map(({ currentYearTotal }) => currentYearTotal),
    ...data.map(({ previousYearTotal }) => previousYearTotal),
    MIN_Y_VALUE,
  );
  const maxValueWithSurplus = Math.ceil(maxValue * 1.1);
  const maxValueForChart = Math.max(maxValueWithSurplus, MIN_Y_VALUE);
  const chartLevels = getChartLevels(maxValueForChart);

  const isSlimBar = data.length > 12;

  const defaultBarSize = React.useMemo(() => {
    if (isSlimBar) return 8;

    return 24;
  }, [isSlimBar]);

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
          {data.map((_, index) => (
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
            {data.map((_, index) => (
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

  const getInterval = () => {
    if (timelineUnit === 'day') return 1;

    return 0;
  };

  const renderXAxis = () => {
    return (
      <XAxis
        dataKey="name"
        tick={<CustomizedTick hoveredIndex={hoveredIndex} />}
        tickLine={false}
        height={22}
        interval={getInterval()}
        axisLine={false}
        style={{
          fontSize: '12px',
          fontWeight: 500,
          color: '#7D8490',
          whiteSpace: 'pre-line',
        }}
      />
    );
  };

  const barGap = React.useMemo(() => {
    if (isSlimBar) return -14;

    return -36;
  }, [isSlimBar]);

  return (
    <div className={clsx('flex flex-col w-full h-full')}>
      <div className="flex relative flex-col flex-1 max-h-[400px]">
        <div className="absolute top-[-3px] flex w-full h-full justify-between flex-col-reverse pb-[22px]">
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
            data={data}
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
            {renderXAxis()}
            <Tooltip
              cursor={{ fill: 'transparent' }}
              position={{ y: 5 }}
              content={(props) => <TooltipContent {...props} showTarget={false} overallTarget />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
