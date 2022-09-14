import { getChartLevels } from '@/main/chart.utils';
import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import { Spending } from '../types';
import { TooltipContent } from './TooltipContent';
import { XAxis } from './XAxis';

const MIN_Y_VALUE = 100;

type SpendingBarChartProps = {
  thisYearData: Spending[];
  lastYearData: Spending[];
};

export const SpendingBarChart = ({ thisYearData, lastYearData }: SpendingBarChartProps) => {
  const maxValue = Math.max(
    ...thisYearData.map(({ total }) => total),
    ...lastYearData.map(({ total }) => total),
    MIN_Y_VALUE,
  );
  const maxValueWithSurplus = Math.ceil(maxValue * 1.1);
  const maxValueForChart = Math.max(maxValueWithSurplus, MIN_Y_VALUE);
  const chartLevels = getChartLevels(maxValueForChart);

  const data = new Array(12).fill(null).map((_, idx) => ({
    name: dayjs().set('month', idx).format('MMM'),
    month: idx + 1,
    thisYear: thisYearData.find(({ month }) => month === idx + 1)?.total?.toFixed(2) ?? 0,
    lastYear: lastYearData.find(({ month }) => month === idx + 1)?.total?.toFixed(2) ?? 0,
  }));

  return (
    <div className={clsx('flex flex-col w-full h-full')}>
      <div className="flex relative flex-col flex-1">
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
          <BarChart
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
            <Tooltip
              cursor={{ fill: 'transparent' }}
              position={{ y: 5 }}
              content={(props) => <TooltipContent {...props} showTarget={false} overallTarget />}
            />
            <Bar name="thisYear" dataKey="thisYear" fill="#6565FB" />
            <Bar name="lastYear" dataKey="lastYear" fill="#EFF0F2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <XAxis startMonth={1} endMonth={12} />
    </div>
  );
};
