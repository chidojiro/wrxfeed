import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Tooltip } from './Tooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => {
  return (
    <Tooltip {...args} arrowClassName="hidden" trigger={<button>Hover on me</button>}>
      This is a Tooltip
    </Tooltip>
  );
};

export const Basic = Template.bind({});
Basic.args = {};
