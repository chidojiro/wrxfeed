import DirectoryItem from '@/main/molecules/DirectoryItem';
import { Vendor } from './types';
import mixpanel from 'mixpanel-browser';
import React from 'react';
import { useProfile } from '@/profile/useProfile';

type VendorListProps = {
  vendors: Vendor[];
  onVendorClick?: (dept: Vendor) => void;
};

export const VendorList: React.VFC<VendorListProps> = ({ vendors, onVendorClick }) => {
  const { profile } = useProfile();

  React.useEffect(() => {
    mixpanel.track('Vendor Directory View', {
      user_id: profile?.id,
      email: profile?.email,
      company: profile?.company?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className="flex flex-col space-y-6 px-0.5">
      {vendors.map((vendor) => (
        <li key={vendor.id} className="">
          <DirectoryItem item={vendor} onClick={() => onVendorClick?.(vendor)} itemType="vendors" />
        </li>
      ))}
    </ul>
  );
};
