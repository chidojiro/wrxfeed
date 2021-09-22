import React from 'react';
import Text from '@mui/material/Typography';
// import tron from 'ReactotronConfig';
// import Reactotron from 'reactotron-react-js';
import MainLayout from '../../../common/templates/MainLayout';

type User = {
  userId: string;
  name: string;
};

type Comment = {
  commentId: number;
  content: string;
  owner: User;
};

type PostDiscussion = {
  postId: number;
  personMentionYou: string;
  postName: string; // Gusto Pay* Arrow
  createTime: number; // 1632322675
  comment: Comment;
};

const dummyPosts: PostDiscussion[] = [
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
      commentId: 0,
      content: '',
      owner: {
        userId: 'user001',
        name: 'Gusto Pay* Arrow',
      },
    },
  },
];

export interface MyDiscussionsProps {
  data: PostDiscussion[];
}

const MyDiscussions: React.FC<MyDiscussionsProps> = ({ data, children }) => {
  return (
    <div style={{ width: 100, height: 100, backgroundColor: 'red' }}>
      {data.map((item: PostDiscussion) => {
        const { postName, postId } = item;
        // Reactotron.warn(`Check postId = ${postId}`);
        return (
          <div key={postId}>
            <Text
              fontWeight={600}
              fontSize={14}
              paragraph
              style={{ marginLeft: 8, color: '#9EA0AA' }}
            >
              {postName}
            </Text>
          </div>
        );
      })}
      {children}
    </div>
  );
};

const DiscussionsPage: React.VFC = () => {
  return (
    <MainLayout title="Overview">
      <Text fontWeight={600} fontSize={30} paragraph>
        Discussions
      </Text>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '16px 32px 16px 0px',
        }}
      >
        <Text fontWeight={600} fontSize={14} paragraph>
          View
        </Text>
        <Text fontWeight={600} fontSize={14} paragraph style={{ marginLeft: 8, color: '#9EA0AA' }}>
          All
        </Text>
      </div>
      <MyDiscussions data={dummyPosts} />
    </MainLayout>
  );
};

export default DiscussionsPage;
