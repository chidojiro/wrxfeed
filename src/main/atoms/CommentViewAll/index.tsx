import React, { CSSProperties } from 'react';
import { ReactComponent as MessageTextAltIcon } from '@/assets/icons/solid/message-text-alt.svg';
import Loading from '@/common/atoms/Loading';
import clsx from 'clsx';

export interface CommentRemainingProps {
  onClick?: () => void;
  style?: CSSProperties;
  loading?: boolean;
  className?: string;
  title?: string;
}

const CommentViewAll: React.VFC<CommentRemainingProps> = ({
  className,
  onClick,
  loading,
  style,
  title = 'View all comments',
}) => {
  return (
    <div
      role="none"
      style={style}
      className={clsx('flex space-x-1 cursor-pointer items-center', className ?? '')}
      onClick={onClick}
    >
      <MessageTextAltIcon
        className="fill-current text-Accent-2 path-no-filled"
        width={17}
        height={17}
        viewBox="0 -2 16 18"
      />
      <p className="text-sm font-semibold text-Accent-2">{title}</p>
      {loading && <Loading width={15} height={15} />}
    </div>
  );
};

export default CommentViewAll;
