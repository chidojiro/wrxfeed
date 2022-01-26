import { atom, selector } from 'recoil';
import { getApiClient } from '@api/utils';
import { Category, Department, Vendor } from '@main/entity';

const LIMIT = 9999;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

export type LocalDatabase = {
  departments: Department[];
  categories: Category[];
  vendors: Vendor[];
};

export const searchState = atom<LocalDatabase>({
  key: 'main/search/local',
  default: selector({
    key: 'main/search/local/default',
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
