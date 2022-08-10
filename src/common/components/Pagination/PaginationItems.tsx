import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Children, ClassName, HTMLDivProps } from '@/common/types';
import React from 'react';
import { PaginationContext } from './Pagination';
import { Button } from '../Button';

type PaginationItemProps = ClassName & Children & { as?: any } & Record<string, any>;

const PaginationItem = ({ className, as: As = Button, ...restProps }: PaginationItemProps) => {
  return (
    <As
      {...restProps}
      className={clsx(
        'relative inline-flex items-center px-4 py-2 text-sm font-medium bg-white border border-Gray-5 hover:bg-Gray-12',
        className,
      )}
    ></As>
  );
};

type PaginationItemsProps = HTMLDivProps;

export const PaginationItems = ({ className, ...restProps }: PaginationItemsProps) => {
  const { items } = React.useContext(PaginationContext);

  return (
    <nav
      className={clsx('relative z-0 inline-flex -space-x-px rounded-md', className)}
      aria-label="Pagination"
      {...restProps}
    >
      {items.map(({ page, selected, type, onClick, disabled }, idx) => {
        if (type === 'previous')
          return (
            <PaginationItem
              disabled={disabled}
              className="px-2 rounded-l-md"
              key={type}
              onClick={onClick}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </PaginationItem>
          );

        if (type === 'next')
          return (
            <PaginationItem
              disabled={disabled}
              className="px-2 rounded-r-md"
              key={type}
              onClick={onClick}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </PaginationItem>
          );

        if (type === 'ellipsis')
          return (
            <PaginationItem as="span" className="hover:bg-white" key={'ellipsis' + idx}>
              ...
            </PaginationItem>
          );

        return (
          <PaginationItem
            key={page}
            aria-current={selected && 'page'}
            onClick={onClick}
            className={clsx({
              '!text-white !bg-Accent-2 z-10': selected,
            })}
          >
            {page}
          </PaginationItem>
        );
      })}
    </nav>
  );
};
