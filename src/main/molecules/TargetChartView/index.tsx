import React, { useEffect, useState } from 'react';

import { classNames, formatCurrency } from '@common/utils';
import { BasicsEditCircle } from '@assets';
import { FeedItem, TransLineItem } from '@main/entity';
import { ChartLegend, LineChartData } from '@main/types';
import { getLineChartDataInMonth } from '@main/chart.utils';
import dayjs from 'dayjs';
import { ValueType, NameType } from 'recharts/src/component/DefaultTooltipContent';
import { TooltipProps } from 'recharts';
import TargetChart from '../TargetChart';

interface TargetChartViewProps {
  className?: string;
  feedItem: FeedItem;
  onEdit: () => void;
}

const TargetChartView: React.VFC<TargetChartViewProps> = ({ className, feedItem, onEdit }) => {
  const today = new Date();
  const [chartData, setChartData] = useState<LineChartData<TransLineItem[]>>();

  useEffect(() => {
    const data = getLineChartDataInMonth(feedItem.transactions);
    setChartData(data);
  }, [feedItem]);

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

  const renderChartLegends = () => {
    return (
      <div className="flex flex-row justify-center mt-6 py-2 px-[50px] space-x-8">
        {chartData?.legends.map((legend: ChartLegend) => (
          <div
            key={`renderChartLegend-${legend.id}`}
            className="flex flex-row items-center space-x-2"
          >
            <div
              className={classNames('flex w-6 h-1', legend?.type ?? '')}
              style={{ backgroundColor: legend?.color }}
            />
            <p className="text-Gray-3 text-xs font-semibold">{legend?.name}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderXAxis = () => (
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
  );

  const renderTooltipContent = (props: TooltipProps<ValueType, NameType>) => {
    const { active, payload } = props;
    const thisMonthData = payload?.find((data) => data.name === dayjs().format('MMM'));
    if (active && thisMonthData) {
      const dateString: string = thisMonthData.payload?.name;
      const topTransactions: TransLineItem[] = thisMonthData.payload?.topTrans;
      const subTitle = topTransactions?.length
        ? `(Top ${topTransactions?.length} transactions)`
        : '';
      return (
        <div className="flex bg-primary px-6 py-2 rounded-sm">
          <div className="flex flex-col space-y-1">
            <div className="flex flex-row items-center space-x-1">
              <p className="text-white text-2xs font-semibold">{dateString}</p>
              <p className="text-white text-2xs font-normal">{subTitle}</p>
            </div>
            {topTransactions?.map((tran) => {
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
    }
    return null;
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
        {chartData && (
          <>
            <TargetChart
              chartData={chartData}
              targetAmount={feedItem.target.amount ?? 0}
              renderXAxis={renderXAxis}
              renderTooltip={renderTooltipContent}
              showTargetLine
            />
            {renderChartLegends()}
          </>
        )}
      </div>
      <div className="bg-Gray-11 h-px w-full" />
    </div>
  );
};

export default TargetChartView;
