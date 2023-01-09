import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Spinner } from './Spinner';

export default {
  title: 'Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => {
  return <Spinner {...args}></Spinner>;
};

export const Basic = Template.bind({});
Basic.args = {};
