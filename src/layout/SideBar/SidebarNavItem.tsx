import { Children, ClassName } from '@/common/types';
import clsx from 'clsx';
import React from 'react';
import { Link, matchPath } from 'react-router-dom';

export type SidebarNavItemProps = ClassName &
  Children & {
    active?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    href: string;
    matches?: string[];
    activatable?: boolean;
  };

export const SidebarNavItem = ({
  iconLeft,
  iconRight,
  href,
  className,
  children,
  matches,
  activatable,
}: SidebarNavItemProps) => {
  const isActive = [...(matches ?? []), href].some((patchMatch) =>
    matchPath(location.pathname, {
      path: patchMatch,
      exact: true,
      strict: false,
    }),
  );

  return (
    <Link
      to={href}
      className={clsx(
        'relative',
        'pl-[42px] h-9 w-full',
        'flex items-center',
        'hover:bg-Gray-7 text-sm rounded-sm',
        { 'text-Accent-2 font-semibold': isActive },
        className,
      )}
    >
      <div className="flex items-center flex-1">
        <div className="flex items-center flex-1 pr-3 gap-4">
          <div className="w-5 h-5 flex items-center justify-center">{iconLeft}</div>
          {children}
          <div className="w-5 h-5 ml-auto flex items-center justify-center">{iconRight}</div>
        </div>
        {!!activatable && !!isActive && <div className="w-1 h-6 rounded-full bg-Accent-2" />}
      </div>
    </Link>
  );
};
