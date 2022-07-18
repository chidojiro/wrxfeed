import clsx from 'clsx';
import React from 'react';
import { Children, ClassName } from '../../types';

export type ColorScheme = 'orange' | 'accent' | 'cyan';

export type TagProps = Children &
  ClassName & {
    onClick?: () => void;
    onRemoveClick?: () => void;
    colorScheme: ColorScheme;
  };

const BackgroundByColorScheme: Record<ColorScheme, string> = {
  cyan: 'bg-cyan-1',
  accent: 'bg-accent-2',
  orange: 'bg-orange-1',
};

export const Tag = ({ children, className, onRemoveClick, colorScheme }: TagProps) => {
  return (
    <div
      className={clsx(
        'h-9 flex items-center gap-1 text-white px-2 py-1 rounded-sm',
        BackgroundByColorScheme[colorScheme],
        className,
      )}
    >
      {children}
      {!!onRemoveClick && (
        <button className="text-xs font-bold" onClick={onRemoveClick}>
          &times;
        </button>
      )}
    </div>
  );
};
