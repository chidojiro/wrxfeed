import React from 'react';
import { ReactComponent as EnvelopeIcon } from '@/assets/icons/outline/envelope.svg';
import { classNames } from '@/common/utils';
import { EMAIL_SUPPORT_ADDRESS } from '@/config';

export interface ContactSupportButtonProps {
  className?: string;
}
const ContactSupportButton: React.VFC<ContactSupportButtonProps> = ({ className }) => {
  const onClickContactSupport = () => {
    window?.open(`mailto:${EMAIL_SUPPORT_ADDRESS}`);
  };
  const renderPopover = () => (
    <div className="invisible group-hover:visible absolute -top-10 right-0">
      <div className="bg-Gray-3 p-2">
        <p className="text text-white text-xs w-28 font-semibold">Contact Support</p>
      </div>
      <svg
        className="absolute text-Gray-3 h-2 right-5 top-full"
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
        xmlSpace="preserve"
      >
        <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg>
    </div>
  );
  return (
    <>
      <button
        type="button"
        onClick={onClickContactSupport}
        className={classNames(
          'fixed group flex w-[50px] h-[50px] rounded-full justify-center items-center bg-primary hover:bg-Accent-2 z-10 bottom-12 right-12',
          className ?? '',
        )}
      >
        {renderPopover()}
        <EnvelopeIcon className="w-6 h-6" />
      </button>
    </>
  );
};

export default ContactSupportButton;
