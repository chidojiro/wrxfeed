// import { MessageTextAlt } from '@assets/index';
import { DATE_FORMAT, formatCurrency } from '@common/utils';
import React from 'react';
import { ReactComponent as MessageTextAlt } from '@assets/icons/solid/message-text-alt.svg';
import { TransLineItem, Vendor } from '@main/entity';
import dayjs from 'dayjs';

export interface RollupLineItemProps {
  lineItem: TransLineItem;
  onClick?: (lineItem: TransLineItem) => void;
  onClickMessage?: () => void;
  onClickVendor?: (vendor: Vendor) => void;
}

const RollupLineItem: React.VFC<RollupLineItemProps> = ({
  lineItem,
  onClick,
  onClickMessage,
  onClickVendor,
}) => {
  const renderMessages = () => {
    const isShowMessage = false; // lineItem?.commentCount > 0;
    if (isShowMessage) {
      return (
        <button onClick={onClickMessage} type="button" className="flex h-4 w-8 flex-row ml-4">
          <MessageTextAlt className="fill-current text-Gray-6 opacity-25" />
          <p className="text-Gray-6 text-xs font-medium ml-1">{lineItem?.accountId}</p>
        </button>
      );
    }
    return <div className="h-4 w-8 ml-4" />;
  };

  const renderNewGreen = () => {
    if (lineItem?.meta?.isRead === false) {
      return <div className="flex w-1 h-1 rounded-full bg-Green-4 mr-1.5" />;
    }
    return <div className="flex w-1 h-1 rounded-full mr-1.5" />;
  };

  const onClickLineItemVendor = () => {
    if (onClickVendor && lineItem.vendor) {
      onClickVendor(lineItem.vendor);
    }
  };

  return (
    <div
      aria-hidden="true"
      className="flex flex-row w-full items-center pl-2 sm:pl-10 pr-2 sm:pr-2 py-1.5 hover:bg-Gray-12"
      onClick={() => onClick && onClick(lineItem)}
    >
      {renderNewGreen()}
      <button type="button" onClick={onClickLineItemVendor}>
        <b className="text-Gray-6 text-xs font-semibold text-left max-w-[140px] sm:max-w-[300px] truncate">
          {lineItem?.vendor?.name}
        </b>
      </button>
      <p className="text-Gray-6 text-sm font-normal mx-0.5">·</p>
      <p className="text-Gray-6 text-xs font-normal">
        {dayjs(lineItem?.createdAt).format(DATE_FORMAT)}
      </p>
      <p className="text-Gray-6 text-xs font-normal ml-auto">
        {`$ ${formatCurrency(lineItem?.amountFx)}`}
      </p>
      {renderMessages()}
    </div>
  );
};

export default RollupLineItem;
