import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ActivitySearchDialog from '.';
import { ActivityFilterModel, TimeRange } from '../../types';

export default {
  title: 'Organisms/ActivitySearchDialog',
  component: ActivitySearchDialog,
} as Meta;

const Template: Story = () => {
  const [values, setValues] = React.useState<ActivityFilterModel>({
    text: '',
    tags: [],
    timeRange: TimeRange.ThisMonth,
    from: new Date('2018-07-03'),
    to: new Date('2021-07-03'),
    page: 1,
    pageSize: 10,
  });
  return (
    <ActivitySearchDialog
      values={values}
      onSubmit={(data) => {
        setValues(data);
      }}
    />
  );
};

export const Default = Template.bind({});
