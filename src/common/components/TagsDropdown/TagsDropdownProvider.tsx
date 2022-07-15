import { Option } from '@/common/types';
import { ReactUtils } from '../../utils';
import { TagsDropdownProps } from './types';

export type TagsDropdownProviderValue<T = string> = {
  value: T[];
  onChange: (value: T[]) => void;
  addOption: (option: Option<T>) => void;
  TagsDropdownProps: TagsDropdownProps<T>;
  removeTag: (value: T) => void;
  addTag: (value: T) => void;
};

const [TagsDropdownProvider, useTagsDropdownContext] =
  ReactUtils.createContext<TagsDropdownProviderValue<any>>();

export { TagsDropdownProvider, useTagsDropdownContext };
