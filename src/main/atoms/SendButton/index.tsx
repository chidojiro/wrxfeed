import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { EssentialsSendIcon, EssentialsSendEnableIcon } from '@/assets';
import { Button } from '@/common/components';

const SendButtonAirplane: React.FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ disabled, ref, ...rest }) => {
  const SendIcon = disabled ? (
    <EssentialsSendIcon
      className="fill-current text-gray-6 opacity-50 path-no-filled"
      width={16}
      height={16}
      viewBox="0 0 17 17"
    />
  ) : (
    <EssentialsSendEnableIcon
      className="fill-current text-purple-5 path-no-filled"
      width={16}
      height={16}
      viewBox="0 0 17 17"
    />
  );

  return (
    <Button
      className="flex bg-transparent rounded-none border-0 items-center outline-none pr-[5px] pl-0.5"
      type="submit"
      ref={ref as any}
      {...rest}
    >
      {SendIcon}
    </Button>
  );
};

export default React.memo(SendButtonAirplane);
