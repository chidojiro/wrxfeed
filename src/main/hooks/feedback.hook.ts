import { useHandler } from '@/common/hooks';
import { SEND_EMAIL_MESSAGE } from '@/error/errorMessages';
import { isBadRequest } from '@/error/utils';
import { FeedApis } from '@/feed/apis';
import { FeedBackFormModel, FeedBackType } from '@/main/types';
import React from 'react';
import { toast } from 'react-toastify';

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
  const [isSent, setSent] = React.useState(false);

  const { handle: postFeedback, isLoading } = useHandler(
    async (type: FeedBackType, itemId: number, data: FeedBackFormModel) => {
      setSent(false);
      if (type === FeedBackType.Rollup) {
        await FeedApis.createFeedback(itemId, data);
      } else {
        await FeedApis.createFeedback(itemId, data);
      }
      callback.onSuccess();
      toast.success('Your feedback has been successfully sent!');
      setSent(true);
    },
    {
      onError: (error: unknown) => {
        if (callback.onError) {
          callback.onError(error);
          return false;
        }
        if (isBadRequest(error)) {
          toast.error(SEND_EMAIL_MESSAGE);
          return false;
        }
      },
    },
  );

  return { isSent, isLoading, postFeedback };
}
