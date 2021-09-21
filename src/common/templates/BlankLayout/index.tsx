import React from 'react';
import Typography from '@mui/material/Typography';
import { ContainerProps } from '@mui/material';
import Container from '@common/atoms/Container';

export interface BlankLayoutProps {
  title: string;
}

const BlankLayout: React.FC<BlankLayoutProps & ContainerProps> = ({ title, children, ...rest }) => {
  return (
    <>
      <Container {...rest}>
        <Typography component="h1" variant="h2">
          {title}
        </Typography>
        {children}
      </Container>
    </>
  );
};

export default BlankLayout;
