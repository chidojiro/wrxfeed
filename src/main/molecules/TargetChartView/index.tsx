import React, { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip, TooltipProps, YAxis } from 'recharts';

import { classNames, formatCurrency } from '@common/utils';
import { BasicsEditCircle } from '@assets';
import { ChartDataPoint, FeedItem, ChartLegend, ChartLineProps, ChartLevel } from '@main/entity';
import { getChartDataFromTransactions, getChartLevels } from '@main/utils';
import { ValueType, NameType } from 'recharts/src/component/DefaultTooltipContent';
import dayjs from 'dayjs';

interface TargetChartViewProps {
  className?: string;
  feedItem: FeedItem;
  onEdit: () => void;
}

const TargetChartView: React.VFC<TargetChartViewProps> = ({ className, feedItem, onEdit }) => {
  const today = new Date();
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [chartLegends, setChartLegends] = useState<ChartLegend[]>([]);
  const [chartLines, setChartLines] = useState<ChartLineProps[]>([]);
  const [chartLevels, setChartLevels] = useState<ChartLevel[]>([]);
  const [chartMaxValue, setChartMaxValue] = useState<number>(100000);
  const [targetBottom, setTargetBottom] = useState('50%');
  useEffect(() => {
    const { data, legends, lines, maxValue } = getChartDataFromTransactions(feedItem.transactions);
    const targetAmount = feedItem.target.amount ?? 0;
    setChartData(data);
    setChartLegends(legends);
    setChartLines(lines);

    let maxValueForChart = maxValue;
    if (targetAmount > maxValue) {
      maxValueForChart = targetAmount * 1.2;
    }
    setChartMaxValue(maxValueForChart);
    const levels = getChartLevels(maxValueForChart);
    setChartLevels(levels);

    setTargetBottom(`${Math.round((targetAmount / maxValueForChart) * 100)}%`);
  }, [feedItem]);

  const renderChartLegend = (item: ChartLegend) => {
    return (
      <div key={`renderChartLegend-${item.id}`} className="flex flex-row items-center space-x-2">
        <div
          className={classNames('flex w-6 h-1', item?.type ?? '')}
          style={{ backgroundColor: item?.color }}
        />
        <p className="text-Gray-3 text-xs font-semibold">{item?.name}</p>
      </div>
    );
  };

  const renderChartSymbolNote = () => {
    return (
      <div className="flex flex-row justify-center mt-6 py-2 px-[50px] space-x-8">
        {chartLegends.map(renderChartLegend)}
      </div>
    );
  };

  const renderTooltipContent = ({ label }: TooltipProps<ValueType, NameType>) => {
    const topTransactions = [
      {
        id: 0,
        vendorName: 'Amazon Business EU S.à.r.l',
        amountUsd: 10067.87,
      },
      {
        id: 1,
        vendorName: 'SHI International Corp',
        amountUsd: 7067.87,
      },
      {
        id: 2,
        vendorName: 'Centralpoint',
        amountUsd: 1788.69,
      },
    ];
    const dateString: string = dayjs(today).date(parseInt(label, 10)).format('MMM DD, YYYY');
    return (
      <div className="flex bg-primary px-6 py-2 rounded-sm">
        <div className="flex flex-col space-y-1">
          <div className="flex flex-row items-center space-x-1">
            <p className="text-white text-2xs font-semibold">{dateString}</p>
            <p className="text-white text-2xs font-normal">(Top 3 transactions)</p>
          </div>
          {topTransactions.map((tran) => {
            return (
              <div
                key={`topTransactions-${tran.id}`}
                className="flex flex-row justify-between items-center space-x-0.5"
              >
                <p className="text-Gray-6 text-2xs min-w-[160px]">{tran.vendorName}</p>
                <p className="text-white text-2xs font-semibold w-18 text-right">
                  {tran.amountUsd}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderChartVisualize = () => {
    return (
      <div className="flex flex-col mt-2 w-full h-[514px]">
        <div className="flex relative flex-col flex-1 py-6">
          <div className="absolute flex w-full h-[396px] justify-between flex-col-reverse">
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
          </div>
          <ResponsiveContainer width="100%" height="100%" className="">
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 50,
                bottom: 10,
              }}
            >
              <YAxis domain={[0, chartMaxValue]} width={0} height={0} className="opacity-0" />
              <Tooltip cursor position={{ y: 5 }} content={renderTooltipContent} />
              {chartLines.map((line: ChartLineProps) => {
                return (
                  <Line
                    key={`ChartLine-${line.name}`}
                    name={line.name}
                    type="linear"
                    dataKey={line.dataKey}
                    strokeWidth={4}
                    stroke={line.stroke}
                    dot={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-row w-full text-xs text-Gray-6 font-semibold justify-around pl-28">
          <div className="w-20 h-7 flex justify-center items-center">
            <p>{dayjs(today).date(7).format('MMM D')}</p>
          </div>
          <div className="w-20 h-7 flex justify-center items-center">
            <p>{dayjs(today).date(14).format('MMM D')}</p>
          </div>
          <div className="w-20 h-7 flex justify-center items-center">
            <p>{dayjs(today).date(21).format('MMM D')}</p>
          </div>
          <div className="w-20 h-7 flex justify-center items-center">
            <p>{dayjs(today).date(28).format('MMM D')}</p>
          </div>
        </div>
        {renderChartSymbolNote()}
      </div>
    );
  };
  const renderEditTargetButton = () => {
    return (
      <button
        type="button"
        className="flex ml-auto flex-row items-center px-3 py-1.5 space-x-2 rounded-sm hover:bg-Gray-12"
        onClick={onEdit}
      >
        <BasicsEditCircle className="w-4 h-4 path-no-filled text-Gray-6 fill-current" />
        <p className="text-xs text-Gray-3 font-normal">Edit</p>
      </button>
    );
  };
  return (
    <div className="flex flex-col space-y-4">
      <div className={classNames('flex flex-col mt-4 w-full px-8', className ?? '')}>
        <div className="flex flex-row space-x-4 w-auto">
          <div className="flex flex-col min-w-[128px]">
            <p className="text-xs text-Gray-3">Current Spend</p>
            <p className="text-xl text-primary font-bold mt-1">
              {`$ ${formatCurrency(feedItem?.target?.total ?? '0')}`}
            </p>
          </div>
          <div className="flex flex-col min-w-[128px]">
            <p className="text-xs text-Gray-3">Target</p>
            <p className="text-xl text-primary font-bold mt-1">
              {`$ ${formatCurrency(feedItem?.target?.amount ?? '0')}`}
            </p>
          </div>
          <div className="flex flex-1 justify-end flex-col items-end">
            {renderEditTargetButton()}
          </div>
        </div>
        {renderChartVisualize()}
      </div>
      <div className="bg-Gray-11 h-px w-full" />
    </div>
  );
};

export default TargetChartView;
