import React from 'react';
import { format } from 'date-fns';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    color: theme.palette.grey['500'],
  },
  icon: {
    fontSize: '1.125rem',
    color: theme.palette.grey['500'],
    marginRight: '4px',
  },
}));

export interface TimeLabelProps {
  time: string;
}

const TimeLabel: React.VFC<TimeLabelProps> = ({ time }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AccessTimeIcon classes={{ root: classes.icon }} />
      <Typography variant="body2" className={classes.label}>
        {format(new Date(time), 'h:mm aaa')}
      </Typography>
    </div>
  );
};

export default TimeLabel;
