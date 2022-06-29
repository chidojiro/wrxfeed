const toApiSortQuery = (sort: string): { sortBy: string; order: 'ASC' | 'DESC' } => {
  if (sort.startsWith('-')) return { sortBy: sort.slice(1), order: 'DESC' };

  return { sortBy: sort, order: 'DESC' };
};

export const StringUtils = {
  toApiSortQuery,
};
