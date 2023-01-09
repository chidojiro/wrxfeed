import { ComponentMeta, ComponentStory } from '@storybook/react';
import clsx from 'clsx';
import { Divider } from './Divider';

export default {
  title: 'Divider',
  component: Divider,
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => {
  return <Divider className={clsx(args.direction === 'vertical' && 'h-full')} {...args}></Divider>;
};

export const Basic = Template.bind({});
Basic.args = {};
