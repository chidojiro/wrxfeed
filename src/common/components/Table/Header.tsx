import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';
import { Button, ButtonProps } from '../Button';
import { ConditionalWrapper } from '../ConditionalWrapper';
import { SortIcon } from './SortIcon';
import { useTableContext } from './TableContext';

export type Props = React.DetailedHTMLProps<
  React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
  HTMLTableHeaderCellElement
> & {
  sortKey?: string;
};

export const Header = ({ className, sortKey, children, ...restProps }: Props) => {
  const {
    tableProps: { sort, onSortChange },
  } = useTableContext();

  const order = ((): 'asc' | 'desc' | 'none' => {
    if (sort?.startsWith('-') && sort.slice(1) === sortKey) return 'desc';

    if (!sort?.startsWith('-') && sort === sortKey) return 'asc';

    return 'none';
  })();

  const handleClick = () => {
    if (!sortKey) return;

    if (order === 'asc' || order === 'none') return onSortChange?.('-' + sortKey);

    return onSortChange?.(sortKey);
  };

  return (
    <th
      {...restProps}
      className={clsx(
        StringUtils.withProjectClassNamePrefix('table-header'),
        'py-3 px-4',
        'font-semibold text-xs text-Gray-3 text-left',
        className,
      )}
    >
      <ConditionalWrapper
        conditions={[
          {
            condition: !!sortKey,
            component: (props: Partial<ButtonProps>) => <Button {...props} onClick={handleClick} />,
          },
        ]}
      >
        <div className="flex items-center gap-2">
          {children}
          {!!sortKey && <SortIcon order={order} />}
        </div>
      </ConditionalWrapper>
    </th>
  );
};
