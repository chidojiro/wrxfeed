import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AvatarGroup } from './AvatarGroup';

export default {
  title: 'AvatarGroup',
  component: AvatarGroup,
} as ComponentMeta<typeof AvatarGroup>;

const Template: ComponentStory<typeof AvatarGroup> = (args) => {
  return <AvatarGroup {...args}></AvatarGroup>;
};

export const Basic = Template.bind({});
Basic.args = {
  items: [
    { fullName: 'John Doe' },
    { fullName: 'John Doe' },
    { fullName: 'John Doe' },
    { fullName: 'John Doe' },
    { fullName: 'John Doe' },
  ],
};

export const WithSrc = Template.bind({});
WithSrc.args = {
  items: [
    {
      fullName: 'John Doe',
      src: 'https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_960_720.jpg',
    },
    {
      fullName: 'John Doe',
      src: 'https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_960_720.jpg',
    },
    {
      fullName: 'John Doe',
      src: 'https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_960_720.jpg',
    },
    {
      fullName: 'John Doe',
      src: 'https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_960_720.jpg',
    },
    {
      fullName: 'John Doe',
      src: 'https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_960_720.jpg',
    },
  ],
};
