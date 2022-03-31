import { classNames } from '@common/utils';
import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { BasicsDownSmall } from '@assets';

interface MultiMonthDropdownProps {
  className?: string;
  classPopover?: string;
}

const MultiMonthDropdown: React.VFC<MultiMonthDropdownProps> = ({
  className = '',
  classPopover = '',
}) => {
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
                    'flex w-[348px] h-[528px] flex-col py-4 px-6 space-y-2 absolute z-50 mt-2 left-0 shadow-propertyDropdown border border-Gray-11 rounded-sm bg-white',
                    classPopover,
                  )}
                >
                  <div />
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
