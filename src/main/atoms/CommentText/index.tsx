import TokenizedText from '@common/atoms/TokenizedText';
import { tokenizeComment } from '@main/utils';
import React from 'react';

export interface CommentTextProps {
  content: string;
  showTagSymbol?: boolean;
}

const CommentText: React.VFC<CommentTextProps> = ({ content }) => {
  const tokenizedContent = tokenizeComment(content);
  return <TokenizedText className="whitespace-pre-wrap">{tokenizedContent}</TokenizedText>;
};

export default CommentText;
