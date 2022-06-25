/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { GlobalSearchType, searchState } from '@/main/states/search.state';
import { SearchResult } from '@/main/types';
import { Category, Department, Vendor } from '@/main/entity';
import { SearchFilters, TargetPropType } from '@/api/types';
import { getApiClient } from '@/api/utils';
import { SearchTypes } from '@/auth/types';
import { toast } from 'react-toastify';

const LIMIT = 2999;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

interface SearchHookValues {
  isLoading: boolean;
  results: SearchResult[];
  onClear: () => void;
  noResult: boolean;
}

export function useSearch({
  keyword,
  searchDept = true,
  searchCate = true,
  searchVend = true,
  ignoreEmptyKeyword = true,
  searchType = SearchTypes.Local,
  except = null,
}: SearchFilters): SearchHookValues {
  const [globalSearch, setGlobalSearch] = useRecoilState<GlobalSearchType>(searchState);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [noResult, setNoResult] = useState<boolean>(false);

  const onClear = () => setResults([]);

  const searchByKeyword = useCallback(async () => {
    if (isLoading || (ignoreEmptyKeyword && keyword.trim().length < 1)) return;

    if (searchType === SearchTypes.Api) {
      return;
    }

    setLoading(true);
    const departments: SearchResult[] = !searchDept
      ? []
      : globalSearch.departments.reduce<SearchResult[]>((arr: SearchResult[], dept: Department) => {
          if (!dept.name.toLowerCase().includes(keyword.toLowerCase())) {
            return arr;
          }
          const addItem: SearchResult = {
            id: `${TargetPropType.DEPARTMENT.toUpperCase()}-${dept?.id}`,
            title: dept?.name,
            type: TargetPropType.DEPARTMENT,
            directoryId: dept?.id,
          };
          if (except && except.filter((item) => item?.id === addItem?.id).length > 0) return arr;
          return [...arr, addItem];
        }, []);

    const categories: SearchResult[] = !searchCate
      ? []
      : globalSearch.categories.reduce<SearchResult[]>((arr: SearchResult[], cat: Category) => {
          if (!cat.name.toLowerCase().includes(keyword.toLowerCase())) {
            return arr;
          }
          const addItem: SearchResult = {
            id: `${TargetPropType.CATEGORY.toUpperCase()}-${cat?.id}`,
            title: cat?.name,
            type: TargetPropType.CATEGORY,
            directoryId: cat?.id,
          };
          if (except && except.filter((item) => item?.id === addItem?.id).length > 0) return arr;
          return [...arr, addItem];
        }, []);

    const vendors: SearchResult[] = !searchVend
      ? []
      : globalSearch.vendors.reduce<SearchResult[]>((arr: SearchResult[], vend: Vendor) => {
          if (!vend.name.toLowerCase().includes(keyword.toLowerCase())) {
            return arr;
          }
          const addItem: SearchResult = {
            id: `${TargetPropType.VENDOR.toUpperCase()}-${vend?.id}`,
            title: vend?.name,
            type: TargetPropType.VENDOR,
            directoryId: vend?.id,
          };
          if (except && except.filter((item) => item?.id === addItem?.id).length > 0) return arr;
          return [...arr, addItem];
        }, []);

    const sumResult = [...departments, ...categories, ...vendors];
    setResults(sumResult);
    setNoResult(sumResult.length === 0);
    setLoading(false);
  }, [
    isLoading,
    keyword,
    searchDept,
    globalSearch,
    searchCate,
    searchVend,
    ignoreEmptyKeyword,
    searchType,
    except,
  ]);

  async function fetchAllSearchData() {
    try {
      setLoading(true);
      const apiClient = await getApiClient();
      // eslint-disable-next-line prefer-const
      let [departments, categories, vendors] = await Promise.all([
        apiClient.getDepartments({
          ...INIT_PAGINATION,
          includeSub: 1,
        }),
        apiClient.getCategories(INIT_PAGINATION),
        apiClient.getVendors(INIT_PAGINATION),
      ]);

      setGlobalSearch({
        departments,
        categories,
        vendors,
        isLoaded: true,
      });
    } catch {
      toast.error('Fail to load global search data');
    } finally {
      setLoading(false);
      searchByKeyword();
    }
  }

  useEffect(() => {
    if (!globalSearch.isLoaded) {
      fetchAllSearchData();
    }
  }, []);

  useEffect(() => {
    searchByKeyword().then();
  }, [searchByKeyword]);

  return { isLoading, results, onClear, noResult };
}
