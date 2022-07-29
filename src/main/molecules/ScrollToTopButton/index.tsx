import { Button } from '@/common/components';
import { Transition } from '@headlessui/react';
import { ChevronDoubleUpIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react';

interface ScrollToTopButtonProps {
  onClick: () => void;
  visible: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ onClick, visible }) => {
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
      <Button
        variant="solid"
        colorScheme="purple"
        pill
        square
        className="h-12 shadow-sm"
        onClick={onClick}
      >
        <ChevronDoubleUpIcon className="h-6 w-6" aria-hidden="true" />
      </Button>
    </Transition>
  );
};

export default ScrollToTopButton;
