import { useFetcher } from '@/common/hooks';
import { TargetApis } from '@/target/apis';
import { GetTargetSpendingParams } from '@/target/types';

export const useTargetSpending = (params: GetTargetSpendingParams) => {
  return useFetcher(!!params.props.length && ['targetSpending', params], () =>
    TargetApis.getSpending(params),
  );
};
