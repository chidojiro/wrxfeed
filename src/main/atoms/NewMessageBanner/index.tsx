import { classNames } from '@common/utils';
import React from 'react';
import { ReactComponent as BasicsArrowUpIcon } from '@assets/icons/outline/basics-arrow-up.svg';

interface NewMessageBannerProps {
  className?: string;
  counter?: number;
  onClick: () => void;
}

const NewMessageBanner: React.VFC<NewMessageBannerProps> = ({
  className,
  counter = 0,
  onClick,
}) => {
  if (counter < 1) return null;
  const title = counter > 1 ? `${counter} New Items` : `${counter} New Item`;
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'fixed flex z-20 top-24 self-center flex-row bg-primary rounded-full px-4 py-2.5',
        className ?? '',
      )}
    >
      <p className="text-white text-sm font-semibold">{title}</p>
      <BasicsArrowUpIcon className="w-5 h-5 ml-0.5" />
    </button>
  );
};

export default NewMessageBanner;
