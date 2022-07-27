import { SanitizedHtmlContent } from '@/common/components';
import { ClassName } from '@/common/types';
import { tokenizeComment } from '@/main/utils';
import clsx from 'clsx';

export type CommentTextProps = ClassName & {
  content: string;
};

export const CommentText = ({ content, className }: CommentTextProps) => {
  const tokenizedContent = tokenizeComment(content);

  return (
    <SanitizedHtmlContent className={clsx('whitespace-pre-wrap break-words', className)}>
      {tokenizedContent}
    </SanitizedHtmlContent>
  );
};
