/* eslint-disable react/no-danger */
import React from 'react';

interface TokenizedTextProps {
  children?: string;
  className?: string;
  style?: React.CSSProperties;
}

const TokenizedText: React.FC<TokenizedTextProps> = ({ children, className, style }) => {
  return (
    <p
      className={`text-sm text-Gray-1 ${className}`}
      dangerouslySetInnerHTML={{ __html: children || '' }}
      style={style}
    />
  );
};

TokenizedText.defaultProps = {
  children: '',
  className: '',
  style: {},
};

export default React.memo(TokenizedText);
