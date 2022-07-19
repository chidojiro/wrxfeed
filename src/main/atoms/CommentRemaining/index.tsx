import React, { CSSProperties } from 'react';
import { ReactComponent as MessageTextAltIcon } from '@/assets/icons/solid/message-text-alt.svg';
import Loading from '@/common/atoms/Loading';
import clsx from 'clsx';

export interface CommentRemainingProps {
  hiddenCount: number;
  onClick?: () => void;
  style?: CSSProperties;
  loading?: boolean;
  className?: string;
}

const CommentRemaining: React.FC<CommentRemainingProps> = ({
  hiddenCount,
  className,
  onClick,
  loading,
  style,
}) => {
  return (
    <div
      role="none"
      style={style}
      className={clsx('flex space-x-1 cursor-pointer items-center', className ?? '')}
      onClick={onClick}
    >
      <MessageTextAltIcon
        className="fill-current text-purple-5 path-no-filled"
        width={17}
        height={17}
        viewBox="0 -2 16 18"
      />
      <p className="text-sm font-semibold text-purple-6">
        {hiddenCount ? 'Show more comments' : 'Show less comments'}
      </p>
      {loading && <Loading width={15} height={15} />}
    </div>
  );
};

export default CommentRemaining;
