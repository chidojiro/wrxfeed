import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import ActivityList, { ActivityListProps } from '.';

export default {
  title: 'Organisms/ActivityList',
  component: ActivityList,
} as Meta;

const Template: Story<ActivityListProps> = (args) => {
  const { models } = args;
  return <ActivityList models={models} />;
};

export const Default = Template.bind({});
const models = [
  {
    id: '1',
    time: '2021-06-15T01:21:03.368Z',
    tags: ['play', 'gog'],
    income: 100.0,
    outcome: 0,
    content:
      'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\nmagnam aliquam quaerat voluptatem',
  },
  {
    id: '2',
    time: '2021-06-15T01:20:03.368Z',
    tags: ['play'],
    income: 0,
    outcome: 123.0,
    content: 'Nemo enim ipsam voluptatem',
  },
  {
    id: '3',
    time: '2021-06-15T01:19:03.368Z',
    tags: ['nec'],
    income: 0,
    outcome: 230.0,
    content: 'At vero eos et accusamus et iusto odio dignissimos\nut aut reiciendis voluptatibus ',
  },
  {
    id: '4',
    time: '2021-06-14T01:21:03.368Z',
    tags: ['play', 'gog'],
    income: 100.0,
    outcome: 0,
    content:
      'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\nmagnam aliquam quaerat voluptatem',
  },
  {
    id: '5',
    time: '2021-06-14T01:20:03.368Z',
    tags: ['play'],
    income: 0,
    outcome: 123.0,
    content: 'Nemo enim ipsam voluptatem',
  },
  {
    id: '6',
    time: '2021-06-13T01:19:03.368Z',
    tags: ['nec'],
    income: 0,
    outcome: 230.0,
    content: 'At vero eos et accusamus et iusto odio dignissimos\nut aut reiciendis voluptatibus ',
  },
];
Default.args = { models };
