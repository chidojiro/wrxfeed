import { ReactUtils } from '@/common/utils';
import { TableProps } from './types';

export type TableProviderValue = { tableProps: TableProps };

export const [TableProvider, useTableContext] = ReactUtils.createContext<TableProviderValue>();
