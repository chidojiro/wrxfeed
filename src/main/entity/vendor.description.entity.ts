export type VendorDescription = {
  vendorId?: number;
  vendorName?: string;
  website?: string;
  contactEmail?: string;
  contactNumber?: string;
  description?: string;
};

export const EMPTY_VENDOR_DESCRIPTION = {
  vendorId: undefined,
  vendorName: undefined,
  website: undefined,
  contactEmail: undefined,
  contactNumber: undefined,
  description: undefined,
};
