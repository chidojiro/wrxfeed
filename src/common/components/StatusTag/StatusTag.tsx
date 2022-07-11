import { Children, ClassName } from '@/common/types';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';

export type StatusTagColorScheme = 'green' | 'yellow' | 'purple';

export type StatusTagProps = Children &
  ClassName & {
    colorScheme: StatusTagColorScheme;
  };

const Color: Record<StatusTagColorScheme, { background: string; text: string; dot: string }> = {
  green: { dot: 'bg-Green-400', background: 'bg-Green-8', text: 'text-Green-800' },
  yellow: { dot: 'bg-yellow-2', background: 'bg-yellow-1', text: 'text-yellow-3' },
  purple: { dot: 'bg-Accent-6', background: 'bg-Accent-5', text: 'text-Accent-7' },
};

export const StatusTag: React.FC<StatusTagProps> = ({
  colorScheme,
  children,
  className,
}: StatusTagProps) => {
  const { background, text, dot } = Color[colorScheme];

  return (
    <div
      className={clsx(
        StringUtils.withProjectClassNamePrefix('status-tag'),
        'rounded-full py-0.5 px-2 w-[fit-content]',
        'flex items-center gap-2',
        background,
        className,
        text,
      )}
    >
      <div className={clsx('rounded-full w-1.5 h-1.5', dot)}></div>
      {children}
    </div>
  );
};
