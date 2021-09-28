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
