import { ClassName } from '@/common/types';
import clsx from 'clsx';
import React from 'react';
import { Tag } from './Tag';
import { Option } from './types';

type SelectedTagsProps<T = string> = ClassName & {
  options: Option<T>[];
  value?: T[];
  onClick?: () => void;
  onRemoveClick: (value: T) => void;
};

export const SelectedTags = <T,>({
  value,
  options,
  className,
  onClick,
  onRemoveClick,
}: SelectedTagsProps<T>) => {
  const selectedOptions = options.filter((option) => value?.includes(option.value));

  return (
    <div className={clsx('flex items-center flex-wrap gap-1', className)} onClick={onClick}>
      {selectedOptions.map(({ value, tagProps }) => (
        <Tag
          key={(value as any).toString()}
          {...tagProps}
          onRemoveClick={() => onRemoveClick?.(value)}
        ></Tag>
      ))}
    </div>
  );
};
