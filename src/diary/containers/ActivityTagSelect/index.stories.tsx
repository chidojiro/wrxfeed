import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ActivityTagSelect, { ActivityTagSelectProps } from '.';

export default {
  title: 'Containers/ActivityTagSelect',
  component: ActivityTagSelect,
  argTypes: { onChange: { action: 'onChange' } },
} as Meta;

const Template: Story<ActivityTagSelectProps> = () => {
  const [value, setValue] = React.useState<string[]>([]);
  return (
    <ActivityTagSelect
      value={value}
      onChange={(e, v) => {
        setValue(v);
      }}
    />
  );
};

export const Default = Template.bind({});
