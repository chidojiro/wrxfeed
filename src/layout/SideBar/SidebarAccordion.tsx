import { Accordion } from '@/common/components/Accordion';
import { Children, ClassName } from '@/common/types';
import clsx from 'clsx';
import React from 'react';
import { ReactComponent as DownSmall } from '@/assets/icons/outline/down-small.svg';

export type SidebarAccordionProps = Children &
  ClassName & {
    iconLeft: React.ReactNode;
    iconRight?: React.ReactNode;
    label: React.ReactNode;
    defaultOpen?: boolean;
  };

export const SidebarAccordion = ({
  iconLeft,
  iconRight,
  label,
  children,
  className,
  defaultOpen = true,
}: SidebarAccordionProps) => {
  return (
    <Accordion defaultOpen={defaultOpen}>
      <Accordion.Button
        className={clsx(
          'pl-[42px] pr-4 h-9 w-full',
          'flex items-center',
          'text-sm rounded-sm',
          className,
        )}
      >
        {({ isOpen }) => (
          <div className="relative flex items-center flex-1 pr-3 gap-4">
            <DownSmall
              className={clsx(
                'w-4 h-4 absolute top-1/2 left-0 transform -translate-x-5 -translate-y-1/2',
                isOpen && 'rotate-180',
              )}
            />
            <div className="w-5 h-5 flex items-center justify-center">{iconLeft}</div>
            {label}
            <div className="w-5 h-5 ml-auto flex items-center justify-center">{iconRight}</div>
          </div>
        )}
      </Accordion.Button>
      <Accordion.Content>{children}</Accordion.Content>
    </Accordion>
  );
};
