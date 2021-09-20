import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import Revenue, { RevenueProps } from '.';

export default {
  title: 'Atoms/Revenue',
  component: Revenue,
} as Meta;

const Template: Story<RevenueProps> = (args) => {
  const { income, outcome } = args;
  return <Revenue income={income} outcome={outcome} />;
};

export const Positive = Template.bind({});
Positive.args = { income: 500, outcome: 200 };

export const Negative = Template.bind({});
Negative.args = { income: 100, outcome: 200 };
