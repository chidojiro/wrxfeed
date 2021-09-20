import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import TagInput, { TagInputProps } from '.';

export default {
  title: 'Atoms/TagInput',
  component: TagInput,
  argTypes: { onChange: { action: 'onChange' } },
} as Meta;

const Template: Story<TagInputProps> = ({ options, loading, value, freeSolo, label }) => {
  const [selected, setSelected] = React.useState<string[] | undefined>(value);
  return (
    <TagInput
      value={selected}
      onChange={(event, newValue) => {
        setSelected(newValue);
      }}
      options={options}
      label={label}
      loading={loading}
      freeSolo={freeSolo}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Tags',
  value: ['abc', 'def'],
  options: ['abc', 'def', 'ghi'],
};

export const Creatable = Template.bind({});
Creatable.args = {
  value: ['abc', 'def'],
  options: ['abc', 'def', 'ghi'],
  freeSolo: true,
};

export const Loadable = Template.bind({});
Loadable.args = {
  value: ['abc', 'def'],
  options: [],
  loading: true,
};
