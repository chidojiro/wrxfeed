import { InfiniteLoader } from '@/common/components';
import { useInfiniteData } from '@/common/hooks';
import { isBadRequest } from '@/error';
import { InsightFeedItem } from '@/insight/types';
import { FeedItem, Visibility } from '@/main/entity';
import { CommentFormModel } from '@/main/types';
import { commentEditorHtmlParser } from '@/main/utils';
import { GetUploadFileTokenPayload } from '@/media/types';
import { useMentions } from '@/misc/useMentions';
import { useProfile } from '@/profile/useProfile';
import { PaginationParams } from '@/rest/types';
import { EditorState } from 'draft-js';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FeedApis } from '../apis';
import { CommentBox } from '../CommentBox';
import { CreateCommentPayload } from '../types';
import { CommentAttachmentModal } from './CommentAttachmentModal';
import { CommentItem } from './CommentItem';
import { ViewAllCommentsButton } from './ViewAllCommentsButton';

const INITIAL_COMMENTS = 2;
const COMMENTS_PER_INFINITE_LOAD = 20;

export type CommentsSectionProps = {
  feed: FeedItem | InsightFeedItem;
};

export const CommentsSection = ({ feed }: CommentsSectionProps) => {
  const [attachFileComment, setAttachFileComment] = React.useState<File | null>(null);
  const [uploadFileOptions, setUploadFileOptions] = React.useState<GetUploadFileTokenPayload>();

  const { profile } = useProfile();
  const { mentions } = useMentions();

  const {
    initialData: initialComments,
    data: comments,
    loadMore: loadMoreComments,
    create: createComment,
    update: updateComment,
    delete: deleteComment,
  } = useInfiniteData(
    (paginationParams: Required<PaginationParams>) =>
      FeedApis.getComments(feed.id, {
        order: 'DESC',
        ...paginationParams,
        offset: INITIAL_COMMENTS + paginationParams.offset,
      }),
    {
      initialFetch: () =>
        FeedApis.getComments(feed.id, {
          order: 'DESC',
          offset: 0,
          limit: INITIAL_COMMENTS,
        }),
      handleCreate: (payload: CreateCommentPayload) => FeedApis.createComment(feed.id, payload),
      handleDelete: FeedApis.deleteComment,
      reverse: true,
      onError: (error: any) => {
        if (isBadRequest(error)) {
          toast.error(`Can't get any comments!`);
          return false;
        }
      },
    },
  );

  const handleUpdateComment = async (id: number, payload: CreateCommentPayload) => {
    await FeedApis.updateComment(id, payload);

    updateComment(id, payload);
  };

  const onSubmitComment: SubmitHandler<CommentFormModel> = (values) => {
    const contentState = values?.content as EditorState;
    const isDirty = contentState.getCurrentContent().hasText() || !!values?.attachment;

    if (!isDirty) return;

    const parsedContent = commentEditorHtmlParser(contentState.getCurrentContent());

    return createComment({
      content: parsedContent,
      attachment: values.attachment,
    });
  };

  const handleAttachFile = (file: File) => {
    setUploadFileOptions({
      filename: `${feed.id}-${Date.now()}-${file.name}`,
      contentType: file.type,
      uploadType: 'attachments',
    });
    setAttachFileComment(file);
  };

  const isHidden =
    (feed as any).category !== null && (feed as any).category?.visibility === Visibility.HIDDEN;

  return (
    <div>
      <div className="space-y-4 px-4 sm:px-12 mt-1.5">
        {initialComments.length >= 2 && (
          <InfiniteLoader
            onLoad={loadMoreComments}
            itemsPerLoad={COMMENTS_PER_INFINITE_LOAD}
            mode="ON_DEMAND"
          >
            {({ isExhausted, loadMore, isLoading }) =>
              isExhausted ? null : (
                <ViewAllCommentsButton onClick={loadMore} className="mt-2.5" loading={isLoading} />
              )
            }
          </InfiniteLoader>
        )}
        <ul className="flex flex-col mt-1.5">
          {comments?.map((comment) => (
            <li key={comment.id}>
              <CommentItem
                className={isHidden ? 'bg-purple-11' : 'bg-Gray-24'}
                comment={comment}
                mentionData={mentions}
                editable={profile?.id === comment.user.id}
                onEdit={(data) => handleUpdateComment(data.id, { ...comment, ...data })}
                onDelete={({ id }) => deleteComment(id)}
                isShowUserAva
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="px-4 sm:px-6 lg:px-12 py-1.5 mb-2 sm:mb-4">
        <CommentBox
          id={feed.id.toString()}
          className="bg-white"
          onAttachFile={handleAttachFile}
          mentionData={mentions}
          onSubmit={onSubmitComment}
        />
      </div>
      <CommentAttachmentModal
        depName={(feed as any).department?.name}
        catName={(feed as any).category?.name}
        open={!!attachFileComment}
        file={attachFileComment}
        mentionData={mentions}
        uploadOptions={uploadFileOptions}
        onClose={() => setAttachFileComment(null)}
        onFileUploaded={onSubmitComment}
      />
    </div>
  );
};
