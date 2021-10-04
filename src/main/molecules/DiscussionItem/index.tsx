import React from 'react';
import { Discussion } from '@main/entity';
import { Gray } from '@theme/colors';
import { Stack, Typography, Divider } from '@mui/material';
import CommentText from '@main/atoms/CommentText';
import { formatDate } from '@common/utils';
import { useNavUtils } from '@common/hooks';
import Routes from '@src/routes';
import PostTag from './PostTag';

export type TextBoldProps = {
  style?: React.CSSProperties;
  text?: string;
};

const TextBold: React.FC<TextBoldProps> = ({ text, style }) => {
  if (!text) return null;
  return (
    <Typography color={Gray[2]} fontSize="14px" fontWeight="bold" lineHeight="18px" style={style}>
      {`${text}`}
    </Typography>
  );
};

export interface DiscussionItemProps {
  discussion: Discussion;
  index: number;
}

const DiscussionItem: React.VFC<DiscussionItemProps> = ({ discussion, index }) => {
  const { redirect } = useNavUtils();

  const onClickDiscussion = () => {
    redirect(Routes.Overview.path);
  };

  const { content, createdAt, user, transaction } = discussion;
  const interleaveBackground = index % 2 === 0 ? '#f9f9f9' : '#ffffff';

  return (
    <div style={{ backgroundColor: interleaveBackground }}>
      <Divider />
      <button
        onClick={onClickDiscussion}
        type="button"
        style={{
          display: 'flex',
          flex: 1,
          width: '100%',
          borderRadius: '0px',
          justifyContent: 'flex-start',
          padding: '0px',
          margin: '0px',
          borderWidth: '0px',
          outline: 'none',
          backgroundColor: 'transparent',
        }}
      >
        <Stack flex={1} direction="column" minHeight="100px" padding="8px">
          <Stack direction="row" alignItems="center">
            <TextBold text={user.fullName} />
            <Typography color={Gray[2]} fontSize="14px" marginY="4px" marginX="4px" marginTop="4px">
              {' mentioned you in '}
            </Typography>
            <PostTag transaction={transaction} />
          </Stack>
          <Stack marginLeft="64px">
            <Stack direction="row" alignItems="center" marginTop="8px">
              <Typography color={Gray[1]} fontSize="14px" lineHeight="17px" fontWeight={600}>
                {` ${user.fullName} `}
              </Typography>
              <Typography color={Gray[3]} variant="body2" marginX="4px">
                {' • '}
              </Typography>
              <Typography color={Gray[3]} variant="body2">
                {formatDate(createdAt)}
              </Typography>
            </Stack>
            <Stack marginTop="8px" alignItems="left" style={{ textAlign: 'left' }}>
              <CommentText content={content} />
            </Stack>
          </Stack>
        </Stack>
      </button>
    </div>
  );
};

export default DiscussionItem;
