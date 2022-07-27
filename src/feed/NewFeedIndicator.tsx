import { ArrowUpIcon } from '@/assets';
import { Button, Portal } from '@/common/components';
import { FeedChannelEvents, FeedEventData, useFeedChannel } from '@/main/hooks';
import { useNewFeedCount } from '@/main/hooks/newFeedCount.hook';
import { scrollToTop } from '@/main/utils';
import { Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

export type NewFeedIndicatorProps = {
  onScrollToTopComplete: () => void;
};

export const NewFeedIndicator = ({ onScrollToTopComplete }: NewFeedIndicatorProps) => {
  const { newFeedCount, upsertNewFeedCount, setNewFeedCount } = useNewFeedCount();

  const count = newFeedCount ? newFeedCount[location.pathname] : 0;

  const title = count > 1 ? `${count} New Items` : `${count} New Item`;

  const newFeedNumber = newFeedCount ? newFeedCount[location.pathname] : 0;

  const refetchNewItems = async () => {
    scrollToTop(onScrollToTopComplete);
    // Clear counter
    upsertNewFeedCount(location.pathname, 0);
  };

  useFeedChannel(FeedChannelEvents.NEW_ITEM, (data: FeedEventData) => {
    if (data.id) {
      setNewFeedCount((prevCount) => ({
        ...prevCount,
        [location.pathname]: prevCount[location.pathname] + 1,
      }));
    }
  });

  React.useEffect(() => {
    if (!!newFeedNumber) upsertNewFeedCount(location.pathname, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Portal>
      <Transition
        as={Fragment}
        show={!!count}
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
          onClick={refetchNewItems}
          className="fixed z-10 top-24 left-1/2 transform -translate-x-1/2"
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
    </Portal>
  );
};
