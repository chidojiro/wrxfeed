import { EMPTY_VENDOR_DESCRIPTION, VendorDescription } from '@/main/entity';
import { atom } from 'recoil';

export const vendorUpdateState = atom<VendorDescription>({
  key: 'detail-views/vendor-update',
  default: EMPTY_VENDOR_DESCRIPTION,
});
