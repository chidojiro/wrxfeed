import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import ActivityItem, { ActivityItemProps } from '.';

export default {
  title: 'Molecules/ActivityItem',
  component: ActivityItem,
} as Meta;

const Template: Story<ActivityItemProps> = (args) => {
  const { model } = args;
  return <ActivityItem model={model} />;
};

export const Default = Template.bind({});
const model = {
  id: '1',
  time: '2021-06-15T01:21:03.368Z',
  tags: ['play', 'gog'],
  income: 100.0,
  outcome: 230.0,
  content: 'abc\ndef\nghi',
};
Default.args = { model };

export const TextOnly = Template.bind({});
const model2 = {
  id: '2',
  time: '2021-06-15T01:21:03.368Z',
  tags: [],
  income: 0,
  outcome: 0,
  content: 'abc\ndef\nghi',
};
TextOnly.args = { model: model2 };
