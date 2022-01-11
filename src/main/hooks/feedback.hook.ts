import { useApi } from '@api';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FeedBackFormModel, FeedBackType } from '@main/types';
import { SEND_EMAIL_MESSAGE } from '@error/errorMessages';

interface FeedBackModalCallback {
  onSuccess: () => void;
  onError?: (error: unknown) => void;
}

interface FeedbackHookValues {
  isSent: boolean;
  isLoading: boolean;
  postFeedback: (type: FeedBackType, itemId: number, data: FeedBackFormModel) => Promise<void>;
}

export function useFeedBack(callback: FeedBackModalCallback): FeedbackHookValues {
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();
  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);

  const postFeedback = async (type: FeedBackType, itemId: number, data: FeedBackFormModel) => {
    try {
      setLoading(true);
      if (type === FeedBackType.Rollup) {
        await ApiClient.postFeedBackFeed(itemId, data);
      } else {
        await ApiClient.postFeedBackLineItem(itemId, data);
      }
      setLoading(false);
      setSent(true);
      callback.onSuccess();
      toast.success('Your feedback has been successfully sent!');
    } catch (error) {
      setLoading(false);
      setSent(false);
      if (callback.onError) {
        callback.onError(error);
      } else if (isBadRequest(error)) {
        toast.error(SEND_EMAIL_MESSAGE);
      } else {
        await errorHandler(error);
      }
    }
  };

  return { isSent, isLoading, postFeedback };
}
