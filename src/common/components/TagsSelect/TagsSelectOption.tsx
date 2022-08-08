import { useDelayableState } from '@/common/hooks';
import clsx from 'clsx';
import { isEqual } from 'lodash-es';
import React from 'react';
import { Button } from '../Button';
import { TagsSelectOptionProps } from './types';

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
      <Button
        onClick={handleClick}
        className={clsx(
          'text-left overflow-ellipsis h-10 px-7 text-xs hover:bg-Gray-12 w-full flex items-center gap-2 overflow-hidden',
          className,
        )}
      >
        <div className="flex-shrink-0">{icon}</div>
        {children}
      </Button>
    );
  },
  (prev, next) => isEqual(prev, next),
);

TagsSelectOption.displayName = 'TagsSelectOption';
