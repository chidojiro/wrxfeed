/* eslint-disable react/no-unescaped-entities */
import { BasicsDownSmall, LeftSmallIcon } from '@/assets';
import { ReactComponent as ArrowRight } from '@/assets/icons/outline/arrow-right-2.svg';
import Loading from '@/common/atoms/Loading';
import { defaultTargetMonths, monthsInYear } from '@/common/constants';
import { classNames, formatCurrency, round } from '@/common/utils';
import MonthTargetInput from '@/main/atoms/MonthTargetInput';
import { TargetMonth } from '@/main/entity';
import { TargetPeriod, TargetProps } from '@/target/types';
import { useOnClickOutside } from '@dwarvesf/react-hooks';
import { Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import cloneDeep from 'lodash.clonedeep';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  Fragment,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface MultiMonthDropdownProps {
  className?: string;
  classPopover?: string;
  open: boolean;
  setOpen: (newState: boolean) => void;
  props: TargetProps[];
  periods?: TargetPeriod[];
  onApply?: (data: TargetMonth[], year: number) => void;
  targetMonths: TargetMonth[];
  year?: number;
  lastYearData: TargetPeriod[];
  isLoadingData: boolean;
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
> = (
  {
    className = '',
    classPopover = '',
    periods,
    onApply = () => undefined,
    open,
    setOpen,
    targetMonths,
    lastYearData,
    isLoadingData,
  },
  ref,
) => {
  const useableViewRef = useRef(null);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [targetMonthValues, setTargetMonthValues] = useState<TargetMonth[]>(
    targetMonths.length ? targetMonths : defaultTargetMonths,
  );
  // Variables
  const curYear = new Date().getFullYear();
  const minMonth = selectedMonths.length ? Math.min(...selectedMonths) : 0;
  const maxMonth = selectedMonths.length ? Math.max(...selectedMonths) : 0;
  const totalAmount = round(
    targetMonthValues.reduce((total, target) => total + (target?.amount ?? 0), 0),
  );
  const applyEnableState = selectedMonths.length > 0 && !isLoadingData ? 'bg-primary' : 'bg-Gray-6';

  useImperativeHandle(ref, () => ({}));
  useOnClickOutside(useableViewRef, () => setOpen(false));

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
    setOpen(false);
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
            <div key={`month-${month}`} className={classNames('flex flex-col ')}>
              <div
                className={classNames(
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
                  className={classNames(
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
    setOpen(!open);
  };

  return (
    <div className={classNames('flex-shrink-0 relative', className)} ref={useableViewRef}>
      <button
        onClick={onClickOpenModal}
        type="button"
        className="rounded-sm border border-Gray-11 space-x-1 px-2 flex h-[30px] flex-row items-center"
      >
        <p className="text-Gray-3 text-xs">{getButtonTitle(minMonth, maxMonth)}</p>
        <BasicsDownSmall className="w-5 h-5" width={20} height={20} viewBox="0 0 20 20" />
      </button>
      <div className="absolute z-50">
        <Transition
          as={Fragment}
          show={open}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div
            className={classNames(
              'flex w-[348px] h-[528px] flex-col absolute z-50 mt-2 left-0 shadow-propertyDropdown border border-Gray-11 rounded-sm bg-white',
              classPopover,
            )}
          >
            <div className="flex flex-row items-center px-4 border-b border-Gray-11 h-8">
              <LeftSmallIcon className="w-4 h-4" width={16} height={16} viewBox="0 0 16 16" />
              <div className="flex flex-1 flex-row justify-center items-center">
                <p className="text-primary text-xs font-semibold ml-4">{curYear}</p>
                {/* <div className="w-4 h-4 flex justify-center items-center">
                    {isLoadingData && <Loading width={8} height={8} />}
                  </div> */}
              </div>
              <LeftSmallIcon
                className="w-4 h-4 rotate-180"
                width={16}
                height={16}
                viewBox="0 0 16 16"
              />
            </div>
            <div className="flex flex-row items-center justify-between text-xs text-Gray-6 px-7 pt-2 h-8">
              <p>Month</p>
              <p>Last Year's Spend</p>
              <p>Target</p>
            </div>
            <div
              className={classNames(
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
                className={classNames(
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
            <div className="flex flex-row w-full px-4 items-center h-11">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex px-4 h-7 items-center rounded-sm hover:bg-Gray-12 mr-3 ml-auto"
              >
                <p className="text-Gray-6 text-xs font-semibold">Cancel</p>
              </button>
              <button
                type="button"
                disabled={isLoadingData}
                onClick={onClickApply}
                className={classNames(
                  'flex flex-row items-center px-4 h-7 rounded-sm',
                  applyEnableState,
                )}
              >
                <p className="text-white text-xs font-semibold">Apply</p>
                <ArrowRight className="w-4 h-4 ml-2 fill-current path-no-filled stroke-current path-no-stroke object-fill text-white" />
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default forwardRef(MultiMonthDropdown);
