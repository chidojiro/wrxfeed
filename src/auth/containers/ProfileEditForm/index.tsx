import { useProfile } from '@/profile/useProfile';
import ProfileForm, { ProfileFormProps } from '../../organisms/ProfileForm';

export type ProfileEditFormProps = Omit<ProfileFormProps, 'defaultValues'>;

const ProfileEditForm = ({ onSubmit }: ProfileEditFormProps) => {
  const { profile } = useProfile();

  return <ProfileForm defaultValues={profile} onSubmit={onSubmit} />;
};

export default ProfileEditForm;
