import { Transaction } from '@main/entity';
import React from 'react';

export type PostTagProps = {
  style?: React.CSSProperties;
  transaction: Transaction | undefined;
};

export const getRandomPostPrimaryColor = (): string => {
  const randomColors: string[] = ['#2DABA3', '#FF5F68', '#3363FF', '#00D3E9'];
  const colorSelect: string = randomColors[Math.floor(Math.random() * randomColors.length)];
  return colorSelect;
};

export const getPostAbbreviation = (name?: string): string => {
  if (!name) return '';
  const nameStr = name;
  return nameStr
    .replace(' &', '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const PostTag: React.FC<PostTagProps> = ({ style, transaction }) => {
  if (!transaction) {
    return (
      <p
        style={{
          display: 'flex',
          color: '#273240',
          fontSize: 14,
          lineHeight: '18px',
          margin: 0,
        }}
      >
        a transaction
      </p>
    );
  }
  const avatarPostColor = getRandomPostPrimaryColor();
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ...style }}>
      <div
        style={{
          display: 'flex',
          width: 20,
          height: 20,
          borderRadius: 20,
          backgroundColor: avatarPostColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            display: 'flex',
            fontSize: 11,
            lineHeight: '13px',
            color: '#FFFFFF',
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          {getPostAbbreviation(transaction.department.name)}
        </p>
      </div>
      <p
        style={{
          display: 'flex',
          color: '#273240',
          fontSize: 14,
          fontWeight: 'bold',
          lineHeight: '18px',
          margin: 0,
          marginLeft: 4,
        }}
      >
        {`${transaction.department.name}`}
      </p>
    </div>
  );
};

export default PostTag;
