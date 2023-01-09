import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ConfirmModal } from './ConfirmModal';

export default {
  title: 'ConfirmModal',
  component: ConfirmModal,
} as ComponentMeta<typeof ConfirmModal>;

const Template: ComponentStory<typeof ConfirmModal> = (args) => {
  return <ConfirmModal {...args}></ConfirmModal>;
};

export const Basic = Template.bind({});
Basic.args = {
  title: 'John Doe',
  confirmButtonLabel: 'Hello world',
  open: true,
};
