import React, { VFC } from 'react';
import { ReactComponent as TickCircle } from '@/assets/icons/solid/tick-circle.svg';
import { ReactComponent as CloseIcon } from '@/assets/icons/outline/close.svg';

interface BannerProps {
  message: string;
  onClose: () => void;
}

const Banner: VFC<BannerProps> = ({ message, onClose }) => {
  return (
    <div className="relative w-full flex items-start">
      <div className="w-full flex flex-col items-start">
        <div className="flex w-full min-h-[36px] bg-Gray-1 justify-center items-center py-2 space-x-2">
          <TickCircle
            className="fill-current path-no-filled text-system-success"
            viewBox="0 0 15 15"
          />
          <span className="text-sm text-white">{message}</span>

          <button type="button" className="absolute right-3 cursor-pointer" onClick={onClose}>
            <CloseIcon className="stroke-current path-no-stroke text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
