import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';
import { Children, ClassName } from '../../types';
import { Body } from './Body';
import { Cell } from './Cell';
import { Footer } from './Footer';
import { Head } from './Head';
import { Header } from './Header';
import { Row } from './Row';
import { TableContext, TableProviderValue } from './TableContext';
import { TableProps } from './types';

export const Table = (props: TableProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, onSortChange: _, ...restProps } = props;
  const providerValue = React.useMemo<TableProviderValue>(() => ({ tableProps: props }), [props]);

  return (
    <TableContext.Provider value={providerValue}>
      <table
        {...restProps}
        className={clsx(
          StringUtils.withProjectClassNamePrefix('table'),
          'w-full border-collapse table-auto bg-white',
          className,
        )}
      ></table>
    </TableContext.Provider>
  );
};

const OverflowContainer = ({ children, className }: Children & ClassName) => (
  <div
    className={clsx(
      StringUtils.withProjectClassNamePrefix('table-overflow-container'),
      'max-w-full overflow-auto',
      'text-xs text-Gray-6',
      // display horizontal ring
      'p-px',
      className,
    )}
    style={{
      filter:
        'drop-shadow(0px 3px 5px rgba(9, 30, 66, 0.05)) drop-shadow(-1px 6px 8px rgba(6, 25, 56, 0.03))',
    }}
  >
    {children}
  </div>
);

Table.Head = Head;
Table.Body = Body;
Table.Footer = Footer;
Table.Row = Row;
Table.Cell = Cell;
Table.Header = Header;
Table.OverflowContainer = OverflowContainer;
