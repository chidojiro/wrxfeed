import { Category } from '@/main/entity';
import { PaginationParams } from '@/rest/types';

export type GetVendorsParams = Partial<PaginationParams>;

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
