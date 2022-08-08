import clsx from 'clsx';
import { Tag } from './Tag';
import { SelectedTagsProps } from './types';

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
