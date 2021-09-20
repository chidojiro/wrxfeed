import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { ConfirmProvider } from '../..';
import { useConfirm } from '../../hooks/useConfirm';

export default {
  title: 'Containers/ConfirmProvider',
  component: ConfirmProvider,
} as Meta;

export const Default: React.VFC = () => {
  const confirm = useConfirm();
  const handleClick = React.useCallback(async () => {
    await confirm();
  }, [confirm]);
  return (
    <button type="button" onClick={handleClick}>
      Show Dialog
    </button>
  );
};
