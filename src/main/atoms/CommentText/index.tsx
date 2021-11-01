import TokenizedText from '@common/atoms/TokenizedText';
import { classNames } from '@common/utils';
import { tokenizeComment } from '@main/utils';
import React from 'react';

export interface CommentTextProps {
  content: string;
  showTagSymbol?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const CommentText: React.VFC<CommentTextProps> = ({ content, className = '', style }) => {
  const tokenizedContent = tokenizeComment(content);
  return (
    <TokenizedText
      className={classNames('whitespace-pre-wrap break-words', className)}
      style={style}
    >
      {tokenizedContent}
    </TokenizedText>
  );
};

export default CommentText;
