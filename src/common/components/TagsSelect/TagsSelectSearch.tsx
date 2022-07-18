import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';
import { Input, InputProps } from '../Input';
import { useTagsSelectContext } from './TagsSelectProvider';

type TagsSelectSearchProps = Omit<InputProps, 'value' | 'ref'> & {
  ref?: React.RefObject<HTMLInputElement>;
};

export const TagsSelectSearch = ({ className, onChange, ...restProps }: TagsSelectSearchProps) => {
  const { setSearchDebounced } = useTagsSelectContext();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchDebounced(e.target.value);
    onChange?.(e);
  };

  return (
    <Input
      autoFocus
      {...restProps}
      className={clsx(
        StringUtils.withProjectClassNamePrefix('tags-dropdown-search'),
        'mb-2',
        className,
      )}
      onChange={handleChange}
    />
  );
};
