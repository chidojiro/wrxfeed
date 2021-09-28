import { useApi } from '@api';
import { Pagination } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Comment } from '@main/entity';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface CommentHookValues {
  comments: Comment[];
  setComments: Dispatch<SetStateAction<Comment[]>>;
}

export function useComment(transactionId: string, pagination?: Pagination): CommentHookValues {
  const apiClient = useApi();
  const errorHandler = useErrorHandler();
  const [comments, setComments] = useState<Comment[]>([]);

  const getComments = useCallback(async () => {
    try {
      const res = await apiClient.getComments(transactionId, pagination);
      setComments((prevComments) => [...prevComments, ...res]);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get comments');
      } else {
        errorHandler(error);
      }
    }
  }, [apiClient, errorHandler, transactionId, pagination]);

  // invalidate list when component is unmounted
  useEffect(() => {
    getComments();
  }, [getComments]);

  return { comments, setComments };
}
