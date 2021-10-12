import { useApi } from '@api';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FeedBackFormModel } from '@main/types';

interface FeelBackModalCallback {
  onSuccess: () => void;
  onError?: (error: unknown) => void;
}

interface FeedbackHookValues {
  isSent: boolean;
  isLoading: boolean;
  postFeedback: (transactionId: number, data: FeedBackFormModel) => Promise<void>;
}

export function useFeedBack(callback: FeelBackModalCallback): FeedbackHookValues {
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
      callback.onSuccess();
      toast.success('Send your feedback successfully!');
    } catch (error) {
      setLoading(false);
      setSent(false);
      if (callback.onError) {
        callback.onError(error);
      } else if (isBadRequest(error)) {
        toast.error('Can not send your feedback!');
      } else {
        await errorHandler(error);
      }
    }
  };
  return { isSent, isLoading, postFeedback };
}
