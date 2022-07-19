import React from 'react';
import { TableProps } from './types';

export type TableProviderValue = { tableProps: TableProps };

export const TableContext = React.createContext<TableProviderValue>({ tableProps: {} });
