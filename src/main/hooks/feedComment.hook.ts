import { useApi } from '@api';
import { AddCommentParams, OrderDirection, Pagination } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { useIdentity } from '@identity/hooks';
import { Comment, FeedItem } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface CommentHookValues {
  comments: Comment[];
  total: number;
  isLoading: boolean;
  showLessComments: (keep: number) => void;
  addComment: (comment: AddCommentParams) => Promise<void>;
  editComment: (comment: Comment) => Promise<void>;
  deleteComment: (comment: Comment) => Promise<void>;
  hasMore: boolean;
}

export function useFeedComment(feed: FeedItem, page?: Pagination): CommentHookValues {
  const identity = useIdentity();
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0); // waiting api update feed's commentCount
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const getComments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getFeedItemComments({
        feedId: feed?.id,
        order: OrderDirection.DESC,
        page,
      });
      // Comments're shown from bottom to top => need to reverse it;
      const reverse = res.reverse();
      if (page?.offset !== 0) {
        setComments((prevComments) => [...reverse, ...prevComments]);
      } else {
        setComments([...reverse]);
      }
      setHasMore(!!res.length);
      setTotal((page?.offset ?? 0) + (page?.limit ?? 0));
      if (res.length) {
        setTotal((preTotal) => preTotal + 1);
      }
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get comments');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, feed.id, page]);

  const showLessComments = (keep: number): void => {
    setComments((prevComments) => prevComments.slice(-keep));
  };

  const addComment = async (comment: AddCommentParams) => {
    try {
      const res = await ApiClient.addFeedItemComment(feed.id, comment);
      if (!res.user) {
        res.user = {
          id: identity?.id,
          email: identity?.email || '',
          fullName: identity?.fullName || identity?.email || '',
        };
      }
      setComments((prevComments) => [...prevComments, res]);
      setTotal(total + 1);
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
      await ApiClient.editComment(comment.id, comment);
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
      await ApiClient.deleteComment(comment.id);
      // Remove comment from current list
      setComments((prevComments) => prevComments.filter((cmt) => cmt.id !== comment.id));
      setTotal(total - 1);
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
    total,
    isLoading,
    showLessComments,
    addComment,
    editComment,
    deleteComment,
    hasMore,
  };
}
