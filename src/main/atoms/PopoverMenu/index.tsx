import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, ReactNode } from 'react';

const PopoverMenu: React.FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">{children}</div>
      </Menu.Items>
    </Transition>
  );
};

export default React.memo(PopoverMenu);
