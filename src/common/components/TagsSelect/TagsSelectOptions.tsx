import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';
import { TagsSelectOption } from './TagsSelectOption';
import { useTagsSelectContext } from './TagsSelectProvider';
import { TagsSelectOptionsProps } from './types';

export const TagsSelectOptions = ({ className, options }: TagsSelectOptionsProps) => {
  const { value, addTag, search, registerOptions, isOpen } = useTagsSelectContext();

  const filteredOptions = search
    ? options.filter(
        ({ searchValue }) =>
          !searchValue || searchValue.toLowerCase().includes(search.toLowerCase()),
      )
    : options;

  React.useEffect(() => {
    registerOptions(options ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, registerOptions]);

  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        StringUtils.withProjectClassNamePrefix('tags-select-options'),
        'overflow-auto flex-1',
        className,
      )}
    >
      {filteredOptions.map(({ value: optionValue, ...restProps }) => (
        <TagsSelectOption
          key={optionValue}
          value={optionValue}
          addTag={addTag}
          selected={!value.includes(optionValue)}
          {...restProps}
        />
      ))}
    </div>
  );
};
