import classNames from 'classnames';
import React from 'react';
import { Children, ClassName } from '../../types';
import { withProjectClassNamePrefix } from '../../utils';
import { Body } from './Body';
import { Cell } from './Cell';
import { Footer } from './Footer';
import { Head } from './Head';
import { Header } from './Header';
import { Row } from './Row';

export type TableProps = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;

// eslint-disable-next-line @typescript-eslint/ban-types
type TableProviderValue = {};

export const TableContext = React.createContext<TableProviderValue>({});

export const Table = ({ className, ...restProps }: TableProps) => {
  const providerValue = React.useMemo<TableProviderValue>(() => ({}), []);

  return (
    <TableContext.Provider value={providerValue}>
      <table
        {...restProps}
        className={classNames(
          withProjectClassNamePrefix('table'),
          'w-full border-collapse table-auto bg-white',
          className,
        )}
      ></table>
    </TableContext.Provider>
  );
};

const OverflowContainer = ({ children, className }: Children & ClassName) => (
  <div
    className={classNames(
      withProjectClassNamePrefix('table-overflow-container'),
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
