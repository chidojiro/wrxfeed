import React from 'react';
import { Discussion } from '@main/entity';
import CommentText from '@main/atoms/CommentText';
import { formatDate } from '@common/utils';
import PostTag from './PostTag';

export type TextBoldProps = {
  style?: React.CSSProperties;
  text?: string;
};

const TextBold: React.FC<TextBoldProps> = ({ text, style }) => {
  if (!text) return null;
  return (
    <p className="flex text-gray-2 text-sm font-bold" style={style}>
      {`${text}`}
    </p>
  );
};

export interface DiscussionItemProps {
  discussion: Discussion;
  index?: number;
}

const DiscussionItem: React.VFC<DiscussionItemProps> = ({ discussion, index }) => {
  // const setTransactionModalState = useSetRecoilState(showTransactionModalState);
  // console.log('Check discussion = ', discussion);
  // const { redirect } = useNavUtils();

  const { content, user, transaction } = discussion;
  // console.log('Check createdAt = ', createdAt);
  // const interleaveBackground = index % 2 === 0 ? '#f9f9f9' : '#ffffff';

  const onClickDiscussion = () => {
    // redirect(Routes.Overview.path); not now
    // if (!transaction) {
    //   toast.error('Cannot show details of this transaction, please try it later!');
    //   return;
    // }
    // setTransactionModalState({ transaction });
  };

  return (
    <div className="flex mb-4 bg-white drop-shadow-md">
      <button
        onClick={onClickDiscussion}
        type="button"
        className="flex flex-1 w-full justify-start"
      >
        <div className="flex flex-col w-full min-h-24 px-4 py-3">
          <div className="flex flex-row items-center">
            <TextBold text={user.fullName} />
            <div className="flex text-xs text-Gray-1 my-1 mx-1">{' mentioned you in '}</div>
            <PostTag transaction={transaction} index={index} />
            <p className="flex text-xs text-Gray-4 ml-auto">{formatDate(discussion.createdAt)}</p>
          </div>
          <div className="flex mt-2">
            {/* <div className="flex flex-row items-top mt-2">
              <p className="flex text-xs font-semibold text-gray-1">{` ${user.fullName} `}</p>
              <p className="flex text-xs mx-0.5 text-gray-3">{' • '}</p>
              <p className="flex text-xs text-gray-3">{formatDate(createdAt)}</p>
            </div> */}
            <div className="flex flex-1 items-center text-left">
              <CommentText content={content} />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default DiscussionItem;
