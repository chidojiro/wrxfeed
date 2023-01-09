import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Avatar } from './Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => {
  return <Avatar {...args}></Avatar>;
};

export const Basic = Template.bind({});
Basic.args = {
  fullName: 'John Doe',
  className: 'mt-10',
};

export const WithSrc = Template.bind({});
WithSrc.args = {
  fullName: 'John Doe',
  src: 'https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_960_720.jpg',
  className: 'mt-10',
};
