import { useDelayableState } from '@/common/hooks';
import { Children, ClassName } from '@/common/types';
import clsx from 'clsx';
import React from 'react';
import { TagProps } from './Tag';
import { useTagsDropdownContext } from './TagsDropdownProvider';

export type TagsDropdownOptionProps<T = string> = Children &
  ClassName & {
    value: T;
    tagProps: Omit<TagProps, 'onRemoveClick'>;
    icon?: React.ReactNode;
    searchValue?: string;
  };

export const TagsDropdownOption = React.memo(
  ({
    children,
    value: valueProp,
    tagProps,
    className,
    icon,
    searchValue,
  }: TagsDropdownOptionProps<any>) => {
    const { value, addOption, addTag, search } = useTagsDropdownContext();
    const [delayableOpen, setDelayableOpen] = useDelayableState(0, false);

    React.useEffect(() => {
      addOption({ value: valueProp, tagProps });
    }, [addOption, tagProps, valueProp]);

    const isOpen = !value.includes(valueProp);

    React.useEffect(() => {
      setDelayableOpen(!!isOpen, !isOpen);
    }, [isOpen, setDelayableOpen]);

    if (
      !delayableOpen ||
      (searchValue && !searchValue.toLowerCase().includes(search.toLowerCase()))
    )
      return null;

    return (
      <button
        onClick={() => addTag(valueProp)}
        className={clsx(
          'text-left overflow-ellipsis h-10 px-7 text-xs hover:bg-Gray-12 w-full flex items-center gap-2 overflow-hidden',
          className,
        )}
      >
        <div className="flex-shrink-0">{icon}</div>
        {children}
      </button>
    );
  },
);

TagsDropdownOption.displayName = 'TagsDropdownOption';
