import { useApi } from '@/api';
import { useFetcher } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { useParams } from 'react-router-dom';

export const useTransactions = (id?: number, sortBy?: string) => {
  const { id: departmentIdParam, sortBy: sortTransactionsByParam } = useParams() as Record<
    string,
    string
  >;
  const api = useApi();

  const departmentId = id ?? +departmentIdParam;
  const sortTransactionsBy = sortBy ?? sortTransactionsByParam;

  return useFetcher(['transactions', departmentId, sortTransactionsBy], () => {
    const sort = sortTransactionsBy ? StringUtils.toApiSortQuery(sortTransactionsBy) : {};

    return api.getLineItems(departmentId, sort);
  });
};
