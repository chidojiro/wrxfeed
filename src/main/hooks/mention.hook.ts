/* eslint-disable react-hooks/exhaustive-deps */
import { MentionData } from '@draft-js-plugins/mention';
import { useEffect, useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';

import { useErrorHandler } from '@error/hooks';
import { User } from '@main/entity';
import { membersState } from '@main/states/member.state';

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

export function useMention(): MentionHookValues {
  const membersLoadable = useRecoilValueLoadable<User[]>(membersState);
  const [mentions, setMentions] = useState<MentionData[]>([]);
  const [isLoading, setLoading] = useState(false);
  const errorHandler = useErrorHandler();

  const handleMentionLoadable = async () => {
    switch (membersLoadable.state) {
      case 'hasValue':
        setLoading(false);
        setMentions(mentionDataParser(membersLoadable.contents));
        break;
      case 'loading':
        setLoading(true);
        break;
      case 'hasError':
        setLoading(false);
        await errorHandler(membersLoadable.contents);
        break;
      default:
        setLoading(false);
        break;
    }
  };

  useEffect(() => {
    handleMentionLoadable();
  }, [membersLoadable]);

  return { mentions, isLoading };
}
