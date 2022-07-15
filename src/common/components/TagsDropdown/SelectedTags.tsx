import { ClassName, Option } from '@/common/types';
import clsx from 'clsx';
import React from 'react';
import { Tag, TagProps } from './Tag';

type SelectedTagsProps<T = string> = ClassName &
  Pick<TagProps, 'colorScheme'> & {
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
  colorScheme,
}: SelectedTagsProps<T>) => {
  const selectedOptions = options.filter((option) => value?.includes(option.value));

  return (
    <div className={clsx('flex gap-1', className)} onClick={onClick}>
      {selectedOptions.map(({ value, label }) => (
        <Tag
          colorScheme={colorScheme}
          key={(value as any).toString()}
          onRemoveClick={() => onRemoveClick?.(value)}
        >
          <div className="flex items-center gap-1">{label}</div>
        </Tag>
      ))}
    </div>
  );
};
