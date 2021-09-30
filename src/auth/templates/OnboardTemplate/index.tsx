import React, { ReactNode, useState } from 'react';
import { Slide, SlideProps, Stack, Typography } from '@mui/material';

interface OnboardTemplateProps {
  title: string;
  description: string;
  formComponent: ReactNode;
  visible: boolean;
}

const OnboardTemplate: React.VFC<OnboardTemplateProps> = ({
  title,
  description,
  formComponent,
  visible,
}) => {
  const [direction, setDirection] = useState<SlideProps['direction']>('left');
  return (
    <Slide
      direction={direction}
      in={visible}
      mountOnEnter
      unmountOnExit
      onEntered={() => setDirection('right')}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        marginBottom={5}
        spacing={5}
        position="absolute"
        left={0}
        top={0}
        right={0}
        bottom={0}
      >
        <Typography
          fontSize="48px"
          fontWeight={600}
          textAlign="center"
          lineHeight="58px"
          color="#000"
          marginBottom={5}
        >
          {title}
        </Typography>
        <Typography
          fontSize="18px"
          fontWeight={600}
          textAlign="center"
          lineHeight="21.78px"
          color="#000"
        >
          {description}
        </Typography>
        {formComponent}
      </Stack>
    </Slide>
  );
};

export default OnboardTemplate;
