import React, { CSSProperties } from 'react';
import { Comment } from '@main/entity';
import CommentOwner from '@main/atoms/CommentOwner';
import CommentText from '@main/atoms/CommentText';
import CommentImage from '@main/atoms/CommentImage';
import { DocumentDownloadIcon } from '@heroicons/react/outline';
import Microlink from '@microlink/react';
import { extractHyperlinks } from '@main/utils';
import { MICRO_LINK_API_KEY } from '@src/config';

const IMAGE_EXT = 'jpg,png,jpeg,gif';

export interface CommentItemProps {
  comment: Comment;
  className?: string;
  style?: CSSProperties;
}

const CommentItem: React.VFC<CommentItemProps> = ({ className, comment, ...rest }) => {
  const attachmentType = comment.attachment?.split('.').slice(-1)[0] ?? '';
  const attachmentName = comment.attachment?.split('/').slice(-1)[0] ?? '';
  // Remove prefix to get original name (format: <time>-<id>-<time>-<originalName>.ext)
  const originalName = attachmentName
    .split('-')
    .slice(3, attachmentName.split('-').length)
    .join('-');
  const hyperlinks = extractHyperlinks(comment.content);

  const renderAttachment = () =>
    IMAGE_EXT.includes(attachmentType.toLowerCase()) ? (
      <CommentImage src={comment.attachment ?? ''} />
    ) : (
      <div className="flex flex-row items-center space-x-1">
        <DocumentDownloadIcon width={14} height={14} className="stroke-current text-Gray-3" />
        <a className="text-sm text-Gray-3 hover:underline" href={comment.attachment} download>
          {originalName}
        </a>
      </div>
    );
  const renderLinkPreview = () =>
    hyperlinks && (
      <Microlink
        apiKey={MICRO_LINK_API_KEY}
        style={{ margin: '8px 0 6px' }}
        url={hyperlinks[0].url}
      />
    );
  return (
    <div className={`bg-LightBG py-2 px-3.5 space-y-1 ${className}`} {...rest}>
      <CommentOwner owner={comment.user} commentDate={comment.createdAt} />
      <CommentText content={comment.content} />
      {!!comment.attachment && renderAttachment()}
      {!!hyperlinks?.length && renderLinkPreview()}
    </div>
  );
};

export default CommentItem;
