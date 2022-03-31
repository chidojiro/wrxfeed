import { classNames } from '@common/utils';
import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import AddTargetTagInput from '@main/atoms/AddTargetTagInput';
import { IntersectIcon } from '@assets';

interface ExceptDropdownProps {
  className?: string;
  classPopover?: string;
  title: string;
}

const ExceptDropdown: React.VFC<ExceptDropdownProps> = ({
  className = '',
  classPopover = '',
  title,
}) => {
  return (
    <div className={classNames(className)}>
      <Popover as="div" className="flex-shrink-0 relative">
        {({ open }) => (
          <>
            <Popover.Button className={classNames('', open ? '' : '')}>
              <button
                type="button"
                className="w-[30px] h-[30px] hover:bg-Gray-12 flex justify-center items-center rounded-sm border border-Gray-11"
              >
                <IntersectIcon className="w-4 h-4" width={16} height={16} />
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
                    'flex w-[384px] h-[207px] flex-col py-4 px-6 space-y-2 absolute z-50 mt-2 -right-8 shadow-propertyDropdown border border-Gray-11 rounded-sm bg-white',
                    classPopover,
                  )}
                >
                  <p className="text-primary font-semibold text-xs">{title}</p>
                  <AddTargetTagInput placeholder={title} />
                </div>
              </Transition>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default ExceptDropdown;
