import { PopoverProps } from './../Popover/Popover';
import { Children, ValueChangeProps } from '../../types';
import { TagProps } from './Tag';

export type TagsDropdownProps<T = string> = ValueChangeProps<T[]> &
  Children &
  Pick<PopoverProps, 'placement'> &
  Pick<TagProps, 'colorScheme'> & {
    placeholder: React.ReactNode;
  };
