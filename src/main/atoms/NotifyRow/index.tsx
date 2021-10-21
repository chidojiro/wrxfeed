import { Notification } from '@main/entity';
import React from 'react';
// import { formatDate } from '@common/utils';
import CommentText from '@main/atoms/CommentText';

export interface NotifyRowProps {
  item: Notification;
  index?: number;
  style?: React.CSSProperties;
  onClickNotifyAndSeen: () => void;
}

const NotifyRow: React.VFC<NotifyRowProps> = ({ item, onClickNotifyAndSeen }) => {
  // const renderTransactionName = () => {
  //   if (item?.transaction?.category) {
  //     return (
  //       <p
  //         className="flex text-xs text-gray-1 font-bold truncate ..."
  //         style={{ height: '24px', width: '120px' }}
  //       >
  //         {item?.transaction?.category?.name}
  //       </p>
  //     );
  //   }
  //   return <div className="flex text-xs text-gray-1">a transaction</div>;
  // };

  return (
    <button
      type="button"
      onClick={onClickNotifyAndSeen}
      className="flex flex-col mt-2 min-h-16 px-4 py-2 hover:bg-Gray-hover"
    >
      {/* <div className="flex flex-row items-center">
        <div className="flex flex-row">
          <div className="flex text-xs text-gray-1 font-bold">{item?.user?.fullName}</div>
          <div className="flex text-xs text-gray-1 font-regular mx-1">mentioned you on</div>
          {renderTransactionName()}
        </div>
        <div className="flex text-Gray-6 font-semibold ml-auto" style={{ fontSize: '10px' }}>
          {formatDate(item?.createdAt)}
        </div>
      </div> */}
      <div className="flex flex-row items-center text-left">
        {/* <p className="flex text-xs text-Gray-2">{item.content}</p> */}
        <CommentText content={item.content} />
      </div>
    </button>
  );
};

export default NotifyRow;
