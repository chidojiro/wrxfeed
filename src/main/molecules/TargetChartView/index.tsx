/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from 'react';
import { TooltipProps } from 'recharts';
import dayjs from 'dayjs';
import cloneDeep from 'lodash.clonedeep';
import range from 'lodash.range';

import { defaultTargetMonths } from '@common/constants';
import { TargetPeriod, TransactionBody } from '@api/types';
import { classNames } from '@common/utils';
import { BasicsEditCircle } from '@assets';
import { Target, TargetMonth } from '@main/entity';
import { LineChartData } from '@main/types';
import {
  getLineChartDataInMonth,
  getSpendingByYear,
  getTargetMonthsLineChartData,
} from '@main/chart.utils';
import { decimalLogic, DecimalType, getTargetPeriodsAmountTotal } from '@main/utils';
import { useTransaction } from '@main/hooks/transaction.hook';
import { ValueType, NameType } from 'recharts/src/component/DefaultTooltipContent';
import TargetChart from '../TargetChart';

interface TargetChartViewProps {
  className?: string;
  target: Target;
  onEdit: () => void;
}

const TargetChartView: React.VFC<TargetChartViewProps> = ({ className, target, onEdit }) => {
  const [targetMonths, setTargetMonths] = useState<TargetMonth[]>(defaultTargetMonths);
  const { overallTarget, currentSpend } = getTargetPeriodsAmountTotal(target);
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
      return getLineChartDataInMonth(thisYearTrans, lastYearTrans, targetMonths[startMonth - 1]);
    }
    return getTargetMonthsLineChartData(thisYearSpendData, lastYearSpendData, targetMonths);
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
      <div className="flex flex-row justify-center mt-2 py-2 px-[50px] space-x-8">
        <div className="flex flex-row items-center space-x-2">
          <div className="w-4 h-1 dashed-line-target" />
          <p className="text-xs text-Gray-6">Target</p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className="w-4 h-1 bg-Accent-2" />
          <p className="text-xs text-Gray-6">Current</p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className="w-4 h-1 bg-Gray-11" />
          <p className="text-xs text-Gray-6">Last Year</p>
        </div>
      </div>
    );
  };

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
    <div className="flex flex-col space-y-4">
      <div className={classNames('flex flex-col mt-4 w-full px-8', className ?? '')}>
        <div className="flex flex-row space-x-4 w-auto">
          <div className="flex flex-col min-w-[128px]">
            <p className="text-xs text-Gray-3">Current Spend</p>
            <p className="text-xl text-primary font-bold mt-1">
              {decimalLogic(currentSpend ?? '0', DecimalType.SummedNumbers)}
            </p>
          </div>
          <div className="flex flex-col min-w-[128px]">
            <p className="text-xs text-Gray-3">Target</p>
            <p className="text-xl text-primary font-bold mt-1">
              {decimalLogic(overallTarget ?? '0', DecimalType.SummedNumbers)}
            </p>
          </div>
          <div className="flex flex-1 justify-end flex-col items-end">
            {renderEditTargetButton()}
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
            {renderChartLegends()}
          </>
        )}
      </div>
    </div>
  );
};

export default TargetChartView;
