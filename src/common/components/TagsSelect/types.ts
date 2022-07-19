import { PopoverProps } from '../Popover/Popover';
import { Children, ClassName, OpenClose, ValueChangeProps } from '../../types';
import { TagProps } from './Tag';

export type TagsSelectProps<T = string> = ClassName &
  Children &
  OpenClose &
  ValueChangeProps<T[]> &
  Pick<PopoverProps, 'placement'> & {
    placeholder: React.ReactNode;
    trigger?: React.ReactNode;
    ref?: any;
  };

export type Option<T = string> = {
  value: T;
  tagProps: Omit<TagProps, 'onRemoveClick'>;
};
