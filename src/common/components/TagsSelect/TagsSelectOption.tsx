import { useDelayableState } from '@/common/hooks';
import { Children, ClassName } from '@/common/types';
import clsx from 'clsx';
import { isEqual } from 'lodash-es';
import React from 'react';

export type TagsSelectOptionProps<T = string> = Children &
  ClassName & {
    value: T;
    icon?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    addTag: (value: T) => void;
    selected?: boolean;
  };

export const TagsSelectOption = React.memo(
  ({ children, value, className, icon, onClick, addTag, selected }: TagsSelectOptionProps<any>) => {
    const [delayableOpen, setDelayableOpen] = useDelayableState(0, false);

    React.useEffect(() => {
      setDelayableOpen(!!selected, !selected);
    }, [selected, setDelayableOpen]);

    if (!delayableOpen) return null;

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      onClick?.(e);
      addTag(value);
    };

    return (
      <button
        onClick={handleClick}
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
  (prev, next) => isEqual(prev, next),
);

TagsSelectOption.displayName = 'TagsSelectOption';
