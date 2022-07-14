import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useApi } from '../../../api';
import { ProfileFormModel } from '../../types';
import MainLayout from '../../../common/templates/MainLayout';
import ProfileEditForm from '../../containers/ProfileEditForm';

const ProfilePage: React.FC = () => {
  const api = useApi();
  const handleSubmit: SubmitHandler<ProfileFormModel> = React.useCallback(
    async (data) => {
      await api.updateProfile(data);
      toast.success('Your profile has been updated.');
    },
    [api],
  );

  return (
    <MainLayout>
      <ProfileEditForm onSubmit={handleSubmit} />
    </MainLayout>
  );
};

export default ProfilePage;
