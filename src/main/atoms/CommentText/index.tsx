import TokenizedText from '@common/atoms/TokenizedText';
import { tokenizeComment } from '@main/utils';
import { Gray } from '@theme/colors';
import React from 'react';

export interface CommentTextProps {
  content: string;
  showTagSymbol?: boolean;
}

const CommentText: React.VFC<CommentTextProps> = ({ content }) => {
  const tokenizedContent = tokenizeComment(content);
  return (
    <TokenizedText sx={{}} variant="body1" color={Gray[2]} whiteSpace="pre-line">
      {tokenizedContent}
    </TokenizedText>
  );
};

export default CommentText;
