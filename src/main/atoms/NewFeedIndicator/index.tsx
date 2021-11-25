import { ArrowUpIcon } from '@assets';
import { Transition } from '@headlessui/react';
import React, { Fragment, MouseEventHandler, VFC } from 'react';

interface NewFeedIndicatorProps {
  isVisible: boolean;
  counter: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const NewFeedIndicator: VFC<NewFeedIndicatorProps> = ({ isVisible, counter, onClick }) => {
  const title = counter > 1 ? `${counter} New Items` : `${counter} New Item`;
  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 z-30 top-24 flex items-start pointer-events-none"
    >
      <div className="w-full flex items-start justify-center">
        <Transition
          as={Fragment}
          show={isVisible}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 translate-y-[-10rem]"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-[-10rem]"
        >
          <div
            aria-hidden="true"
            className="flex flex-row justify-center items-center px-4 py-2.5 rounded-full bg-primary shadow-sm space-x-1"
            onClick={onClick}
          >
            <p className="text-sm font-semibold text-white">{title}</p>
            <ArrowUpIcon
              width={20}
              height={20}
              className="stroke-current path-no-stroke text-white stroke-[1.5]"
            />
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default NewFeedIndicator;
