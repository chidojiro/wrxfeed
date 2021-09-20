import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TimeLabel from '../../atoms/TimeLabel';
import { Activity } from '../../types';
import ActivityMenu from '../ActivityMenu';
import { formatNumber } from '../../../common/utils';

const useStyles = makeStyles((theme) => ({
  content: () => ({
    marginBottom: theme.spacing(1),
    lineHeight: 1.8,
  }),
  income: () => ({
    color: theme.palette.success.main,
  }),
  outcome: () => ({
    color: theme.palette.error.main,
  }),
  tagItem: () => ({
    color: theme.palette.primary.main,
  }),
}));

export interface ActivityItemProps {
  model: Activity;
}

const ActivityItem: React.VFC<ActivityItemProps> = ({ model }) => {
  const classes = useStyles();
  const html = model.content.replace('\n', '<br/>');

  return (
    <>
      <Grid container justifyContent="space-between" spacing={0}>
        <TimeLabel time={model.time} />
        <ActivityMenu activity={model} />
      </Grid>
      <Typography
        dangerouslySetInnerHTML={{ __html: html }}
        variant="body1"
        className={classes.content}
      />
      <Grid container justifyContent="space-between" spacing={0}>
        <Box display="flex" columnGap={8}>
          {Boolean(model.income && model.income > 0) && (
            <Typography variant="body2" className={classes.income}>
              {formatNumber(model.income)}
            </Typography>
          )}
          {Boolean(model.outcome && model.outcome > 0) && (
            <Typography variant="body2" className={classes.outcome}>
              {formatNumber(model.outcome)}
            </Typography>
          )}
        </Box>
        <Box display="flex" columnGap={8}>
          {model.tags.map((tag) => (
            <Typography key={tag} variant="body2" className={classes.tagItem}>
              {`#${tag}`}
            </Typography>
          ))}
        </Box>
      </Grid>
    </>
  );
};

export default ActivityItem;
