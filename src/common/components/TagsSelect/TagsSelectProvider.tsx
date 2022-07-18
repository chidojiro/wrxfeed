import { ReactUtils } from '../../utils';
import { TagsSelectProps, Option } from './types';

export type TagsSelectProviderValue<T = string> = {
  value: T[];
  onChange: (value: T[]) => void;
  addOption: (option: Option<T>) => void;
  TagsSelectProps: TagsSelectProps<T>;
  removeTag: (value: T) => void;
  addTag: (value: T) => void;
  search: string;
  setSearch: (value: string) => void;
  setSearchDebounced: (value: string) => void;
};

const [TagsSelectProvider, useTagsSelectContext] =
  ReactUtils.createContext<TagsSelectProviderValue<any>>();

export { TagsSelectProvider, useTagsSelectContext };
