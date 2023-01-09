import { ComponentMeta, ComponentStory } from '@storybook/react';
import clsx from 'clsx';
import { Drawer } from './Drawer';

export default {
  title: 'Drawer',
  component: Drawer,
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => {
  return <Drawer {...args}></Drawer>;
};

export const Basic = Template.bind({});
Basic.args = {
  open: true,
};
