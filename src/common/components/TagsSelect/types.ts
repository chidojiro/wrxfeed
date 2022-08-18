import { Children, ClassName, OpenClose, ValueChangeProps } from '../../types';
import { InputProps } from '../Input';
import { PopoverProps } from '../Popover/Popover';

export type TagsSelectProps<TValue = string> = ClassName &
  Children &
  OpenClose &
  ValueChangeProps<TValue[]> &
  Pick<PopoverProps, 'placement'> & {
    placeholder: React.ReactNode;
    trigger?: React.ReactNode;
    ref?: any;
    name?: string;
  };

export type SelectedTagsProps<T = string> = ClassName & {
  options: Option<T>[];
  value?: T[];
  onClick?: () => void;
  onRemoveClick: (value: T) => void;
};

export type Option<T = string> = {
  value: T;
  tagProps: Omit<TagProps, 'onRemoveClick'>;
};

export type TagsSelectOptionsProps = ClassName & {
  options: TagsSelectOption[];
};

export type TagsSelectOptionProps<T = string> = Children &
  ClassName & {
    value: T;
    icon?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    addTag: (value: T) => void;
    selected?: boolean;
  };

export type TagsSelectOption<T = string> = Omit<TagsSelectOptionProps<T>, 'addTag'> &
  ClassName & {
    tagProps: Omit<TagProps, 'onRemoveClick'>;
    searchValue?: string;
  };

export type TagColorScheme = 'orange' | 'accent' | 'cyan';

export type TagProps = Children &
  ClassName & {
    onClick?: () => void;
    onRemoveClick?: () => void;
    colorScheme: TagColorScheme;
    icon?: React.ReactNode;
  };

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

export type TagsSelectSearchProps = Omit<InputProps, 'value' | 'ref'> & {
  ref?: React.RefObject<HTMLInputElement>;
};
