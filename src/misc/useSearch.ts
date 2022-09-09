import { EMPTY_ARRAY } from '@/common/constants';
import { useCategories } from '@/feed/useCategories';
import { SearchResult } from '@/main/types';
import { TargetTypeProp } from '@/target/types';
import { useDepartments } from '@/team/useDepartments';
import { useVendors } from '@/vendor/useVendors';
import React from 'react';

export type SearchFilters = {
  keyword: string;
  searchDept?: boolean;
  searchVend?: boolean;
  searchCate?: boolean;
  ignoreEmptyKeyword?: boolean;
};

const toSearchOptions = <T extends { id: number; name: string }>(
  items: T[],
  type: TargetTypeProp,
) =>
  items.map(
    ({ id, name }) =>
      ({
        id: `${type}-${id}`,
        title: name,
        type: type,
        directoryId: id,
      } as SearchResult),
  );

export const useSearch = ({
  keyword: keywordProp,
  searchDept = true,
  searchCate = true,
  searchVend = true,
  ignoreEmptyKeyword = true,
}: SearchFilters) => {
  const keyword = keywordProp.trim();

  const [results, setResults] = React.useState<SearchResult[]>([]);

  const { departments, isInitializingDepartments } = useDepartments({ includeSub: 1 });

  const { categories, isInitializingCategories } = useCategories();

  const { vendors, isInitializingVendors } = useVendors();

  const clearSearchResults = React.useCallback(() => setResults([]), []);

  const allOptions = React.useMemo(
    () =>
      [
        searchDept && toSearchOptions(departments, TargetTypeProp.DEPARTMENT),
        searchCate && toSearchOptions(categories, TargetTypeProp.CATEGORY),
        searchVend && toSearchOptions(vendors, TargetTypeProp.VENDOR),
      ]
        .filter((options): options is SearchResult[] => !!options)
        .flat(),
    [categories, departments, searchCate, searchDept, searchVend, vendors],
  );

  const searchByKeyword = React.useCallback(() => {
    if (ignoreEmptyKeyword && !keyword.length) return;

    const results = allOptions.filter(({ title }) =>
      title.toLowerCase().includes(keyword.toLocaleLowerCase()),
    );

    setResults(results);
  }, [allOptions, ignoreEmptyKeyword, keyword]);

  React.useEffect(() => {
    searchByKeyword();
  }, [searchByKeyword]);

  return React.useMemo(
    () => ({
      isLoading: isInitializingDepartments || isInitializingCategories || isInitializingVendors,
      results,
      clearSearchResults,
    }),
    [
      isInitializingCategories,
      isInitializingDepartments,
      isInitializingVendors,
      results,
      clearSearchResults,
    ],
  );
};
