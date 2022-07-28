import { UserRole } from '@/auth/constants';
import { useProfile } from '@/profile/useProfile';
import React from 'react';
import NavBarStatic from '../NavBarStatic';

const NavBar = () => {
  const { profile } = useProfile();
  const isAdmin = profile?.roles?.includes(UserRole.ADMIN);

  return (
    <NavBarStatic
      companyName={profile?.company?.name || '...'}
      userAva={profile?.avatar}
      userName={profile?.fullName}
      userEmail={profile?.email}
      showAva
      showNoti
      showInvite={isAdmin}
      searchBar
    />
  );
};

export default NavBar;
