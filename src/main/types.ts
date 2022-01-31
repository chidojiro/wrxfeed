import { TargetPropType } from '@api/types';
import { EditorState } from 'draft-js';

export type CommentFormModel = {
  content: EditorState;
  attachment?: string;
};

export type Emoji = {
  id: number | string | undefined;
  emoji: string;
  emojiGroupId?: number | string | undefined;
  name?: string;
};

export type GroupEmoji = {
  id: number | string;
  emojiRepresent: string | React.FC<React.SVGAttributes<SVGElement>>;
  name?: string;
};

export interface InviteFormModel {
  email: string;
}

export interface FeedBackFormModel {
  content: string;
}

export enum FeedBackType {
  Rollup = 1,
  LineItem = 2,
}

export type SearchResult = {
  id: number | string;
  title: string;
  type: TargetPropType;
  directoryId: number;
};
