/* eslint-disable react/no-unescaped-entities */
import React, {
  Fragment,
  useEffect,
  useState,
  ForwardRefRenderFunction,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react';
import { Transition } from '@headlessui/react';
import cloneDeep from 'lodash.clonedeep';
import dayjs from 'dayjs';
import { useOnClickOutside } from '@dwarvesf/react-hooks';

import { classNames, formatCurrency, round } from '@common/utils';
import { TargetMonth } from '@main/entity';
import { TargetPeriod, CalcSpendProp } from '@api/types';
import { ReactComponent as ArrowRight } from '@assets/icons/outline/arrow-right-2.svg';
import { BasicsDownSmall, LeftSmallIcon } from '@assets';
import Loading from '@common/atoms/Loading';
import MonthTargetInput from '@main/atoms/MonthTargetInput';

export const defaultTargetMonths = [
  {
    month: 1,
    amount: 0,
  },
  {
    month: 2,
    amount: 0,
  },
  {
    month: 3,
    amount: 0,
  },
  {
    month: 4,
    amount: 0,
  },
  {
    month: 5,
    amount: 0,
  },
  {
    month: 6,
    amount: 0,
  },
  {
    month: 7,
    amount: 0,
  },
  {
    month: 8,
    amount: 0,
  },
  {
    month: 9,
    amount: 0,
  },
  {
    month: 10,
    amount: 0,
  },
  {
    month: 11,
    amount: 0,
  },
  {
    month: 12,
    amount: 0,
  },
];

const monthsInYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

interface MultiMonthDropdownProps {
  className?: string;
  classPopover?: string;
  open: boolean;
  setOpen: (newState: boolean) => void;
  props: CalcSpendProp[];
  onApply?: (data: TargetMonth[], year: number) => void;
  targetMonths: TargetMonth[];
  year: number;
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
    onApply = () => undefined,
    open,
    setOpen,
    targetMonths,
    year,
    lastYearData,
    isLoadingData,
  },
  ref,
) => {
  const useableViewRef = useRef(null);
  const [curYear, setCurYear] = useState(year);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [minMonth, setMinMonth] = useState<number>(0);
  const [maxMonth, setMaxMonth] = useState<number>(0);
  const [targetMonthValues, setTargetMonthValues] = useState<TargetMonth[]>(
    targetMonths.length ? targetMonths : defaultTargetMonths,
  );
  // Variables
  const totalAmount = round(targetMonthValues.reduce((total, target) => total + target.amount, 0));
  const titleSelect = getButtonTitle(minMonth, maxMonth);
  const applyEnableState = selectedMonths.length > 0 && !isLoadingData ? 'bg-primary' : 'bg-Gray-6';

  useImperativeHandle(ref, () => ({}));
  useOnClickOutside(useableViewRef, () => setOpen(false));

  useEffect(() => {
    const today = new Date();
    setCurYear(today.getFullYear());
  }, []);

  const onClickApply = () => {
    setOpen(false);
    onApply(targetMonthValues, curYear);
  };

  const onChangeMonthInput = (month: number, amount: number) => {
    const clonePreState = cloneDeep(targetMonthValues);
    const curAmount = clonePreState[month - 1].amount;
    if (amount !== curAmount) {
      clonePreState[month - 1].amount = amount;
      setTargetMonthValues(clonePreState);
    }
  };

  useEffect(() => {
    let min = 12;
    let max = 0;
    for (let i = 0; i < selectedMonths.length; i += 1) {
      if (selectedMonths[i] < min) {
        min = selectedMonths[i];
      }
      if (selectedMonths[i] > max) {
        max = selectedMonths[i];
      }
    }
    setMinMonth(min);
    setMaxMonth(max);
  }, [selectedMonths]);

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
          const isInRange = month >= minMonth && month <= maxMonth;
          const monthMatched = lastYearData.filter((item: TargetPeriod) => item.month === month);
          const lastYearSpend =
            monthMatched.length > 0 ? parseFloat(monthMatched[0].total?.toString() ?? '0') : 0;
          return (
            <div
              key={`renderLastYearSpend-${month}`}
              className="w-24 h-7 px-2 py-1 text-right flex flex-col justify-center items-end"
            >
              {isInRange && <p className="text-sm text-Gray-6">{`$${lastYearSpend.toFixed(2)}`}</p>}
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
      <>
        <button
          onClick={onClickOpenModal}
          type="button"
          className="rounded-sm border border-Gray-11 space-x-1 px-2 flex h-[30px] flex-row items-center"
        >
          <p className="text-Gray-3 text-xs">{titleSelect}</p>
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
                  <div className="w-4 h-4 flex justify-center items-center">
                    {isLoadingData && <Loading width={8} height={8} />}
                  </div>
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
              <div className="flex flex-row space-x-2 py-2 px-[22px]">
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
              </div>
              <div className="flex flex-col items-end justify-between text-xs text-primary px-6 pt-2 h-8">
                <p className="text-primary font-semibold">
                  Total Target Amount:
                  <span className="font-normal text-Gray-3 ml-1">
                    {`$${formatCurrency(totalAmount, '0,0')}`}
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
                  onClick={() => onClickApply()}
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
      </>
    </div>
  );
};

export default forwardRef(MultiMonthDropdown);
