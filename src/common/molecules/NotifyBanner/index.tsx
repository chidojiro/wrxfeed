import React, { Fragment, useCallback, useEffect, useRef, useState, VFC } from 'react';
import { ReactComponent as TickCircle } from '@/assets/icons/solid/tick-circle.svg';
import { Transition } from '@headlessui/react';
import EventEmitter, { EventName } from '@/main/EventEmitter';

const DEFAULT_TIMEOUT = 2000;
const DEFAULT_BACKGROUND = '#7A3FEB';

interface NotifyBannerOptions {
  timeout?: number;
  topOffset?: number;
  backgroundColor?: string;
}

enum NotifyType {
  INFO,
}

interface NotifyBannerProps extends NotifyBannerOptions {
  type: NotifyType;
  message: string;
}

const NotifyBanner = {
  info(message: string, options?: NotifyBannerOptions): void {
    EventEmitter.dispatch(EventName.OPEN_NOTIFY_BANNER, {
      type: NotifyType.INFO,
      message,
      ...options,
    });
  },
};

export const NotifyBannerContainer: VFC<NotifyBannerOptions> = ({ timeout, topOffset }) => {
  const timeoutRef = useRef(timeout ?? DEFAULT_TIMEOUT);
  const topOffsetRef = useRef(topOffset ?? 0);
  const typeRef = useRef<NotifyType>(NotifyType.INFO);
  const backgroundColorRef = useRef(DEFAULT_BACKGROUND);
  const [isVisible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = (data: NotifyBannerProps | unknown) => {
    if (data && typeof data === 'object') {
      const dataProps = data as NotifyBannerProps;
      typeRef.current = dataProps.type;
      timeoutRef.current = dataProps.timeout ?? DEFAULT_TIMEOUT;
      if (typeof dataProps.topOffset === 'number') {
        topOffsetRef.current = dataProps.topOffset;
      }
      if (dataProps.backgroundColor) {
        backgroundColorRef.current = dataProps.backgroundColor;
      }
      setMessage(dataProps.message);
    }
  };

  const resetStates = useCallback(() => {
    setVisible(false);
    setMessage('');
    timeoutRef.current = DEFAULT_TIMEOUT;
    topOffsetRef.current = topOffset ?? 0;
    backgroundColorRef.current = DEFAULT_BACKGROUND;
  }, [setVisible, topOffset]);

  useEffect(() => {
    EventEmitter.subscribe(EventName.OPEN_NOTIFY_BANNER, handleOpen);
    return () => {
      EventEmitter.unsubscribe(EventName.OPEN_NOTIFY_BANNER, handleOpen);
    };
  }, []);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setTimeout(resetStates, timeoutRef.current);
    }
  }, [message, resetStates]);

  return (
    <div
      aria-live="assertive"
      style={{ top: topOffsetRef.current }}
      className="z-20 fixed inset-0 flex items-start pointer-events-none"
    >
      <div className="w-full flex flex-col items-start">
        <Transition
          as={Fragment}
          show={isVisible}
          enter="transition ease-out duration-300"
          enterFrom="opacity-50 translate-y-[-36px]"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-50 translate-y-[-36px]"
        >
          <div
            style={{ backgroundColor: backgroundColorRef.current }}
            className="flex w-full min-h-[36px] bg-purple-5 justify-center items-center py-2 space-x-2"
          >
            <TickCircle
              className="fill-current path-no-filled text-system-success"
              viewBox="0 0 15 15"
            />
            <span className="text-sm text-purple-9">{message}</span>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default NotifyBanner;
