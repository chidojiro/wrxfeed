import React, { CSSProperties } from 'react';
import { ReactComponent as MessageTextAltIcon } from '@assets/icons/solid/message-text-alt.svg';
import Loading from '@common/atoms/Loading';

export interface CommentRemainingProps {
  hiddenCount: number;
  onClick?: () => void;
  style?: CSSProperties;
  loading?: boolean;
}

const CommentRemaining: React.VFC<CommentRemainingProps> = ({ onClick, loading, style }) => {
  return (
    <div
      role="none"
      style={style}
      className="flex space-x-1 cursor-pointer items-center"
      onClick={onClick}
    >
      <MessageTextAltIcon
        className="fill-current text-primary"
        width={17}
        height={17}
        viewBox="0 -2 16 18"
      />
      <p className="text-sm font-semibold text-primary">View all comments</p>
      {loading && <Loading width={15} height={15} />}
    </div>
  );
};

export default CommentRemaining;
