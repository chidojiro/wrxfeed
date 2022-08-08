import clsx from 'clsx';
import { Button } from '../Button';
import { TagColorScheme, TagProps } from './types';

export const TagBackgroundByColorScheme: Record<TagColorScheme, string> = {
  cyan: 'bg-cyan-1',
  accent: 'bg-Accent-2',
  orange: 'bg-orange-1',
};

export const Tag = ({ children, className, onRemoveClick, colorScheme, icon }: TagProps) => {
  return (
    <div
      className={clsx(
        'h-7 flex text-3xs items-center gap-2 text-white px-2 py-1 rounded-sm font-semibold overflow-hidden',
        TagBackgroundByColorScheme[colorScheme],
        className,
      )}
    >
      {!!icon && <div className="flex-shrink-0">{icon}</div>}
      {children}
      {!!onRemoveClick && (
        <Button className="text-xs font-bold" onClick={onRemoveClick}>
          &times;
        </Button>
      )}
    </div>
  );
};
