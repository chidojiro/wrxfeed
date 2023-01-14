/* eslint-disable react/no-unescaped-entities */
import { BasicsDownSmall } from '@/assets';
import { ReactComponent as ArrowRight } from '@/assets/icons/outline/arrow-right-2.svg';
import Loading from '@/common/atoms/Loading';
import { Button, Popover } from '@/common/components';
import { defaultTargetMonths, monthsInYear } from '@/common/constants';
import { DateUtils, formatCurrency, round } from '@/common/utils';
import MonthTargetInput from '@/main/atoms/MonthTargetInput';
import { TargetMonth, TargetPeriod, TargetProps } from '@/target/types';
import { useDisclosure } from '@dwarvesf/react-hooks';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash-es';
import React, { forwardRef, ForwardRefRenderFunction, useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@react-hook/window-size';

interface MultiMonthDropdownProps {
  className?: string;
  classPopover?: string;
  props: TargetProps[];
  periods?: TargetPeriod[];
  onApply?: (data: TargetMonth[], year: number) => void;
  year?: number;
  lastYearData: TargetPeriod[];
  isLoadingData?: boolean;
}

export type MultiMonthData = {
  months: TargetMonth[];
  year: number;
};

export interface MultiMonthDropdownHandler {
  getData?: () => MultiMonthData;
}

export const getButtonTitle = (min: number, max: number): string => {
  let name = 'Select';
  if (min !== 0) {
    name = dayjs()
      .month(min - 1)
      .format('MMM, YYYY');
  }
  if (max !== 0 && max !== min) {
    name += ` - ${dayjs()
      .month(max - 1)
      .format('MMM, YYYY')}`;
  }
  return name;
};

const MultiMonthDropdown: ForwardRefRenderFunction<
  MultiMonthDropdownHandler,
  MultiMonthDropdownProps
> = ({
  className = '',
  classPopover = '',
  periods,
  onApply = () => undefined,
  lastYearData,
  isLoadingData,
}) => {
  const useableViewRef = useRef(null);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [targetMonthValues, setTargetMonthValues] = useState<TargetMonth[]>(defaultTargetMonths);
  // Variables
  const curYear = DateUtils.getThisYear();
  const minMonth = selectedMonths.length ? Math.min(...selectedMonths) : 0;
  const maxMonth = selectedMonths.length ? Math.max(...selectedMonths) : 0;
  const totalAmount = round(
    targetMonthValues.reduce((total, target) => total + (target?.amount ?? 0), 0),
  );
  const isValidData = selectedMonths.length > 0 && !isLoadingData;

  const [, height] = useWindowSize();

  const popoverDisclosure = useDisclosure();

  useEffect(() => {
    if (periods && periods.length > 0) {
      // Find min / max months
      let availableMonths = periods.map((period) => period.month);
      const min = Math.min(...availableMonths);
      const max = Math.max(...availableMonths);
      const clonePreState = cloneDeep(targetMonthValues);
      periods.forEach((period: TargetPeriod) => {
        // set amount when period amount was set (!== 0) or period amount === 0 and period month is first or last month
        // => this is to prevent zero from showing multiple times between time ranges (ex: 0, 0, 1, 0, 0, 2, 0, 0 -> 0, , 1, , , 2, , 0)
        if (
          (period?.amount && clonePreState[period.month - 1]) ||
          (period?.amount === 0 && (period?.month === min || period?.month === max))
        ) {
          clonePreState[period?.month - 1].amount = period?.amount;
        } else {
          clonePreState[period?.month - 1].amount = undefined;
          availableMonths = availableMonths.filter((month) => month !== period?.month);
        }
      });
      setSelectedMonths(availableMonths);
      setTargetMonthValues(clonePreState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periods]);

  const onClickApply = () => {
    popoverDisclosure.onClose();
    onApply(targetMonthValues, curYear);
  };

  const onChangeMonthInput = (month: number, amount?: number) => {
    const clonePreState = cloneDeep(targetMonthValues);
    const curAmount = clonePreState[month - 1]?.amount;
    if (amount !== curAmount && clonePreState[month - 1]) {
      clonePreState[month - 1].amount = amount;
      setTargetMonthValues(clonePreState);
    }
  };

  const renderMonthName = () => {
    return (
      <div className="flex flex-1 flex-col">
        {monthsInYear.map((month: number, indexMonth: number) => {
          const isInRange = month >= minMonth && month <= maxMonth;
          let borderStyle = 'border-l border-r border-Accent-2';
          if (month === minMonth) borderStyle = `${borderStyle} border-t`;
          if (month === maxMonth) borderStyle = `${borderStyle} border-b`;

          return (
            <div key={`month-${month}`} className={clsx('flex flex-col ')}>
              <div
                className={clsx(
                  'w-24 h-7 px-2 py-1 text-left flex flex-col justify-center items-start',
                  isInRange ? borderStyle : '',
                )}
              >
                <p className="text-sm text-Gray-3">
                  {dayjs()
                    .month(month - 1)
                    .format('MMMM')}
                </p>
              </div>
              {indexMonth !== 11 && (
                <div
                  className={clsx(
                    'h-1 w-full',
                    isInRange && indexMonth !== maxMonth - 1
                      ? 'border-l border-r border-Accent-2'
                      : '',
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };
  const renderLastYearSpend = () => {
    return (
      <div className="flex flex-1 flex-col space-y-1">
        {monthsInYear.map((month: number) => {
          const monthMatched = lastYearData.filter((item: TargetPeriod) => item.month === month);
          const lastYearSpend =
            monthMatched.length > 0 ? parseFloat(monthMatched[0].total?.toString() ?? '0') : 0;
          return (
            <div
              key={`renderLastYearSpend-${month}`}
              className="w-24 h-7 px-2 py-1 text-right flex flex-col justify-center items-end"
            >
              <p className="text-sm text-Gray-6">
                {`$${formatCurrency({
                  value: lastYearSpend,
                })}`}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  const onClickOpenModal = () => {
    popoverDisclosure.onOpen();
  };

  // Popover will be partially cropped
  const HEIGHT_LIMIT = 950;
  const isHeightRestricted = height < HEIGHT_LIMIT;

  return (
    <div className={clsx('flex-shrink-0 relative', className)} ref={useableViewRef}>
      <Popover
        usePortal={false}
        open={popoverDisclosure.isOpen}
        onClose={popoverDisclosure.onClose}
        placement={isHeightRestricted ? 'right-start' : 'bottom-start'}
        trigger={
          <Button
            size="sm"
            variant="outline"
            colorScheme="gray"
            onClick={onClickOpenModal}
            iconRight={<BasicsDownSmall width={20} height={20} />}
          >
            {getButtonTitle(minMonth, maxMonth)}
          </Button>
        }
      >
        {!!popoverDisclosure.isOpen && (
          <div
            className={clsx(
              'flex w-[348px] h-[528px] flex-col absolute z-50 left-0 shadow-property-dropdown border border-Gray-11 rounded-sm bg-white',
              { 'transform -translate-y-1/4': isHeightRestricted },
              classPopover,
            )}
          >
            <div className="flex flex-row items-center px-4 border-b border-Gray-11 h-8">
              <div className="flex flex-1 flex-row justify-center items-center">
                <p className="text-primary text-xs font-semibold ml-4">{curYear}</p>
                {/* <div className="w-4 h-4 flex justify-center items-center">
                    {isLoadingData && <Loading width={8} height={8} />}
                  </div> */}
              </div>
            </div>
            <div className="flex flex-row items-center justify-between text-xs text-Gray-6 px-7 pt-2 h-8">
              <p>Month</p>
              <p>Last Year's Spend</p>
              <p>Target</p>
            </div>
            <div
              className={clsx(
                'flex flex-row space-x-2 py-2 px-[22px] relative',
                isLoadingData ? 'opacity-50' : '',
              )}
            >
              {renderMonthName()}
              {renderLastYearSpend()}
              <div className="flex flex-1 flex-col space-y-1">
                {monthsInYear.map((month: number) => {
                  const isInRange = month >= minMonth && month <= maxMonth;
                  const amountSaved = targetMonthValues.find(
                    (item: TargetMonth) => item.month === month,
                  )?.amount;
                  return (
                    <MonthTargetInput
                      key={`month-amount-${month}`}
                      month={month}
                      defaultAmount={amountSaved}
                      isInRange={isInRange}
                      onChange={(amount) => onChangeMonthInput(month, amount)}
                      onSelect={() => {
                        const isIncluded = selectedMonths.includes(month);
                        if (!isIncluded) {
                          setSelectedMonths((pre) => [...pre, month]);
                        }
                      }}
                      onUnselect={() => {
                        const isIncluded = selectedMonths.includes(month);
                        if (isIncluded) {
                          setSelectedMonths((pre) => pre.filter((item) => item !== month));
                        }
                      }}
                    />
                  );
                })}
              </div>
              <div
                className={clsx(
                  'absolute z-10 flex w-full h-full justify-center items-center',
                  isLoadingData ? '' : 'pointer-events-none',
                )}
              >
                {isLoadingData && <Loading width={36} height={36} className="mr-12" />}
              </div>
            </div>
            <div className="flex flex-col items-end justify-between text-xs text-primary px-6 pt-2 h-8">
              <p className="text-primary font-semibold">
                Total Target Amount:
                <span className="font-normal text-Gray-3 ml-1">
                  {`$${formatCurrency({ value: totalAmount, format: '0,0' })}`}
                </span>
              </p>
            </div>
            <hr className="divider divider-horizontal w-full" />
            <div className="flex flex-row w-full px-4 items-center h-11 justify-end gap-3">
              <Button
                variant="ghost"
                colorScheme="gray"
                size="sm"
                onClick={popoverDisclosure.onClose}
                className="px-4"
              >
                <p className="text-Gray-6 text-xs font-semibold">Cancel</p>
              </Button>
              <Button
                variant="solid"
                colorScheme={isValidData ? 'primary' : 'gray'}
                size="sm"
                disabled={isLoadingData}
                onClick={onClickApply}
                iconRight={
                  <ArrowRight className="w-4 h-4 ml-2 fill-current path-no-filled stroke-current path-no-stroke object-fill text-white" />
                }
                className="px-4"
              >
                Apply
              </Button>
            </div>
          </div>
        )}
      </Popover>
    </div>
  );
};

export default forwardRef(MultiMonthDropdown);
