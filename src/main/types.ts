export type CommentFormModel = {
  content?: string;
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
