import { useCallback, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { LocalDatabase, searchState } from '@main/states/search.state';
import { SearchResult, SearchResultType } from '@main/types';
import { Category, Department, Vendor } from '@main/entity';

interface SearchHookValues {
  isLoading: boolean;
  results: SearchResult[];
  onClear: () => void;
  noResult: boolean;
}

export function useSearch(keyword: string): SearchHookValues {
  const localDb: LocalDatabase = useRecoilValue<LocalDatabase>(searchState);
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [noResult, setNoResult] = useState(false);

  const onClear = () => setResults([]);

  const searchByKeyword = useCallback(async () => {
    if (keyword.trim().length < 1) return;

    setLoading(true);
    const departments = localDb.departments
      .filter((dept: Department) => dept.name.toLowerCase().includes(keyword.toLowerCase()))
      .map((dept: Department) => {
        return {
          id: `Teams-${dept?.id}`,
          title: dept?.name,
          type: SearchResultType.Teams,
          directoryId: dept?.id,
        };
      });
    const categories = localDb.categories
      .filter((cat: Category) => cat.name.toLowerCase().includes(keyword.toLowerCase()))
      .map((cat: Category) => {
        return {
          id: `Categories-${cat?.id}`,
          title: cat?.name,
          type: SearchResultType.Categories,
          directoryId: cat?.id,
        };
      });
    const vendors = localDb.vendors
      .filter((vend: Vendor) => vend.name.toLowerCase().includes(keyword.toLowerCase()))
      .map((vend: Vendor) => {
        return {
          id: `Categories-${vend?.id}`,
          title: vend?.name,
          type: SearchResultType.Vendor,
          directoryId: vend?.id,
        };
      });
    const sumResult = [...departments, ...categories, ...vendors];
    setResults(sumResult);
    setNoResult(sumResult.length === 0);
    setLoading(false);
  }, [keyword, localDb]);

  useEffect(() => {
    searchByKeyword().then();
  }, [searchByKeyword]);

  return { isLoading, results, onClear, noResult };
}
