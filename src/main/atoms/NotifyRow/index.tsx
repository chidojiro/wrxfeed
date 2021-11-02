import { Notification } from '@main/entity';
import React from 'react';
import { formatDate } from '@common/utils';
import CommentText from '@main/atoms/CommentText';

export interface NotifyRowProps {
  item: Notification;
  index?: number;
  style?: React.CSSProperties;
  onClickNotifyAndSeen: () => void;
}

const NotifyRow: React.VFC<NotifyRowProps> = ({ item, onClickNotifyAndSeen }) => {
  return (
    <button
      type="button"
      onClick={onClickNotifyAndSeen}
      className="flex flex-col mt-2 min-h-16 px-4 py-2 hover:bg-Gray-hover"
    >
      <div className="flex flex-1 w-full flex-row">
        <CommentText
          content={item.content}
          className="w-full text-left leading-6 break-all"
          style={{ whiteSpace: 'normal' }}
        />
        <div className="flex w-40">
          <div
            className="flex text-Gray-6 font-semibold ml-auto text-right text-2xs mt-1"
            style={{ fontSize: '10px' }}
          >
            {formatDate(item?.createdAt)}
          </div>
        </div>
      </div>
    </button>
  );
};

export default NotifyRow;
