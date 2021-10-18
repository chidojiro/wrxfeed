import { useApi } from '@api';
import { MentionData } from '@draft-js-plugins/mention';
import { useErrorHandler } from '@error/hooks';
import { User } from '@main/entity';
import { useCallback, useEffect } from 'react';
import { isBadRequest } from '@src/error';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { mentionLoadingState, mentionsState } from '@main/states';
import debounce from 'lodash.debounce';

const DEBOUNCE_REQUEST_WAIT = 300;

interface MentionHookValues {
  mentions: MentionData[];
  isLoading: boolean;
}

function mentionDataParser(users: User[]): MentionData[] {
  return users.map((user) => ({
    id: user.id,
    name: user.fullName || user.email || 'unknown',
    avatar: user.avatar,
  }));
}

const debounceRequest = debounce(
  (request: (...args: unknown[]) => void) => request(),
  DEBOUNCE_REQUEST_WAIT,
);

export function useMention(): MentionHookValues {
  const [mentions, setMentions] = useRecoilState(mentionsState);
  const [isLoading, setLoading] = useRecoilState(mentionLoadingState);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getUsers({ pagination: { offset: 0, limit: 50 } });
      setMentions(mentionDataParser(res));
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get users by text');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, setMentions, setLoading]);

  useEffect(() => {
    if (!mentions.length && !isLoading) {
      debounceRequest(getUsers);
    }
  }, [getUsers, mentions, isLoading]);
  return { mentions, isLoading };
}
