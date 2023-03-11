import { ComponentMeta, ComponentStory } from '@storybook/react';
import { EmptyState } from './EmptyState';

export default {
  title: 'EmptyState',
  component: EmptyState,
} as ComponentMeta<typeof EmptyState>;

const Template: ComponentStory<typeof EmptyState> = (args) => {
  return <EmptyState {...args}></EmptyState>;
};

export const Basic = Template.bind({});
Basic.args = { title: 'Hello', content: 'John Doe' };
