import { ArrowUpIcon } from '@assets/index';
import { Fab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LightBG } from '@theme/colors';
import React from 'react';

interface ScrollToTopButtonProps {
  style?: React.CSSProperties;
  onClick: () => void;
  visible: boolean;
}

const useStyles = makeStyles(() => ({
  container: () => ({
    backgroundColor: LightBG,
    width: '48px',
    height: '48px',
    borderRadius: '24px',
    position: 'absolute',
    right: '16px',
    bottom: '16px',
    padding: '0px',
    fontSize: '0.875rem',
    fontWeight: 600,
    boxShadow: '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31)',
    '&.fadeOut': {
      opacity: 0,
      width: '0px',
      height: '0px',
      transition: 'width 0.5s 0.5s, height 0.5s 0.5s, opacity 0.5s',
    },
    '&.fadeIn': {
      opacity: 1,
      width: '48px',
      height: '48px',
      transition: 'width 0.5s, height 0.5s, opacity 0.5s 0.5s',
    },
  }),
}));

const ScrollToTopButton: React.VFC<ScrollToTopButtonProps> = ({ style, onClick, visible }) => {
  const classes = useStyles();
  return (
    <Fab
      className={`${classes.container} ${visible ? 'fadeIn' : 'fadeOut'}`}
      onClick={onClick}
      style={{
        ...style,
      }}
    >
      <ArrowUpIcon />
    </Fab>
  );
};

export default ScrollToTopButton;
