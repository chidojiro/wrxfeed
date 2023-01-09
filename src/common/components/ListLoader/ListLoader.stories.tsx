import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ListLoader } from './ListLoader';

export default {
  title: 'ListLoader',
  component: ListLoader,
} as ComponentMeta<typeof ListLoader>;

const Template: ComponentStory<typeof ListLoader> = (args) => {
  return <ListLoader {...args}></ListLoader>;
};

export const Basic = Template.bind({});
Basic.args = { loading: true };
