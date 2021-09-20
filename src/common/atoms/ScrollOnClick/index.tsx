import React from 'react';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

export interface ScrollToProps {
  anchorSelector: string;
}

const ScrollOnClick: React.FC<ScrollToProps> = ({ children, anchorSelector }) => {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const handleClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    (event) => {
      const anchor = (event.currentTarget.ownerDocument || document).querySelector(anchorSelector);
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    [anchorSelector],
  );

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
};

export default ScrollOnClick;
