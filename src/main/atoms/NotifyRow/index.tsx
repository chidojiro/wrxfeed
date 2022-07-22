import { Notification } from '@/main/entity';
import React from 'react';
import CommentText from '@/main/atoms/CommentText';
import { formatDate } from '@/common/utils';
import { Button } from '@/common/components';

export interface NotifyRowProps {
  item: Notification;
  index?: number;
  style?: React.CSSProperties;
  onClickNotifyAndSeen: () => void;
}

const NotifyRow: React.FC<NotifyRowProps> = ({ item, onClickNotifyAndSeen }) => {
  return (
    <Button
      onClick={onClickNotifyAndSeen}
      className="flex flex-col mt-2 min-h-16 px-4 py-2 hover:bg-Gray-14"
    >
      <div className="flex flex-1 w-full flex-row">
        <CommentText
          content={item.content}
          className="w-full text-left leading-6 break-words"
          style={{ whiteSpace: 'normal' }}
        />
        <div className="flex w-40">
          <div
            className="flex text-Gray-6 font-semibold ml-auto text-right text-3xs mt-1"
            style={{ fontSize: '10px' }}
          >
            {formatDate(item?.createdAt)}
          </div>
        </div>
      </div>
    </Button>
  );
};

export default NotifyRow;
