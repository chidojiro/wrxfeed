import { Transaction } from '@main/entity';
import { transactionFilterState, transactionSelector } from '@main/states/transaction.state';
import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface TransactionHookValues {
  transactions: Transaction[];
}

export function useTransaction(): TransactionHookValues {
  const result = useRecoilValue(transactionSelector);
  const setRefreshFlag = useSetRecoilState(transactionFilterState);
  const refresh = useCallback(() => setRefreshFlag((flag) => ({ ...flag })), [setRefreshFlag]);
  // invalidate list when component is unmounted
  useEffect(() => refresh, [refresh]);
  return { transactions: result };
}
