// import { MessageTextAlt } from '@assets/index';
import { classNames, formatCurrency } from '@common/utils';
import React from 'react';
import { ReactComponent as MessageTextAlt } from '@assets/icons/solid/message-text-alt.svg';

export type Rollup = {
  transactionName: string;
  time: string;
  amount: number;
  messageCount: number;
  isNew: boolean;
};

const dummyRollUps: Rollup[] = [
  {
    transactionName: 'Schnell’s Global Transport',
    time: '10/02/21',
    amount: 8572.65,
    messageCount: 0,
    isNew: true,
  },
  {
    transactionName: 'Maranata Transport',
    time: '10/02/21',
    amount: 8572.65,
    messageCount: 0,
    isNew: true,
  },
  {
    transactionName: 'Schnell’s Global Transport',
    time: '10/02/21',
    amount: 8572.65,
    messageCount: 7,
    isNew: false,
  },
  {
    transactionName: 'Matt Moves Stuff & Transport',
    time: '10/02/21',
    amount: 8572.65,
    messageCount: 0,
    isNew: false,
  },
  {
    transactionName: 'Schnell’s Global Transport',
    time: '10/02/21',
    amount: 8572.65,
    messageCount: 3,
    isNew: false,
  },
  {
    transactionName: 'Schnell’s Global Transport',
    time: '10/02/21',
    amount: 8572.65,
    messageCount: 3,
    isNew: false,
  },
];

export interface RollupCellProps {
  className?: string;
  data?: Rollup[];
}

const RollupCell: React.VFC<RollupCellProps> = ({ className = '', data = dummyRollUps }) => {
  const renderTransaction = (item: Rollup) => {
    const onClickTransaction = () => undefined;
    const renderMessages = () => {
      const isShowMessage = item.messageCount > 0;
      if (isShowMessage) {
        return (
          <div className="flex h-4 w-8 flex-row ml-4">
            <MessageTextAlt className="fill-current text-Gray-6 opacity-25" />
            <p className="text-Gray-6 text-xs font-medium ml-1">{item?.messageCount}</p>
          </div>
        );
      }
      return <div className="h-4 w-8 ml-4" />;
    };
    const renderNewGreen = () => {
      if (item?.isNew) {
        return <div className="flex w-1 h-1 rounded-full bg-Green-4 mr-1.5" />;
      }
      return <div className="flex w-1 h-1 rounded-full mr-1.5" />;
    };
    return (
      <button
        type="button"
        className="flex flex-row w-full items-center pl-8 pr-6 py-1.5 hover:bg-Gray-12"
        onClick={onClickTransaction}
      >
        {renderNewGreen()}
        <p className="text-Gray-6 text-xs font-semibold">{item?.transactionName}</p>
        <p className="text-Gray-6 text-sm font-normal mx-0.5">·</p>
        <p className="text-Gray-6 text-xs font-normal">{item?.time}</p>
        <p className="text-Gray-6 text-xs font-normal ml-auto">
          {`$ ${formatCurrency(item?.amount)}`}
        </p>
        {renderMessages()}
      </button>
    );
  };

  return (
    <div className={classNames('w-full py-4 bg-Gray-18 max-h-[435px]', className)}>
      {data.map(renderTransaction)}
    </div>
  );
};

export default RollupCell;
