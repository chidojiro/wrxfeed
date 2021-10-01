import { useApi } from '@api';
import { Pagination } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { useIdentity } from '@identity/hooks';
import { Comment } from '@main/entity';
import { CommentFormModel } from '@main/types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface CommentHookValues {
  comments: Comment[];
  addComment: (comment: CommentFormModel) => Promise<void>;
}

export function useComment(transactionId: number, pagination?: Pagination): CommentHookValues {
  const identity = useIdentity();
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();
  const [comments, setComments] = useState<Comment[]>([]);

  const getComments = useCallback(async () => {
    try {
      const res = await ApiClient.getComments(transactionId, pagination);
      setComments((prevComments) => [...prevComments, ...res]);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get comments');
      } else {
        await errorHandler(error);
      }
    }
  }, [ApiClient, errorHandler, transactionId, pagination]);

  const addComment = async (comment: CommentFormModel) => {
    try {
      const res = await ApiClient.addComment(transactionId, comment);
      if (!res.user) {
        res.user = {
          email: identity?.email || '',
          fullName: identity?.fullName || identity?.email || '',
        };
      }
      setComments((prevComments) => [...prevComments, res]);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get comments');
      } else {
        await errorHandler(error);
      }
    }
  };

  // invalidate list when component is unmounted
  useEffect(() => {
    getComments().then();
  }, [getComments]);

  return { comments, addComment };
}
