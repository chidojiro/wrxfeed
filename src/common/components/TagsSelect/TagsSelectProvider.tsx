import { ReactUtils } from '../../utils';
import { TagsSelectProps, Option } from './types';

export type TagsSelectProviderValue<T = string> = {
  value: T[];
  onChange: (value: T[]) => void;
  registerOptions: (option: Option<T>[]) => void;
  TagsSelectProps: TagsSelectProps<T>;
  removeTag: (value: T) => void;
  addTag: (value: T) => void;
  search: string;
  setSearch: (value: string) => void;
  isOpen: boolean;
};

const [TagsSelectProvider, useTagsSelectContext] =
  ReactUtils.createContext<TagsSelectProviderValue<any>>();

export { TagsSelectProvider, useTagsSelectContext };
