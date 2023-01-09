import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args}>Click</Button>;
};

export const Basic = Template.bind({});
Basic.args = { colorScheme: 'purple', variant: 'solid' };
