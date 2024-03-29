import { INITIAL_CHART_DATA } from '@/common/constants';
import { getChartLevels } from '@/main/chart.utils';
import { ChartLineProps, LineChartData } from '@/main/types';
import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, TooltipProps, YAxis } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const MIN_Y_VALUE = 100;

type TargetChartProps<T> = {
  className?: string;
  containerStyle?: CSSProperties;
  containerClass?: string;
  chartData?: LineChartData<T>;
  renderXAxis?: () => JSX.Element;
  renderReferenceLines?: () => JSX.Element | null;
  renderTooltip?: (props: TooltipProps<ValueType, NameType>) => JSX.Element | null;
  levelLabelClass?: string;
  prevYearColor?: string;
  showTarget?: boolean;
};

export const TargetChart: <T>(
  p: TargetChartProps<T>,
) => React.ReactElement<TargetChartProps<T>> = ({
  className,
  containerStyle,
  containerClass,
  chartData,
  renderXAxis,
  renderReferenceLines,
  renderTooltip,
  levelLabelClass = '',
  prevYearColor,
  showTarget,
}) => {
  const { data, lines, maxValue } = chartData || INITIAL_CHART_DATA;
  const maxValueWithSurplus = Math.ceil(maxValue * 1.1);
  const maxValueForChart = Math.max(maxValueWithSurplus, MIN_Y_VALUE);
  const chartLevels = getChartLevels(maxValueForChart);

  return (
    <div
      style={containerStyle}
      className={clsx('flex flex-col w-full h-full', containerClass || '')}
    >
      <div className="flex relative flex-col flex-1">
        <div className="absolute top-[-3px] flex w-full h-full justify-between flex-col-reverse">
          {chartLevels.map((level) => {
            const textColor = level?.isTarget ? 'text-Accent-2' : 'text-Gray-6';
            return (
              <div
                key={`dataLevels-${level?.id}`}
                className="flex flex-row space-x-4 items-center w-full"
              >
                <p
                  className={clsx(
                    'text-xs font-semibold text-right w-8 flex justify-end',
                    textColor,
                    levelLabelClass,
                  )}
                >
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
        <ResponsiveContainer width="100%" height="100%" className={className}>
          <AreaChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 50,
              bottom: 10,
            }}
          >
            <YAxis domain={[0, maxValueForChart]} width={0} height={0} className="opacity-0" />
            {data.length && <Tooltip cursor position={{ y: 5 }} content={renderTooltip} />}
            {renderReferenceLines && renderReferenceLines()}
            {lines
              .slice()
              .reverse()
              .map((line: ChartLineProps) => {
                let fill = line.fill;
                if (line.dataKey === 'lastYear' && prevYearColor) {
                  fill = prevYearColor;
                }

                if (line.dataKey === 'target' && !showTarget) return null;

                return (
                  <Area
                    key={line.name}
                    name={line.name}
                    type={line.type as any}
                    dataKey={line.dataKey}
                    strokeWidth={line.strokeWidth}
                    stroke={line.stroke}
                    strokeDasharray={line.strokeDasharray}
                    dot={line.dot}
                    fill={fill}
                    opacity={line.opacity}
                  />
                );
              })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {renderXAxis && renderXAxis()}
    </div>
  );
};
