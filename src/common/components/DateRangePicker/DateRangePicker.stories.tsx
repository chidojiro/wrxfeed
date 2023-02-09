import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DateRangePicker } from './DateRangePicker';

export default {
  title: 'DateRangePicker',
  component: DateRangePicker,
} as ComponentMeta<typeof DateRangePicker>;

const Template: ComponentStory<typeof DateRangePicker> = (args) => {
  return <DateRangePicker {...args}></DateRangePicker>;
};

export const Basic = Template.bind({});
Basic.args = {};
