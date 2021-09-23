import React from 'react';
import { Post } from './types';

export type PostTagProps = {
  style?: React.CSSProperties;
  post: Post;
};

export const getRandomPostPrimaryColor = (): string => {
  const randomColors: string[] = ['#2DABA3', '#FF5F68', '#3363FF', '#00D3E9'];
  const colorSelect: string = randomColors[Math.floor(Math.random() * randomColors.length)];
  return colorSelect;
};

export const getPostAbbreviation = (name: string): string => {
  const nameStr = name.replace(' &', '');
  return nameStr
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const PostTag: React.FC<PostTagProps> = ({ style, post }) => {
  const avatarPostColor = post?.primaryColor || getRandomPostPrimaryColor();
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
          {getPostAbbreviation(post?.name)}
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
        {`${post?.name}`}
      </p>
    </div>
  );
};

export default PostTag;
