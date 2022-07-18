import { ReactUtils } from '../../utils';
import { TagsDropdownProps, Option } from './types';

export type TagsDropdownProviderValue<T = string> = {
  value: T[];
  onChange: (value: T[]) => void;
  addOption: (option: Option<T>) => void;
  TagsDropdownProps: TagsDropdownProps<T>;
  removeTag: (value: T) => void;
  addTag: (value: T) => void;
  search: string;
  setSearch: (value: string) => void;
  setSearchDebounced: (value: string) => void;
};

const [TagsDropdownProvider, useTagsDropdownContext] =
  ReactUtils.createContext<TagsDropdownProviderValue<any>>();

export { TagsDropdownProvider, useTagsDropdownContext };
