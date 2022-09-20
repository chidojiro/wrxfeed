import { useProfile } from '@/profile/useProfile';
import ProfileForm, { ProfileFormProps } from '../../organisms/ProfileForm';

export type ProfileEditFormProps = Omit<ProfileFormProps, 'defaultValues'>;

const ProfileEditForm = ({ onSubmit }: ProfileEditFormProps) => {
  const { profile } = useProfile();

  if (!profile) return null;

  return (
    <ProfileForm
      defaultValues={{ ...profile, department: profile.department?.name }}
      onSubmit={onSubmit}
    />
  );
};

export default ProfileEditForm;
