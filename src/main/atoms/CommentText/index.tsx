import TokenizedText from '@/common/atoms/TokenizedText';
import clsx from 'clsx';
import { tokenizeComment } from '@/main/utils';
import React from 'react';

export interface CommentTextProps {
  content: string;
  showTagSymbol?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const CommentText: React.FC<CommentTextProps> = ({ content, className = '', style }) => {
  const tokenizedContent = tokenizeComment(content);
  return (
    <TokenizedText className={clsx('whitespace-pre-wrap break-words', className)} style={style}>
      {tokenizedContent}
    </TokenizedText>
  );
};

export default CommentText;
