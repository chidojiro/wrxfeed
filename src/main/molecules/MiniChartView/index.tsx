/* eslint-disable react-hooks/exhaustive-deps */
import { TransactionBody } from '@/api/types';
import { defaultTargetMonths } from '@/common/constants';
import { classNames } from '@/common/utils';
import {
  getLineChartDataInMonth,
  getSpendingByYear,
  getTargetMonthsLineChartData,
} from '@/main/chart.utils';
import { useTransaction } from '@/main/hooks/transaction.hook';
import { LineChartData } from '@/main/types';
import { decimalLogic, DecimalType } from '@/main/utils';
import { TargetChart } from '@/target/TargetChart';
import { Target, TargetMonth, TargetPeriod } from '@/target/types';
import dayjs from 'dayjs';
import { cloneDeep, range } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface MiniChartViewProps {
  className?: string;
  target: Target;
  onEdit: () => void;
  legendLabelClass?: string;
  xAxisClass?: string;
  showLegends?: boolean;
}

const MiniChartView: React.VFC<MiniChartViewProps> = ({
  className = '',
  target,
  legendLabelClass = '',
  xAxisClass = '',
  showLegends = false,
}) => {
  const [targetMonths, setTargetMonths] = useState<TargetMonth[]>(defaultTargetMonths);
  const updatedTargetMonths = targetMonths.filter((item) => item?.amount !== undefined);
  const startMonth = updatedTargetMonths[0]?.month ?? 1;
  const endMonth = updatedTargetMonths[updatedTargetMonths.length - 1]?.month ?? 12;

  const { thisYear: thisYearSpendData, lastYear: lastYearSpendData } = useMemo(() => {
    return getSpendingByYear(target?.spendings);
  }, [target?.spendings]);

  const [lastYearTransPayload, setLastYearTransPayload] = useState<TransactionBody>();
  const { transactions: lastYearTrans, isLoading: isLoadingTranLastYear } =
    useTransaction(lastYearTransPayload);
  const [thisYearTransPayload, setThisYearTransPayload] = useState<TransactionBody>();
  const { transactions: thisYearTrans, isLoading: isLoadingTranThisYear } =
    useTransaction(thisYearTransPayload);

  const chartData: LineChartData = useMemo(() => {
    if (startMonth === endMonth) {
      return getLineChartDataInMonth(
        thisYearTrans,
        lastYearTrans,
        targetMonths[startMonth - 1],
        target?.trackingStatus,
      );
    }
    return getTargetMonthsLineChartData(
      thisYearSpendData,
      lastYearSpendData,
      targetMonths,
      target?.trackingStatus,
    );
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

  const renderChartLegends = () => {
    return (
      <div className="flex flex-row justify-center mt-2 py-2 px-[50px] space-x-8">
        <div className="flex flex-row items-center space-x-2">
          <div className="w-4 h-1 dashed-line-target" />
          <p className={classNames('text-xs text-Gray-6', legendLabelClass)}>Target</p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className="w-4 h-1 bg-Accent-2" />
          <p className={classNames('text-xs text-Gray-6', legendLabelClass)}>Current</p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className="w-4 h-1 bg-Gray-11" />
          <p className={classNames('text-xs text-Gray-6', legendLabelClass)}>Last Year</p>
        </div>
      </div>
    );
  };

  const renderXAxis = () => {
    const targetDate = dayjs().set('month', startMonth - 1);
    return startMonth === endMonth ? (
      <div
        className={classNames(
          'flex flex-row w-full text-xs text-Gray-6 font-semibold justify-around my-1 pl-[90px]',
          xAxisClass,
        )}
      >
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
      <div
        className={classNames(
          'flex flex-row w-full text-xs text-Gray-6 font-semibold justify-between pl-[38px]',
          xAxisClass,
        )}
      >
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
              key="target"
              className="flex flex-row flex-grow justify-between items-center space-x-10"
            >
              <div className="flex flex-row items-center space-x-1">
                <div className="w-1 h-1 rounded bg-system-alert" />
                <p className="text-white text-2xs">Target</p>
              </div>
              <p className="text-white text-2xs text-right font-semibold">
                {decimalLogic(dataPoints?.target ?? 0, DecimalType.SummedNumbers, '$')}
              </p>
            </div>
            <div
              key="this-year"
              className="flex flex-row flex-grow justify-between items-center space-x-10"
            >
              <div className="flex flex-row items-center space-x-1">
                <div className="w-1 h-1 rounded bg-Accent-2" />
                <p className="text-white text-2xs">Current</p>
              </div>
              <p className="text-white text-2xs text-right font-semibold">
                {decimalLogic(dataPoints?.thisYear ?? 0, DecimalType.SummedNumbers, '$')}
              </p>
            </div>
            <div
              key="last-year"
              className="flex flex-row flex-grow justify-between items-center space-x-10"
            >
              <div className="flex flex-row items-center space-x-1">
                <div className="w-1 h-1 rounded bg-Gray-11" />
                <p className="text-white text-2xs">Last Year</p>
              </div>
              <p className="text-white text-2xs text-right font-semibold">
                {decimalLogic(dataPoints?.lastYear ?? 0, DecimalType.SummedNumbers, '$')}
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={classNames('flex flex-1 flex-col w-full', className)}>
      {chartData && (
        <>
          <div className="relative flex flex-1 flex-col justify-center items-center w-auto mx-[-8px] pr-4 pb-1 pl-2 pt-1 h-[184px] border border-Gray-12 rounded-2.5xl">
            <TargetChart
              containerClass="flex flex-col mt-2"
              chartData={chartData}
              renderXAxis={renderXAxis}
              renderTooltip={renderTooltipContent}
              loading={isLoadingTranLastYear || isLoadingTranThisYear}
              levelLabelClass="text-Gray-6 text-2xs font-normal"
            />
          </div>
          {showLegends && renderChartLegends()}
        </>
      )}
    </div>
  );
};

export default MiniChartView;
