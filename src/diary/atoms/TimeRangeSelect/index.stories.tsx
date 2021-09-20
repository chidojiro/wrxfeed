import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { TextFieldProps } from '@mui/material/TextField';
import TimeRangeSelect from '.';

export default {
  title: 'Atoms/TimeRangeSelect',
  component: TimeRangeSelect,
} as Meta;

const Template: Story<TextFieldProps> = () => {
  const [value, setValue] = React.useState('');
  const handleChange: TextFieldProps['onChange'] = (event) => {
    setValue(event.target.value as string);
  };
  return <TimeRangeSelect value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = { value: '' };
