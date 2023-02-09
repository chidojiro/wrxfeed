import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Radio } from './Radio';

export default {
  title: 'Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => {
  return <Radio {...args}></Radio>;
};

export const Basic = Template.bind({ label: 'Check' });
