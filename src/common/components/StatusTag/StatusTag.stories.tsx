import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StatusTag } from './StatusTag';

export default {
  title: 'StatusTag',
  component: StatusTag,
} as ComponentMeta<typeof StatusTag>;

const Template: ComponentStory<typeof StatusTag> = (args) => {
  return <StatusTag {...args}></StatusTag>;
};

export const Basic = Template.bind({});
Basic.args = { colorScheme: 'green', children: 'Success' };
