export type User = {
  userId: string;
  name: string;
};

export type Comment = {
  commentId: number;
  content: string;
  owner: User;
};

export type PostDiscussion = {
  postId: number;
  personMentionYou: string;
  postName: string; // Gusto Pay* Arrow
  createTime: number; // 1632322675
  comment: Comment;
};

export const dummyPosts: PostDiscussion[] = [
  {
    postId: 0,
    personMentionYou: '',
    postName: '',
    createTime: 1632322675,
    comment: {
      commentId: 0,
      content: '',
      owner: {
        userId: 'user001',
        name: 'Gusto Pay* Arrow',
      },
    },
  },
  {
    postId: 0,
    personMentionYou: '',
    postName: '',
    createTime: 1632322675,
    comment: {
      commentId: 1,
      content: '',
      owner: {
        userId: 'user001',
        name: 'Gusto Pay* Arrow',
      },
    },
  },
];
