import React, { CSSProperties } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, TooltipProps } from 'recharts';

import { ChartLineProps, LineChartData } from '@main/types';
import { getChartLevels } from '@main/chart.utils';
import { classNames } from '@common/utils';
import { ValueType, NameType } from 'recharts/src/component/DefaultTooltipContent';

const MIN_Y_VALUE = 100;

const INITIAL_DATA: LineChartData = {
  data: [],
  lines: [],
  legends: [],
  maxValue: 0,
};

interface TargetChartProps<T> {
  className?: string;
  containerStyle?: CSSProperties;
  containerClass?: string;
  chartData?: LineChartData<T>;
  maxYValue?: number;
  renderXAxis?: () => JSX.Element;
  renderReferenceLines?: () => JSX.Element | null;
  renderTooltip?: (props: TooltipProps<ValueType, NameType>) => JSX.Element | null;
}

const TargetChart: <T extends unknown>(
  p: TargetChartProps<T>,
) => React.ReactElement<TargetChartProps<T>> = ({
  className,
  containerStyle,
  containerClass,
  chartData,
  maxYValue,
  renderXAxis,
  renderReferenceLines,
  renderTooltip,
}) => {
  const { data, lines, maxValue } = chartData || INITIAL_DATA;
  const maxValueForChart = Math.max(
    (maxYValue ?? 0) > maxValue ? (maxYValue ?? 0) * 1.2 : maxValue,
    MIN_Y_VALUE,
  );
  const chartLevels = getChartLevels(maxValueForChart);

  return (
    <div
      style={containerStyle}
      className={classNames('flex flex-col w-full h-full', containerClass || '')}
    >
      <div className="flex relative flex-col flex-1">
        <div className="absolute flex w-full h-full justify-between flex-col-reverse">
          {chartLevels.map((level) => {
            const textColor = level?.isTarget ? 'text-Accent-2' : 'text-Gray-6';
            return (
              <div
                key={`dataLevels-${level?.id}`}
                className="flex flex-row space-x-4 items-center w-full"
              >
                <p className={classNames('text-xs font-semibold text-right w-8', textColor)}>
                  {level?.title}
                </p>
                <div
                  className={classNames(
                    'flex flex-1 w-auto h-px',
                    level?.isTarget ? 'dashed-line' : 'bg-Gray-11',
                  )}
                />
              </div>
            );
          })}
        </div>
        <ResponsiveContainer width="100%" height="100%" className={className}>
          <LineChart
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
            {lines.map((line: ChartLineProps) => {
              return (
                <Line
                  key={`ChartLine-${line.name}`}
                  name={line.name}
                  type="linear"
                  dataKey={line.dataKey}
                  strokeWidth={line.strokeWidth}
                  stroke={line.stroke}
                  strokeDasharray={line.strokeDasharray}
                  dot={line.dot}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {renderXAxis && renderXAxis()}
    </div>
  );
};

export default TargetChart;
