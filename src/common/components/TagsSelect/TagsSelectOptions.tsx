import { ClassName } from '@/common/types';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';
import { TagProps } from './Tag';
import { TagsSelectOption, TagsSelectOptionProps } from './TagsSelectOption';
import { useTagsSelectContext } from './TagsSelectProvider';

export type TagsSelectOption<T = string> = Omit<TagsSelectOptionProps<T>, 'addTag'> & {
  tagProps: Omit<TagProps, 'onRemoveClick'>;
  searchValue?: string;
};

type TagsSelectOptionsProps = ClassName & {
  options: TagsSelectOption[];
};

export const TagsSelectOptions = ({ className, options }: TagsSelectOptionsProps) => {
  const { value, addTag, search, registerOptions } = useTagsSelectContext();

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
