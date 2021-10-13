/* eslint-disable react/no-danger */
import React from 'react';

interface TokenizedTextProps {
  children?: string;
  className?: string;
}

const TokenizedText: React.FC<TokenizedTextProps> = ({ children, className }) => {
  return (
    <p
      className={`text-sm text-Gray-1 ${className}`}
      dangerouslySetInnerHTML={{ __html: children || '' }}
    />
  );
};

TokenizedText.defaultProps = {
  children: '',
  className: '',
};

export default React.memo(TokenizedText);
