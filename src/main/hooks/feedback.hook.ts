import { useApi } from '@api';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FeedBackFormModel } from '@main/types';

interface FeedBackModalCallback {
  onSuccess: () => void;
  onError?: (error: unknown) => void;
}

interface FeedbackHookValues {
  isSent: boolean;
  isLoading: boolean;
  postFeedback: (feedId: number, data: FeedBackFormModel) => Promise<void>;
}

export function useFeedBack(callback: FeedBackModalCallback): FeedbackHookValues {
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();
  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);

  const postFeedback = async (feedId: number, data: FeedBackFormModel) => {
    try {
      setLoading(true);
      await ApiClient.postFeedBackFeed(feedId, data);
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
