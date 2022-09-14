import { TickIcon } from '@/assets';
import { useControllableState } from '@/common/hooks';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { ClassName, Option } from '../../types';

export type SelectProps = ClassName & {
  defaultValue?: string;
  options: Option[];
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const Select = React.forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      defaultValue,
      value: valueProp,
      onChange: onChangeProp,
      name,
      options,
      className,
      ...props
    }: SelectProps,
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
    });

    const selectedOption = options.find((option) => option.value === value) ?? options[0];

    return (
      <Menu as="div" className="relative inline-block text-left">
        <input name={name} className="minimized" ref={ref} />
        <div>
          <Menu.Button
            {...props}
            className={clsx(
              'inline-flex items-center gap-1 justify-between px-2.5 py-1.5 text-xs',
              className,
            )}
          >
            <div className="text-medium">{selectedOption?.label}</div>
            <ChevronDownIcon className="w-5 h-5 text-Gray-3" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 min-w-[150px] mt-2 origin-top-right bg-white rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-medium">
            <div className="py-1">
              {options.map((option, id) => {
                return (
                  <Menu.Item key={id}>
                    {({ active }) => (
                      <div
                        onClick={() => setValue(option.value)}
                        className={clsx(
                          'block px-4 py-2 text-xs text-Gray-3 cursor-pointer',
                          'flex items-center gap-1',
                          {
                            'bg-Gray-7': active,
                          },
                        )}
                      >
                        <div className="flex-1">{option.label}</div>
                        <div className="w-5 h-5 flex items-center justify-end">
                          {selectedOption.value === option.value && (
                            <TickIcon className="w-full h-full" />
                          )}
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  },
);

Select.displayName = 'Select';
