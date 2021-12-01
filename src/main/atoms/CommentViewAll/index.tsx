import React, { CSSProperties } from 'react';
import { ReactComponent as MessageTextAltIcon } from '@assets/icons/solid/message-text-alt.svg';
import Loading from '@common/atoms/Loading';
import { classNames } from '@common/utils';

export interface CommentRemainingProps {
  onClick?: () => void;
  style?: CSSProperties;
  loading?: boolean;
  className?: string;
  title?: string;
  color?: string;
}

const CommentViewAll: React.VFC<CommentRemainingProps> = ({
  className,
  onClick,
  loading,
  style,
  title = 'View all comments',
  color = 'Accent-2',
}) => {
  return (
    <div
      role="none"
      style={style}
      className={classNames('flex space-x-1 cursor-pointer items-center', className ?? '')}
      onClick={onClick}
    >
      <MessageTextAltIcon
        className={`fill-current text-${color} path-no-filled`}
        width={17}
        height={17}
        viewBox="0 -2 16 18"
      />
      <p className={`text-sm font-semibold text-${color}`}>{title}</p>
      {loading && <Loading width={15} height={15} />}
    </div>
  );
};

export default CommentViewAll;
