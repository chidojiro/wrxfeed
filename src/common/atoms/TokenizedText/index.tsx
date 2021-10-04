import React from 'react';
import { styled, SxProps } from '@mui/system';
import { Typography, TypographyProps } from '@mui/material';
import { Accent } from '@theme/colors';

type TokenizedTextProps = TypographyProps & {
  children?: string;
  tokenFontSize?: string | number;
  sx?: SxProps;
};

const StyledTypography = styled(Typography)<TokenizedTextProps>(({ tokenFontSize }) => ({
  '.mention': {
    backgroundColor: Accent[3],
    color: Accent[2],
    borderRadius: 4,
    padding: '1px 4px 2px',
    fontSize: tokenFontSize || '0.875rem',
    cursor: 'pointer',
  },
}));

const TokenizedText: React.VFC<TokenizedTextProps> = ({ children, ...rest }) => {
  return <StyledTypography dangerouslySetInnerHTML={{ __html: children || '' }} {...rest} />;
};

export default React.memo(TokenizedText);
