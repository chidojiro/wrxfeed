import { STATUS } from '@common/atoms/StatusTag';

export type User = {
  name: string;
  avatar?: string;
};

export type Comment = {
  id: string;
  owner: User;
  commentDate: number;
  content: string;
};

export type Transaction = {
  id: string;
  owner: User;
  date: number;
  status?: STATUS;
  amount: number;
  description: string;
  comments?: Comment[];
};

export type CommentFormModel = {
  content: string;
};

export type Emoji = {
  id: number | string;
  emoji: string;
  emojiGroupId: number | string;
};

export type GroupEmoji = {
  id: number | string;
  emojiRepresent: string | React.FC<React.SVGAttributes<SVGElement>>;
  name?: string;
};
