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
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [noResult, setNoResult] = useState(false);

  const onClear = () => setResults([]);

  const searchByKeyword = useCallback(async () => {
    if (ignoreEmptyKeyword && keyword.trim().length < 1) return;

    if (searchType === SearchTypes.Api) {
      return;
    }

    setLoading(true);
    const departments = !searchDept
      ? []
      : globalSearch.departments
          .filter((dept: Department) => dept.name.toLowerCase().includes(keyword.toLowerCase()))
          .map((dept: Department) => {
            return {
              id: `${TargetPropType.DEPARTMENT.toUpperCase()}-${dept?.id}`,
              title: dept?.name,
              type: TargetPropType.DEPARTMENT,
              directoryId: dept?.id,
            };
          });
    const categories = !searchCate
      ? []
      : globalSearch.categories
          .filter((cat: Category) => cat.name.toLowerCase().includes(keyword.toLowerCase()))
          .map((cat: Category) => {
            return {
              id: `${TargetPropType.CATEGORY.toUpperCase()}-${cat?.id}`,
              title: cat?.name,
              type: TargetPropType.CATEGORY,
              directoryId: cat?.id,
            };
          });
    const vendors = !searchVend
      ? []
      : globalSearch.vendors
          .filter((vend: Vendor) => vend.name.toLowerCase().includes(keyword.toLowerCase()))
          .map((vend: Vendor) => {
            return {
              id: `${TargetPropType.VENDOR.toUpperCase()}-${vend?.id}`,
              title: vend?.name,
              type: TargetPropType.VENDOR,
              directoryId: vend?.id,
            };
          });
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
