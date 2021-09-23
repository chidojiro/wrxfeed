export type Post = {
  id: number | string;
  name: string;
  primaryColor?: string;
};

export enum DiscussionAction {
  MENTION = 'mentioned you in',
  COMMENT = 'commented on',
}

export type Discussion = {
  id: string | number;
  commentBy: string;
  action: DiscussionAction | string;
  post: Post;
  time: string;
  content: string;
};
