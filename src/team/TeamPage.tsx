import { RestrictedAccessPage } from '@/auth/RestrictedAccess';
import { OverlayLoader } from '@/common/components';
import { EMPTY_ARRAY } from '@/common/constants';
import { useHandler, useMountEffect, useUrlState } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { ApiErrorCode } from '@/error';
import { MainLayout } from '@/layout/MainLayout';
import { TargetCard } from '@/target/TargetCard';
import { usePrimaryTarget } from '@/target/usePrimaryTarget';
import { TransactionList } from '@/transactions/TransactionList';
import { useTransactions } from '@/transactions/useTransactions';
import dayjs from 'dayjs';
import { range } from 'lodash-es';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DepartmentApis } from './apis';
import { DEFAULT_SORT } from './constants';
import { TeamHeader } from './TeamHeader';
import { TeamTargetSummary } from './TeamTargetSummary';
import { TopCategories } from './TopCategories';
import { TimeRange } from './types';
import { useDepartment } from './useDepartment';
import { useTopCategories } from './useTopCategories';

const TRANSACTIONS_PER_PAGE = 10;
const DATE_FORMAT = 'YYYY-MM-DD';

export const TeamPage = () => {
  const [sortTransactionsBy, setSortTransactionsBy] = useUrlState(
    'sortTransactionsBy',
    DEFAULT_SORT,
  );
  const [transactionTimeRange, setTransactionTimeRange] =
    useUrlState<TimeRange>('transactionTimeRange');
  const [topCategoriesTimeRange, setTopCategoriesTimeRange] =
    useUrlState<TimeRange>('topCategoriesTimeRange');
  const { handle: viewDepartmentSummary } = useHandler((departmentId: number) =>
    DepartmentApis.viewSummary(departmentId),
  );

  const { id: departmentIdParam } = useParams() as Record<string, string>;
  const departmentId = +departmentIdParam;

  const { data: target, isValidating: isValidatingTarget, mutate } = usePrimaryTarget(departmentId);
  const [page, setPage] = useState<number>(1);

  const getFromDate = (timeRange: TimeRange) => {
    if (!timeRange || timeRange === 'last-30-days') {
      return dayjs().subtract(30, 'days').format(DATE_FORMAT);
    }

    if (timeRange === 'last-90-days') return dayjs().subtract(90, 'days').format(DATE_FORMAT);

    return dayjs().date(1).month(1).format(DATE_FORMAT);
  };

  const getToDate = () => dayjs().format(DATE_FORMAT);

  useMountEffect(() => {
    viewDepartmentSummary(departmentId);
  });

  const { transactions, isValidatingTransactions } = useTransactions({
    depId: +departmentIdParam,
    ...StringUtils.toApiSortParam(sortTransactionsBy ?? ''),
    limit: TRANSACTIONS_PER_PAGE * page,
    from: getFromDate(transactionTimeRange),
    to: getToDate(),
  });

  const { data: topCategories = EMPTY_ARRAY, isValidating: isValidatingTopCategories } =
    useTopCategories(departmentId, { from: getFromDate(topCategoriesTimeRange), to: getToDate() });

  const { data: department, error } = useDepartment(departmentId);

  const isForbidden = error?.code === ApiErrorCode.Forbidden;

  if (isForbidden)
    return (
      <MainLayout>
        <RestrictedAccessPage />
      </MainLayout>
    );

  const handleLoad = async () => {
    setPage(page + 1);
    return range(TRANSACTIONS_PER_PAGE);
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Department list</h1>
      <TeamHeader department={department} />
      <div className="grid grid-cols-9 gap-6 mt-6">
        <OverlayLoader loading={isValidatingTarget} className="col-span-9 lg:col-span-5">
          <TargetCard
            className="h-full"
            target={target}
            showColorfulHeading={false}
            onUpdateSuccess={(target) => mutate([target])}
            onDeleteSuccess={() => mutate()}
          />
        </OverlayLoader>
        <div className="col-span-9 lg:col-span-4 flex flex-col gap-6">
          <TeamTargetSummary departmentId={departmentId} />
          <OverlayLoader loading={isValidatingTopCategories}>
            <TopCategories
              timeRange={topCategoriesTimeRange}
              onTimeRangeChange={setTopCategoriesTimeRange}
              topCategories={topCategories}
            />
          </OverlayLoader>
        </div>
      </div>
      <TransactionList
        onLoad={handleLoad as any}
        transactions={transactions}
        loading={isValidatingTransactions}
        hiddenColumns={['depName']}
        className="mt-6"
        sort={sortTransactionsBy}
        onSortChange={setSortTransactionsBy}
        timeRange={transactionTimeRange}
        onTimeRangeChange={setTransactionTimeRange}
      />
    </MainLayout>
  );
};
