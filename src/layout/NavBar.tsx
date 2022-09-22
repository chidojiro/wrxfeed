import { useProfile } from '@/profile/useProfile';
import { NavBarStatic } from './NavBarStatic';

type NavBarProps = {
  mainLayout?: boolean;
};

export const NavBar = ({ mainLayout = true }: NavBarProps) => {
  const { profile } = useProfile();

  return (
    <NavBarStatic
      companyName={profile?.company?.name || '...'}
      userAva={profile?.avatar}
      userName={profile?.fullName}
      userEmail={profile?.email}
      showAva={mainLayout}
      showNoti={mainLayout}
      searchBar={mainLayout}
    />
  );
};
