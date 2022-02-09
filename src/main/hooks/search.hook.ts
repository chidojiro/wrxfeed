import { useCallback, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { GlobalSearchType, searchState } from '@main/states/search.state';
import { SearchResult } from '@main/types';
import { Category, Department, Vendor } from '@main/entity';
import { SearchFilters, TargetPropType } from '@api/types';
import { SearchTypes } from '@auth/types';

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
}: SearchFilters): SearchHookValues {
  const globalSearch: GlobalSearchType = useRecoilValue<GlobalSearchType>(searchState);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [noResult, setNoResult] = useState<boolean>(false);

  const onClear = () => setResults([]);

  const searchByKeyword = useCallback(async () => {
    if (ignoreEmptyKeyword && keyword.trim().length < 1) return;

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
          return [
            ...arr,
            {
              id: `${TargetPropType.DEPARTMENT.toUpperCase()}-${dept?.id}`,
              title: dept?.name,
              type: TargetPropType.DEPARTMENT,
              directoryId: dept?.id,
              name: 'ss',
            },
          ];
        }, []);

    const categories: SearchResult[] = !searchCate
      ? []
      : globalSearch.categories.reduce<SearchResult[]>((arr: SearchResult[], cat: Category) => {
          if (!cat.name.toLowerCase().includes(keyword.toLowerCase())) {
            return arr;
          }
          return [
            ...arr,
            {
              id: `${TargetPropType.CATEGORY.toUpperCase()}-${cat?.id}`,
              title: cat?.name,
              type: TargetPropType.CATEGORY,
              directoryId: cat?.id,
              name: 'ss',
            },
          ];
        }, []);

    const vendors: SearchResult[] = !searchVend
      ? []
      : globalSearch.vendors.reduce<SearchResult[]>((arr: SearchResult[], vend: Vendor) => {
          if (!vend.name.toLowerCase().includes(keyword.toLowerCase())) {
            return arr;
          }
          return [
            ...arr,
            {
              id: `${TargetPropType.VENDOR.toUpperCase()}-${vend?.id}`,
              title: vend?.name,
              type: TargetPropType.VENDOR,
              directoryId: vend?.id,
              name: 'ss',
            },
          ];
        }, []);

    const sumResult = [...departments, ...categories, ...vendors];
    setResults(sumResult);
    setNoResult(sumResult.length === 0);
    setLoading(false);
  }, [keyword, searchDept, globalSearch, searchCate, searchVend, ignoreEmptyKeyword, searchType]);

  useEffect(() => {
    searchByKeyword().then();
  }, [searchByKeyword]);

  return { isLoading, results, onClear, noResult };
}
