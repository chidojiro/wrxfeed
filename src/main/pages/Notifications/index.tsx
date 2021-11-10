import React from 'react';
import MainLayout from '@common/templates/MainLayout';
import { TransactionModal } from '@main/organisms';
import DiscussionList from '../../organisms/DiscussionList';

const Notifications: React.VFC = () => {
  return (
    <MainLayout>
      <DiscussionList />
      <TransactionModal />
    </MainLayout>
  );
};

export default Notifications;
