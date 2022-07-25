import { useErrorHandler } from '@/error/hooks';
import { isBadRequest } from '@/error/utils';
import { FeedApis } from '@/feed/apis';
import { CreateCommentPayload } from '@/feed/types';
import { useIdentity } from '@/identity/hooks';
import { Comment, FeedItem } from '@/main/entity';
import { PaginationParams } from '@/rest/types';
import mixpanel from 'mixpanel-browser';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface CommentHookValues {
  comments: Comment[];
  isLoading: boolean;
  showLessComments: (keep: number) => void;
  addComment: (comment: CreateCommentPayload) => Promise<void>;
  editComment: (comment: Comment) => Promise<void>;
  deleteComment: (comment: Comment) => Promise<void>;
  hasMore: boolean;
}

export function useFeedComment(feed: FeedItem, page?: PaginationParams): CommentHookValues {
  const identity = useIdentity();
  const errorHandler = useErrorHandler();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const getComments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await FeedApis.getComments(feed?.id, {
        order: 'DESC',
        ...page,
      });
      // Comments're shown from bottom to top => need to reverse it;
      const reverse = res.reverse();
      if (page?.offset !== 0) {
        setComments((prevComments) => [...reverse, ...prevComments]);
      } else {
        setComments([...reverse]);
      }
      setHasMore(!!page?.limit && page.limit <= res.length);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get comments');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [errorHandler, feed?.id, page]);

  const showLessComments = (keep: number): void => {
    setComments((prevComments) => prevComments.slice(-keep));
  };

  const addComment = async (comment: CreateCommentPayload) => {
    try {
      const res = await FeedApis.createComment(feed.id, comment);
      if (!res.user) {
        res.user = {
          id: identity?.id,
          email: identity?.email || '',
          fullName: identity?.fullName || identity?.email || '',
          avatar: identity?.avatar,
        };
      }
      setComments((prevComments) => [...prevComments, res]);

      mixpanel.track('Feed Add Comment', {
        user_id: identity?.id,
        email: identity?.email,
        company: identity?.company?.id,
        feed_id: feed.id,
        total_feed_comments: comments.length + 1,
      });
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get comments');
      } else {
        await errorHandler(error);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const editComment = async (comment: Comment) => {
    try {
      setLoading(true);
      // Request API to update
      await FeedApis.updateComment(comment.id, comment);
      // Replace old comment
      const oldIdx = comments.findIndex((cmt) => cmt.id === comment.id);
      if (oldIdx > -1) {
        setComments((prevComments) => {
          const newComments = [...prevComments];
          newComments.splice(oldIdx, 1, comment);
          return newComments;
        });
      }
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Fail to update this comment');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (comment: Comment) => {
    try {
      setLoading(true);
      await FeedApis.deleteComment(comment.id);
      // Remove comment from current list
      setComments((prevComments) => prevComments.filter((cmt) => cmt.id !== comment.id));
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Fail to delete this comment');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  };

  // invalidate list when component is unmounted
  useEffect(() => {
    getComments().then();
  }, [getComments]);

  return {
    comments,
    isLoading,
    showLessComments,
    addComment,
    editComment,
    deleteComment,
    hasMore,
  };
}
