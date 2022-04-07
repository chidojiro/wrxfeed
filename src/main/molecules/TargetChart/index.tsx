import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, TooltipProps } from 'recharts';

import { ChartLineProps, LineChartData } from '@main/types';
import { getChartLevels } from '@main/chart.utils';
import { classNames } from '@common/utils';
import { ValueType, NameType } from 'recharts/src/component/DefaultTooltipContent';
import { TransLineItem } from '@main/entity';

const MIN_Y_VALUE = 500;

interface TargetChartViewProps {
  className?: string;
  chartData: LineChartData<TransLineItem[]>;
  targetAmount: number;
  showTargetLine?: boolean;
  renderXAxis?: () => JSX.Element;
  renderTooltip?: (props: TooltipProps<ValueType, NameType>) => JSX.Element | null;
}

const TargetChart: React.VFC<TargetChartViewProps> = ({
  className,
  chartData,
  targetAmount = 0,
  showTargetLine,
  renderXAxis,
  renderTooltip,
}) => {
  const { data, lines, maxValue } = chartData;
  const maxValueForChart = Math.max(
    targetAmount > maxValue ? targetAmount * 1.2 : maxValue,
    MIN_Y_VALUE,
  );
  const chartLevels = getChartLevels(maxValueForChart);
  const targetBottom = Math.round((targetAmount / maxValueForChart) * 100);

  return (
    <div className="flex flex-col mt-2 w-full h-[514px]">
      <div className="flex relative flex-col flex-1 my-6">
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
          {showTargetLine && (
            <div
              key="dataLevels-dashed-line"
              style={{
                bottom: targetBottom,
              }}
              className="flex absolute flex-row space-x-4 items-center w-full"
            >
              <p className={classNames('text-xs font-semibold text-right w-8', 'text-Accent-2')} />
              <div className={classNames('flex flex-1 w-auto h-px', 'dashed-line')} />
            </div>
          )}
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
            <Tooltip cursor position={{ y: 5 }} content={renderTooltip} />
            {lines.map((line: ChartLineProps) => {
              return (
                <Line
                  key={`ChartLine-${line.name}`}
                  name={line.name}
                  type="linear"
                  dataKey={line.dataKey}
                  strokeWidth={4}
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
