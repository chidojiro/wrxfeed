import { atom, selector } from 'recoil';
import { getApiClient } from '@api/utils';
import { Category, Department, Vendor } from '@main/entity';

const LIMIT = 9999;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

export type GlobalSearchType = {
  departments: Department[];
  categories: Category[];
  vendors: Vendor[];
};

export const searchState = atom<GlobalSearchType>({
  key: 'main/search/global',
  default: selector({
    key: 'main/search/global/default',
    get: async () => {
      try {
        const apiClient = await getApiClient();
        const departments = await apiClient.getDepartments(INIT_PAGINATION);
        const categories = await apiClient.getCategories(INIT_PAGINATION);
        const vendors = await apiClient.getVendors(INIT_PAGINATION);

        return {
          departments,
          categories,
          vendors,
        };
      } catch {
        return {
          departments: [],
          categories: [],
          vendors: [],
        };
      }
    },
  }),
});
