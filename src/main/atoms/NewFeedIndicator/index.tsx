import { ArrowUpIcon } from '@/assets';
import { Button } from '@/common/components';
import { Transition } from '@headlessui/react';
import React, { Fragment, MouseEventHandler } from 'react';

interface NewFeedIndicatorProps {
  isVisible: boolean;
  counter: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const NewFeedIndicator: React.FC<NewFeedIndicatorProps> = ({ isVisible, counter, onClick }) => {
  const title = counter > 1 ? `${counter} New Items` : `${counter} New Item`;
  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 z-10 top-24 flex items-start pointer-events-none"
    >
      <div className="w-full flex items-start justify-center">
        <Transition
          as={Fragment}
          show={isVisible}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 translate-y-[-10rem]"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-300"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-[-10rem]"
        >
          <Button
            variant="solid"
            colorScheme="primary"
            size="lg"
            pill
            aria-hidden="true"
            onClick={onClick}
            iconRight={
              <ArrowUpIcon
                width={20}
                height={20}
                className="stroke-current path-no-stroke text-white stroke-[1.5]"
              />
            }
          >
            {title}
          </Button>
        </Transition>
      </div>
    </div>
  );
};

export default NewFeedIndicator;
