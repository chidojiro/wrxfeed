import { useApi } from '@api';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FeedBackFormModel } from '../../diary/types';

interface FeedbackHookValues {
  isSent: boolean;
  isLoading: boolean;
  postFeedback: (transactionId: number, data: FeedBackFormModel) => Promise<void>;
}

export function useFeedBack(): FeedbackHookValues {
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();
  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);

  const postFeedback = async (transactionId: number, data: FeedBackFormModel) => {
    try {
      setLoading(true);
      const res = await ApiClient.postFeedback(transactionId, data);
      console.log({ res });
      setLoading(false);
      setSent(true);
      toast.success('Send your feedback successfully!');
    } catch (error) {
      setLoading(false);
      setSent(false);
      if (isBadRequest(error)) {
        toast.error('Can not send your feedback!');
      } else {
        await errorHandler(error);
      }
    }
  };
  return { isSent, isLoading, postFeedback };
}
