import { Transition } from '@headlessui/react';
import { ChevronDoubleUpIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react';

interface ScrollToTopButtonProps {
  onClick: () => void;
  visible: boolean;
}

const ScrollToTopButton: React.VFC<ScrollToTopButtonProps> = ({ onClick, visible }) => {
  return (
    <Transition
      as={Fragment}
      show={visible}
      enter="transition-opacity ease-in-out duration-250"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-in-out duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <button
        type="button"
        className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-purple-6 hover:bg-purple-5 focus:outline-none"
        onClick={onClick}
      >
        <ChevronDoubleUpIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </Transition>
  );
};

export default ScrollToTopButton;
