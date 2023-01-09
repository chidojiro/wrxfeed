import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from './Input';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => {
  return <Input {...(args as any)}></Input>;
};

export const Basic = Template.bind({});
Basic.args = { variant: 'underline', error: false };
