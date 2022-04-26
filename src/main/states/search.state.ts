import { atom } from 'recoil';
import { Category, Department, Vendor } from '@main/entity';

export type GlobalSearchType = {
  departments: Department[];
  categories: Category[];
  vendors: Vendor[];
  isLoaded?: boolean;
};

export const searchState = atom<GlobalSearchType>({
  key: 'main/search/global',
  default: {
    departments: [],
    categories: [],
    vendors: [],
  },
});
