import React from 'react';
// import Text from '@mui/material/Typography';
// import { PostDiscussion } from './dummy';

export type DiscussionSimple = {
  discussionId: string | number;
  commentBy: string;
  postName: string;
  time: string;
  content: string;
};

export const dummyDiscussionSimple: DiscussionSimple[] = [
  {
    discussionId: 0,
    commentBy: 'Graham Miller',
    postName: 'Gusto Pay* Arrow',
    time: 'Today at 6:00 AM',
    content: 'looping you in.',
  },
  {
    discussionId: 1,
    commentBy: 'Dzuy Linh and Matt Lock',
    postName: 'Google Analytics-Adservices',
    time: 'Today at 2:00 PM',
    content: 'of course! We’ll ramp up for the Q4 push.',
  },
  {
    discussionId: 2,
    commentBy: 'Alex Sivilay',
    postName: 'LA Brea Av3016865252',
    time: 'Yesterday at 3:30 PM ',
    content: 'for visibility',
  },
  {
    discussionId: 3,
    commentBy: 'Several people',
    postName: 'American AIR0012185711384',
    time: '2d ago',
    content: 'Yes the airfare is best for for 10/10 with American.',
  },
  {
    discussionId: 4,
    commentBy: 'Matt Lock',
    postName: 'Linh & Sivilay PC-CPA',
    time: 'Yesterday at 3:30 PM ',
    content: 'This is for the tax consultancy.',
  },
  {
    discussionId: 5,
    commentBy: 'Matt Lock',
    postName: 'Linh & Sivilay PC-CPA',
    time: 'Yesterday at 3:30 PM ',
    content: 'This is for the tax consultancy.',
  },
  {
    discussionId: 6,
    commentBy: 'Matt Lock',
    postName: 'Linh & Sivilay PC-CPA',
    time: 'Yesterday at 3:30 PM ',
    content: 'This is for the tax consultancy.',
  },
  {
    discussionId: 7,
    commentBy: 'Matt Lock',
    postName: 'Linh & Sivilay PC-CPA',
    time: 'Yesterday at 3:30 PM ',
    content: 'This is for the tax consultancy.',
  },
  {
    discussionId: 8,
    commentBy: 'Matt Lock',
    postName: 'Linh & Sivilay PC-CPA',
    time: 'Yesterday at 3:30 PM ',
    content: 'This is for the tax consultancy.',
  },
  {
    discussionId: 9,
    commentBy: 'Matt Lock',
    postName: 'Linh & Sivilay PC-CPA',
    time: 'Yesterday at 3:30 PM ',
    content: 'This is for the tax consultancy.',
  },
  {
    discussionId: 10,
    commentBy: 'Matt Lock',
    postName: 'Linh & Sivilay PC-CPA',
    time: 'Yesterday at 3:30 PM ',
    content: 'This is for the tax consultancy.',
  },
];

export type TextBoldProps = {
  text: string;
};

const TextBold: React.FC<TextBoldProps> = ({ text }) => (
  <p
    style={{
      display: 'flex',
      color: '#273240',
      fontSize: 14,
      fontWeight: 'bold',
      lineHeight: '18px',
      margin: 0,
    }}
  >
    {`${text}`}
  </p>
);

export type DiscussionListProps = {
  data?: DiscussionSimple[];
  style?: React.CSSProperties;
};

// const defaultProps: DiscussionListProps = {
//   data: [],
//   style: {},
// };

const DiscussionList: React.FC<DiscussionListProps> = ({
  data = dummyDiscussionSimple,
  style,
  children,
}) => {
  return (
    <div style={{ ...style, marginTop: 70 }}>
      {data.map((item: DiscussionSimple, index: number) => {
        const { commentBy, discussionId, postName, time, content } = item;
        const interleaveBackground = index % 2 === 0 ? '#f9f9f9' : '#ffffff';
        return (
          <div
            key={discussionId}
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: 100,
              borderTopColor: 'rgba(15, 13, 21, 0.3)',
              borderTopWidth: 1,
              borderTopStyle: 'groove',
              padding: '8px',
              backgroundColor: interleaveBackground,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <TextBold text={commentBy} />
              <p
                style={{
                  display: 'flex',
                  color: '#9EA0AA',
                  fontSize: 14,
                  lineHeight: '18px',
                  margin: 0,
                  marginLeft: 4,
                  marginRight: 4,
                }}
              >
                {' mentioned you in '}
              </p>
              <TextBold text={postName} />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
                paddingLeft: 64,
              }}
            >
              <p
                style={{
                  display: 'flex',
                  fontSize: 14,
                  lineHeight: '17px',
                  margin: 0,
                  fontWeight: 600,
                  color: '#0F0D15',
                }}
              >
                {`${commentBy} `}
              </p>
              <p
                style={{
                  display: 'flex',
                  fontSize: 12,
                  lineHeight: '15px',
                  margin: 0,
                  color: '#9EA0AA',
                  marginLeft: 4,
                }}
              >
                {` • ${time}`}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 8,
                paddingLeft: 76,
              }}
            >
              <div
                style={{
                  width: 2,
                  height: 19,
                  borderRadius: 2,
                  backgroundColor: '#2D91AB',
                  marginRight: 8,
                }}
              />
              <p
                style={{
                  display: 'flex',
                  fontSize: 14,
                  lineHeight: '18px',
                  margin: 0,
                  backgroundColor: '#DEE6FF',
                  marginRight: 4,
                  padding: '2px 4px 2px 4px',
                  borderRadius: 4,
                  color: '#6565FB',
                }}
              >
                {`@${commentBy} `}
              </p>
              <p
                style={{
                  display: 'flex',
                  fontSize: 16,
                  lineHeight: '19px',
                  margin: 0,
                  color: '#273240',
                }}
              >
                {` ${content}`}
              </p>
            </div>
          </div>
        );
      })}
      {children}
    </div>
  );
};

// DiscussionList.defaultProps = defaultProps;

export default DiscussionList;
