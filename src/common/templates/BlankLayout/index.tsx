import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '../../atoms/Container';

export interface BlankLayoutProps {
  title: string;
}

const BlankLayout: React.FC<BlankLayoutProps> = ({ title, children }) => {
  return (
    <>
      <Container>
        <Typography component="h1" variant="h2">
          {title}
        </Typography>
        {children}
      </Container>
    </>
  );
};

export default BlankLayout;
