import TokenizedText from '@common/atoms/TokenizedText';
import { classNames } from '@common/utils';
import { tokenizeComment } from '@main/utils';
import React from 'react';

export interface CommentTextProps {
  content: string;
  showTagSymbol?: boolean;
  className?: string;
  useWhitespacePreWrap?: boolean;
}

const CommentText: React.VFC<CommentTextProps> = ({
  content,
  className = '',
  useWhitespacePreWrap = true,
}) => {
  const tokenizedContent = tokenizeComment(content);
  const wrapStyle = useWhitespacePreWrap ? 'whitespace-pre-wrap' : '';
  return (
    <TokenizedText className={classNames('break-words', wrapStyle, className)}>
      {tokenizedContent}
    </TokenizedText>
  );
};

export default CommentText;
