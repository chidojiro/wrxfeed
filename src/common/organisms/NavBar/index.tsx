import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { UserRole } from '@identity/constants';
import { Profile } from '@auth/types';

import { useIdentity, usePermission } from '@identity/hooks';
import { profileState } from '@auth/containers/ProfileEditForm/states';

import NavBarStatic from '../NavBarStatic';

const NavBar: React.VFC = () => {
  const identity = useIdentity();
  const { roles } = usePermission();
  const isAdmin = roles?.includes(UserRole.ADMIN);

  const profile = useRecoilValue(profileState);
  const [profileUser] = useState<Profile>(profile);

  return (
    <NavBarStatic
      companyName={identity?.company?.name || '...'}
      userAva={profileUser?.avatar}
      userName={profileUser?.fullName}
      userEmail={profileUser?.email}
      showAva
      showNoti
      showInvite={isAdmin}
    />
  );
};

export default NavBar;
