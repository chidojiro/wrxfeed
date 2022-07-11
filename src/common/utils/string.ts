import { PROJECT_CLASS_NAME_PREFIX } from '../constants';

const toApiSortQuery = (sort: string): { sortBy: string; order: 'ASC' | 'DESC' } => {
  if (sort.startsWith('-')) return { sortBy: sort.slice(1), order: 'DESC' };

  return { sortBy: sort, order: 'ASC' };
};

const getNameInitials = (name: string): string => {
  const nameStr = name;

  return nameStr
    .replace(' &', '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const withProjectClassNamePrefix = (...classNames: string[]) => {
  return [classNames]
    .flat()
    .map((className) => PROJECT_CLASS_NAME_PREFIX + className)
    .join(' ');
};

export const StringUtils = {
  toApiSortQuery,
  getNameInitials,
  withProjectClassNamePrefix,
};
