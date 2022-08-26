import { Category } from '@/main/entity';
import { PaginationParams } from '@/rest/types';
import { Spending } from '@/spending/types';

export type GetVendorsParams = PaginationParams;

export type Vendor = {
  id: number;
  name: string;
  avatar?: string;
  contactEmail?: string;
  contactNumber?: string;
  website?: string;
  description?: string;
  categories?: Category[];
};

export type UpdateVendorPayload = {
  website?: string;
  contactEmail?: string;
  contactNumber?: string;
  description?: string;
};

export type GetVendorSpendingsParams = {
  year?: number;
};

export type VendorSpendings = {
  curYearSpends: Spending[];
  prevYearSpends: Spending[];
};
