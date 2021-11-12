import { Notification } from '@main/entity';
import React from 'react';
import { classNames } from '@common/utils';
import CommentText from '@main/atoms/CommentText';
import { getDepartmentBgColor } from '@main/utils';
import { formatDistance } from 'date-fns';
import { NotifyStatus } from '@api/types';

export interface NotificationCardProps {
  item: Notification;
  index?: number;
  style?: React.CSSProperties;
  onClick: (item: Notification) => void;
}

const NotificationCard: React.VFC<NotificationCardProps> = ({ item, onClick }) => {
  const deptBgClass = React.useMemo(
    () => getDepartmentBgColor(item?.content ?? ''),
    [item?.content],
  );
  const isNew = item.status === NotifyStatus.UNREAD;
  const styleDotNewOrOld = isNew ? 'bg-system-success' : 'bg-transparent';
  const styleCardNewOrOld = isNew ? 'bg-white' : 'bg-Gray-18';
  return (
    <button
      type="button"
      onClick={() => {
        onClick(item);
      }}
      className={classNames('flex flex-row min-h-16 pl-3 pr-5 py-4 w-full', styleCardNewOrOld)}
    >
      <div className="flex flex-row items-center">
        <div
          className={classNames(
            'flex self-center w-1.5 h-1.5 rounded-full mr-1.5',
            styleDotNewOrOld,
          )}
        />
        <div
          className="flex flex-row items-center w-10 h-10 rounded-full"
          style={{ backgroundColor: deptBgClass }}
        >
          {/* <img className="flex w-10 h-10 rounded-full" alt="avatar-who-mention" /> */}
        </div>
      </div>
      <CommentText
        content={item.content}
        className="text-left leading-6 break-words ml-4"
        style={{ whiteSpace: 'normal' }}
      />
      <div className="flex w-40 ml-auto">
        <div className="flex text-Gray-6 font-regular ml-auto text-right text-xs">
          {formatDistance(new Date(item?.createdAt), new Date(), { addSuffix: true })}
        </div>
      </div>
    </button>
  );
};

export default NotificationCard;
