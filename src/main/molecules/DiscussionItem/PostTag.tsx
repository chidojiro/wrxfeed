import { Transaction } from '@main/entity';
import React from 'react';
import { getNameAbbreviation } from '@main/utils';

export type PostTagProps = {
  style?: React.CSSProperties;
  transaction: Transaction | undefined;
};

export const getRandomPostPrimaryColor = (): string => {
  const randomColors: string[] = ['#2DABA3', '#FF5F68', '#3363FF', '#00D3E9'];
  const colorSelect: string = randomColors[Math.floor(Math.random() * randomColors.length)];
  return colorSelect;
};

const PostTag: React.FC<PostTagProps> = ({ style, transaction }) => {
  // console.log('Check transaction = ', transaction);
  if (!transaction || !transaction.department) {
    return <div className="flex m-0 text-v text-gray-700">a transaction</div>;
  }
  const avatarPostColor = getRandomPostPrimaryColor();
  return (
    <div className="flex flex-row items-center" style={style}>
      <div
        className="flex w-5 h-5 rounded-full justify-center items-center"
        style={{
          backgroundColor: avatarPostColor,
        }}
      >
        <p className="flex text-xs text-white font-bold">
          {getNameAbbreviation(transaction?.department?.name)}
        </p>
      </div>
      <p className="flex text-gray-700 text-sm font-bold ml-0.5">
        {`${transaction?.department?.name}`}
      </p>
    </div>
  );
};

export default PostTag;
