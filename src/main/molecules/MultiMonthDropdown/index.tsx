/* eslint-disable react/no-unescaped-entities */
import { classNames } from '@common/utils';
import React, { Fragment, useEffect, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { BasicsDownSmall, LeftSmallIcon } from '@assets';

interface MultiMonthDropdownProps {
  className?: string;
  classPopover?: string;
}

const MultiMonthDropdown: React.VFC<MultiMonthDropdownProps> = ({
  className = '',
  classPopover = '',
}) => {
  const [curYear, setCurYear] = useState(2022);
  useEffect(() => {
    const today = new Date();
    setCurYear(today.getFullYear());
  }, []);
  return (
    <div className={classNames(className)}>
      <Popover as="div" className="flex-shrink-0 relative">
        {({ open }) => (
          <>
            <Popover.Button className={classNames('', open ? '' : '')}>
              <button
                type="button"
                className="rounded-sm border border-Gray-11 space-x-1 px-2 flex h-[30px] flex-row items-center"
              >
                <p className="text-Gray-3 text-xs">Select</p>
                <BasicsDownSmall className="w-5 h-5" width={20} height={20} viewBox="0 0 20 20" />
              </button>
            </Popover.Button>
            <Popover.Panel className="absolute z-50">
              <Transition
                as={Fragment}
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
                    <div className="flex flex-1 justify-center items-center">
                      <p className="text-primary text-xs font-semibold">{curYear}</p>
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
                  <div className="flex flex-row space-x-2 py-2">
                    <div className="flex flex-1 flex-col space-y-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1].map((month) => {
                        return (
                          <div
                            key={`month-${month}`}
                            className="w-24 h-7 flex justify-center items-center"
                          >
                            <p className="text-sm text-Gray-3">January</p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-1">
                      <div />
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1].map((month) => {
                        return (
                          <div
                            key={`month-${month}`}
                            className="w-24 h-7 flex px-1 justify-center items-center border-2 border-Gray-12"
                          >
                            <input
                              className="flex flex-1 w-5 bg-transparent outline-none placeholder-Gray-12"
                              placeholder="0"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between text-xs text-primary px-6 pt-2 h-8">
                    <p>
                      Total Target Amount:
                      <span className="font-normal text-Gray-3">$0</span>
                    </p>
                  </div>
                </div>
              </Transition>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default MultiMonthDropdown;
