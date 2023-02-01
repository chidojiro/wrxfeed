import { GoogleProfile, Profile } from '@/profile/types';
import mixpanel from 'mixpanel-browser';

export const identifyMixPanelUserProfile = (profile?: Profile & GoogleProfile) => {
  mixpanel.identify(String(profile?.id));
  mixpanel.people.set({
    $name: profile?.fullName,
    $email: profile?.email,
    $company_name: profile?.company?.name,
    $company_id: profile?.company?.id,
    $user_id: profile?.id,
  });
};
