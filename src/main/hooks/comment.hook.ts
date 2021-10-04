import { useApi } from '@api';
import { OrderDirection, Pagination } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { useIdentity } from '@identity/hooks';
import { Comment, Transaction } from '@main/entity';
import { CommentFormModel } from '@main/types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface CommentHookValues {
  comments: Comment[];
  total: number;
  isLoading: boolean;
  addComment: (comment: CommentFormModel) => Promise<void>;
}

export function useComment(transaction: Transaction, pagination?: Pagination): CommentHookValues {
  const identity = useIdentity();
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(transaction.commentCount ?? 0);
  const [isLoading, setLoading] = useState(false);

  const getComments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getComments({
        transactionId: transaction.id,
        order: OrderDirection.DESC,
        pagination,
      });
      // Comments're shown from bottom to top => need to reverse it;
      const reverse = res.reverse();
      setComments((prevComments) => [...reverse, ...prevComments]);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get comments');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, transaction.id, pagination]);

  const addComment = async (comment: CommentFormModel) => {
    try {
      const res = await ApiClient.addComment(transaction.id, comment);
      if (!res.user) {
        res.user = {
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

  // invalidate list when component is unmounted
  useEffect(() => {
    getComments().then();
  }, [getComments]);

  return { comments, total, isLoading, addComment };
}
