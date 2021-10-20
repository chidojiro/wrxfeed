import React from 'react';
import { Transaction } from '@main/entity';
import { getNameAbbreviation } from '@main/utils';

export type PostTagProps = {
  style?: React.CSSProperties;
  index?: number;
  transaction: Transaction | undefined;
};

export const getRandomPostPrimaryColor = (index: number): string => {
  const randomColors: string[] = ['#2DABA3', '#FF5F68', '#3363FF', '#00D3E9'];
  // const colorSelect: string = randomColors[Math.floor(Math.random() * randomColors.length)];
  const colorSelect: string = randomColors[index % 4];
  return colorSelect;
};

const PostTag: React.FC<PostTagProps> = ({ style, transaction, index }) => {
  if (!transaction || !transaction.department) {
    return <div className="flex m-0 text-v text-gray-700">a transaction</div>;
  }
  const avatarPostColor = getRandomPostPrimaryColor(index || 0);
  return (
    <div className="flex flex-row items-center" style={style}>
      <div
        className="flex w-6 h-6 rounded-full justify-center items-center"
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
