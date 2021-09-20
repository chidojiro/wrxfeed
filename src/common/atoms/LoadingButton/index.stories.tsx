import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import LoadingButton, { LoadingButtonProps } from '.';
import { sleep } from '../../utils';

export default {
  title: 'Atoms/LoadingButton',
  component: LoadingButton,
} as Meta;

const Template: Story<LoadingButtonProps> = (args) => {
  const { loading = false } = args;
  const [isLoading, setIsLoading] = React.useState<boolean>(loading);
  const handleClick: React.MouseEventHandler = async () => {
    setIsLoading(true);
    await sleep(2000);
    setIsLoading(false);
  };

  return (
    <LoadingButton
      loading={isLoading}
      variant="contained"
      color="primary"
      size="large"
      onClick={handleClick}
    >
      Submit
    </LoadingButton>
  );
};

export const Default = Template.bind({});
Default.args = { loading: false };

export const Loading = Template.bind({});
Loading.args = { loading: true };
