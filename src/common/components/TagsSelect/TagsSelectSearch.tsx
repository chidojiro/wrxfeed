import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';
import { Input, InputProps } from '../Input';
import { useTagsSelectContext } from './TagsSelectProvider';

type TagsSelectSearchProps = Omit<InputProps, 'value' | 'ref'> & {
  ref?: React.RefObject<HTMLInputElement>;
};

export const TagsSelectSearch = ({ className, onChange, ...restProps }: TagsSelectSearchProps) => {
  const { setSearch, search } = useTagsSelectContext();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
    onChange?.(e);
  };

  return (
    <Input
      {...restProps}
      autoFocus
      className={clsx(
        StringUtils.withProjectClassNamePrefix('tags-dropdown-search'),
        'mb-2 flex-shrink-0',
        className,
      )}
      value={search}
      onChange={handleChange}
    />
  );
};
