import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import ActivityMenu, { ActivityMenuProps } from '.';

export default {
  title: 'Molecules/ActivityMenu',
  component: ActivityMenu,
} as Meta;

const Template: Story<ActivityMenuProps> = (args) => {
  const { activity } = args;
  return <ActivityMenu activity={activity} />;
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
Default.args = { activity: model };
