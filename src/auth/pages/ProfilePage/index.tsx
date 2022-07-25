import { ProfileApis } from '@/profile/apis';
import { UpdateProfilePayload } from '@/profile/types';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import MainLayout from '../../../common/templates/MainLayout';
import ProfileEditForm from '../../containers/ProfileEditForm';

const ProfilePage: React.FC = () => {
  const handleSubmit: SubmitHandler<UpdateProfilePayload> = React.useCallback(async (data) => {
    await ProfileApis.update(data);
    toast.success('Your profile has been updated.');
  }, []);

  return (
    <MainLayout>
      <ProfileEditForm onSubmit={handleSubmit} />
    </MainLayout>
  );
};

export default ProfilePage;
