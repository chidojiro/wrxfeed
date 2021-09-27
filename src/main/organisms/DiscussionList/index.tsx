import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Gray, Accent } from '@theme/colors';
import Divider from '@mui/material/Divider';
import { dummyDiscussion } from './dummy';
import { Discussion } from './types';
import PostTag from './PostTag';

export type TextBoldProps = {
  style?: React.CSSProperties;
  text: string;
};

const TextBold: React.FC<TextBoldProps> = ({ text, style }) => (
  <Typography color={Gray[2]} fontSize="14px" fontWeight="bold" lineHeight="18px" style={style}>
    {`${text}`}
  </Typography>
);

export type DiscussionListProps = {
  data?: Discussion[];
  style?: React.CSSProperties;
};

const DiscussionList: React.FC<DiscussionListProps> = ({
  data = dummyDiscussion,
  style,
  children,
}) => {
  return (
    <Stack marginTop="70px" maxWidth="712px" style={style}>
      {data.map((item: Discussion, index: number) => {
        const { commentBy, id, post, time, content, action } = item;
        const interleaveBackground = index % 2 === 0 ? '#f9f9f9' : '#ffffff';
        return (
          <>
            <Divider />
            <Stack
              key={id}
              bgcolor={interleaveBackground}
              direction="column"
              minHeight="100px"
              padding="8px"
            >
              <Stack direction="row" alignItems="center">
                <TextBold text={commentBy} />
                <Typography color={Gray[2]} fontSize="14px" marginY="4px" marginTop="4px">
                  {` ${action} `}
                </Typography>
                <PostTag post={post} />
              </Stack>
              <Stack direction="row" alignItems="center" marginTop="8px" marginLeft="64px">
                <Typography color={Gray[1]} fontSize="14px" lineHeight="17px" fontWeight={600}>
                  {`${commentBy} `}
                </Typography>
                <Typography fontSize="12px" lineHeight="15px" marginLeft="4px" color={Gray[3]}>
                  {` • ${time}`}
                </Typography>
              </Stack>
              <Stack direction="row" marginTop="8px" paddingLeft="76px">
                <Stack
                  width="2px"
                  height="19px"
                  borderRadius="2px"
                  marginRight="8px"
                  style={{
                    backgroundColor: '#2D91AB',
                  }}
                />
                <Typography
                  fontSize="16px"
                  lineHeight="18px"
                  marginRight="4px"
                  borderRadius="4px"
                  bgcolor={Accent[3]}
                  style={{
                    padding: '2px 4px 2px 4px',
                    color: '#6565FB',
                  }}
                >
                  {`@${commentBy} `}
                </Typography>
                <Typography fontSize="16px" lineHeight="19px" color={Gray[2]}>
                  {` ${content}`}
                </Typography>
              </Stack>
            </Stack>
          </>
        );
      })}
      {children}
    </Stack>
  );
};

export default DiscussionList;
