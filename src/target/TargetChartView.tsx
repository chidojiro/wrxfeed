/* eslint-disable react-hooks/exhaustive-deps */
import { TransactionBody } from '@/api/types';
import { defaultTargetMonths } from '@/common/constants';
import { classNames } from '@/common/utils';
import TargetStatus from '@/main/atoms/TargetStatus';
import {
  getLineChartDataInMonth,
  getSpendingByYear,
  getTargetMonthsLineChartData,
} from '@/main/chart.utils';
import { useTransaction } from '@/main/hooks/transaction.hook';
import { LineChartData } from '@/main/types';
import { getDisplayCurrency, getTargetPeriodsAmountTotal } from '@/main/utils';
import {
  Target,
  TargetMonth,
  TargetPeriod,
  TargetStatusConfig,
  TargetStatusType,
} from '@/target/types';
import dayjs from 'dayjs';
import { cloneDeep, range } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { TargetChart } from './TargetChart';

interface TargetChartViewProps {
  className?: string;
  target: Target;
  onEdit: () => void;
}

export const TargetChartView: React.VFC<TargetChartViewProps> = ({ className, target }) => {
  const [targetMonths, setTargetMonths] = useState<TargetMonth[]>(defaultTargetMonths);
  const { overallTarget, currentSpend, targetToDate, exceeding } =
    getTargetPeriodsAmountTotal(target);
  const updatedTargetMonths = targetMonths.filter((item) => item?.amount !== undefined);
  const startMonth = updatedTargetMonths[0]?.month ?? 1;
  const endMonth = updatedTargetMonths[updatedTargetMonths.length - 1]?.month ?? 12;

  const { thisYear: thisYearSpendData, lastYear: lastYearSpendData } = useMemo(() => {
    return getSpendingByYear(target?.spendings);
  }, [target?.spendings]);

  const [lastYearTransPayload, setLastYearTransPayload] = useState<TransactionBody>();
  const { transactions: lastYearTrans } = useTransaction(lastYearTransPayload);
  const [thisYearTransPayload, setThisYearTransPayload] = useState<TransactionBody>();
  const { transactions: thisYearTrans } = useTransaction(thisYearTransPayload);

  const chartData: LineChartData = useMemo(() => {
    if (startMonth === endMonth) {
      return getLineChartDataInMonth(target, targetMonths[startMonth - 1], target?.trackingStatus);
    }
    return getTargetMonthsLineChartData(target, targetMonths, target?.trackingStatus);
  }, [thisYearSpendData, lastYearSpendData, targetMonths, thisYearTrans, lastYearTrans]);

  useEffect(() => {
    const { periods, props } = target;
    if (periods?.length > 0 && props?.length > 0) {
      const dataMonth = cloneDeep(defaultTargetMonths);
      periods.forEach((period: TargetPeriod) => {
        if (
          period?.amount !== undefined &&
          dataMonth[period?.month - 1] &&
          dataMonth[period?.month - 1]
        ) {
          dataMonth[period?.month - 1].amount = period?.amount;
        }
      });
      setTargetMonths(dataMonth);
    }
  }, [target]);

  useEffect(() => {
    const { periods, props } = target;
    if (periods.length && startMonth === endMonth) {
      setLastYearTransPayload({
        periods: [{ month: periods[0].month, year: periods[0].year - 1 }],
        props,
      });
      setThisYearTransPayload({
        periods,
        props,
      });
    }
  }, [startMonth, endMonth]);

  const renderXAxis = () => {
    const targetDate = dayjs().set('month', startMonth - 1);
    return startMonth === endMonth ? (
      <div className="flex flex-row w-full text-xs text-Gray-6 font-semibold justify-around my-1 pl-[90px]">
        <div className="w-20 h-7 flex justify-center items-center">
          <p>{targetDate.date(7).format('MMM D')}</p>
        </div>
        <div className="w-20 h-7 flex justify-center items-center">
          <p>{targetDate.date(14).format('MMM D')}</p>
        </div>
        <div className="w-20 h-7 flex justify-center items-center">
          <p>{targetDate.date(21).format('MMM D')}</p>
        </div>
        <div className="w-20 h-7 flex justify-center items-center">
          <p>{targetDate.date(28).format('MMM D')}</p>
        </div>
      </div>
    ) : (
      <div className="flex flex-row w-full text-xs text-Gray-6 font-semibold justify-between pl-[38px]">
        {range(startMonth, endMonth + 1).map((month: number) => (
          <div
            key={`x-${month}`}
            className="w-[25px] h-7 flex justify-center items-center first:justify-start last:justify-end"
          >
            <p>
              {dayjs()
                .month(month - 1)
                .format('MMM')}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderTooltipContent = (props: TooltipProps<ValueType, NameType>) => {
    const { active, payload } = props;
    if (active && payload) {
      const dataPoints = payload[0]?.payload;
      return (
        <div className="flex bg-primary p-2 rounded-sm">
          <div className="flex flex-col space-y-1">
            <div className="flex flex-row items-center">
              <p className="text-white text-3xs font-semibold">{dataPoints?.name ?? 'unknown'}</p>
            </div>
            <div
              key="this-year"
              className="flex flex-row flex-grow justify-between items-center space-x-10"
            >
              <div className="flex flex-row items-center space-x-1">
                <div className="flex items-center">
                  {renderTrackingStatusIndicator(target.trackingStatus)}
                  <p className="text-white text-2xs ml-1">Spend</p>
                </div>
              </div>
              <p className="text-white text-2xs text-right font-semibold">
                {getDisplayCurrency(dataPoints?.thisYear)}
              </p>
            </div>
            <div
              key="target"
              className="flex flex-row flex-grow justify-between items-center space-x-10"
            >
              <div className="flex flex-row items-center space-x-1">
                <div className="flex items-center">
                  {renderTrackingStatusIndicator()}
                  <p className="text-white text-2xs ml-1">Target To Date</p>
                </div>
              </div>
              <p className="text-white text-2xs text-right font-semibold">
                {getDisplayCurrency(targetToDate)}
              </p>
            </div>
            <div
              key="last-year"
              className="flex flex-row flex-grow justify-between items-center space-x-10"
            >
              <div className="flex flex-row items-center space-x-1">
                <div className="flex items-center">
                  {renderTrackingStatusIndicator()}
                  <p className="text-white text-2xs ml-1">Last Year</p>
                </div>
              </div>
              <p className="text-white text-2xs text-right font-semibold">
                {getDisplayCurrency(dataPoints?.lastYear)}
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderTrackingStatusIndicator = (trackingStatus?: TargetStatusType) => {
    const statusColor = trackingStatus ? TargetStatusConfig[trackingStatus]['dot'] : '#7D8490';
    return (
      <div className="flex w-2 h-2 justify-center items-center">
        <div
          className="w-1.5 h-1.5 rounded-full bg-Green-400"
          style={{ backgroundColor: statusColor }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className={classNames('flex flex-col mt-4 w-full px-8', className ?? '')}>
        <div className="flex flex-row space-x-4 w-auto items-center">
          <div className="flex flex-col">
            <div className="flex items-center">
              {renderTrackingStatusIndicator(target.trackingStatus)}
              <p className="text-xs text-Gray-2 ml-1">Current Spend</p>
            </div>
            <p className="text-xl text-primary font-bold mt-1">
              {getDisplayCurrency(currentSpend)}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              {renderTrackingStatusIndicator()}
              <p className="text-xs text-Gray-2 ml-1">Target To Date</p>
            </div>
            <p className="text-xl text-primary font-bold mt-1">
              {getDisplayCurrency(targetToDate)}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              {renderTrackingStatusIndicator()}
              <p className="text-xs text-Gray-2 ml-1">Overall Target</p>
            </div>
            <p className="text-xl text-primary font-bold mt-1">
              {getDisplayCurrency(overallTarget)}
            </p>
          </div>
          <div className="flex flex-1 justify-end flex-col items-end">
            {target.trackingStatus && (
              <TargetStatus type={target.trackingStatus} exceeding={exceeding} />
            )}
          </div>
        </div>
        {chartData && (
          <>
            <div className="relative flex justify-center items-center w-auto mx-[-8px] mt-2.5 pr-4 pb-4 pl-2 pt-3 h-[240px] border border-Gray-12 rounded-2.5xl">
              <TargetChart
                containerClass="mt-8 mb-2"
                chartData={chartData}
                renderXAxis={renderXAxis}
                renderTooltip={renderTooltipContent}
                // loading={lastYearDataLoading || thisYearDataLoading}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
