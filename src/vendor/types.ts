import { Category } from '@/main/entity';
import { PaginationParams } from '@/rest/types';

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
  website: string | null;
  contactEmail: string | null;
  contactNumber: string | null;
  description: string | null;
};

export type GetVendorSpendingsParams = {
  year?: number;
  groupBy?: 'CATEGORY' | 'DEPARTMENT';
};
