import React from 'react';
import { format } from 'date-fns';
import { styled } from '@mui/material/styles';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ActivityItem from '../../molecules/ActivityItem';
import { Activity } from '../../types';

const Panel = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const ItemDivider = styled(Divider)(({ theme }) => ({
  height: '1px',
  margin: `${theme.spacing(1)} 0`,
}));

export interface ActivityListProps {
  models: Activity[];
}

interface ActivityGroup {
  [key: string]: Activity[];
}

const ActivityList: React.VFC<ActivityListProps> = ({ models }) => {
  const dates = models.reduce((current, item) => {
    const date = format(new Date(item.time), 'EEE, d LLL, yyyy');
    const res = { ...current };
    if (!res[date]) res[date] = [];
    res[date].push(item);
    return res;
  }, {} as ActivityGroup);

  return (
    <>
      {Object.entries(dates).map(([date, activities]) => (
        <Panel key={date}>
          <Typography component="h4" variant="h4" gutterBottom>
            {date}
          </Typography>
          {activities.map((model, index) => (
            <React.Fragment key={model.id}>
              {index > 0 && <ItemDivider variant="middle" />}
              <ActivityItem model={model} />
            </React.Fragment>
          ))}
        </Panel>
      ))}
    </>
  );
};

export default ActivityList;
