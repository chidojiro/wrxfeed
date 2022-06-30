import { useApi } from '@/api';
import { useFetcher, useQuery } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { useParams } from 'react-router-dom';

export const useTransactions = (id?: number, sortBy?: string) => {
  const { id: departmentIdParam } = useParams() as Record<string, string>;

  const query = useQuery();
  const sortTransactionsByQuery = query.get('sortTransactionsBy');

  const api = useApi();

  const departmentId = id ?? +departmentIdParam;
  const sortTransactionsBy = sortBy ?? sortTransactionsByQuery;

  return useFetcher(['transactions', departmentId, sortTransactionsBy], () => {
    const sort = sortTransactionsBy ? StringUtils.toApiSortQuery(sortTransactionsBy) : {};

    return api.getLineItems(departmentId, sort);
  });
};
