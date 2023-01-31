import { RestrictedAccessPage } from '@/auth/RestrictedAccess';
import { OverlayLoader } from '@/common/components';
import { DEFAULT_ITEMS_PER_INFINITE_LOAD, EMPTY_ARRAY } from '@/common/constants';
import { useHandler, useMountEffect, useUrlState } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { ApiErrorCode } from '@/error';
import { DateRangeFilter } from '@/feed/types';
import { MainLayout } from '@/layout/MainLayout';
import { useMixPanelUserProfile } from '@/mixpanel/useMixPanelUserProfile';
import { useProfile } from '@/profile/useProfile';
import { TargetCard } from '@/target/TargetCard';
import { usePrimaryTarget } from '@/target/usePrimaryTarget';
import { TransactionList } from '@/transactions/TransactionList';
import { useTransactions } from '@/transactions/useTransactions';
import mixpanel from 'mixpanel-browser';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DepartmentApis } from './apis';
import { DEFAULT_SORT } from './constants';
import { TeamHeader } from './TeamHeader';
import { TeamTargetSummary } from './TeamTargetSummary';
import { TopCategories } from './TopCategories';
import { useDepartment } from './useDepartment';
import { useTopCategories } from './useTopCategories';

export const TeamPage = () => {
  const [sortTransactionsBy, setSortTransactionsBy] = useUrlState<string>(
    'sortTransactionsBy',
    DEFAULT_SORT,
  );
  const [transactionTimeRange, setTransactionTimeRange] = useUrlState<DateRangeFilter>(
    'transactionTimeRange',
    '30-days',
  );
  const [topCategoriesTimeRange, setTopCategoriesTimeRange] = useUrlState<DateRangeFilter>(
    'topCategoriesTimeRange',
    '30-days',
  );
  const { handle: viewDepartmentSummary } = useHandler((departmentId: number) =>
    DepartmentApis.viewSummary(departmentId),
  );

  const { id: departmentIdParam } = useParams() as Record<string, string>;
  const departmentId = +departmentIdParam;

  const { data: target, isValidating: isValidatingTarget, mutate } = usePrimaryTarget(departmentId);
  const [page, setPage] = useState<number>(1);

  useMountEffect(() => {
    viewDepartmentSummary(departmentId);
  });

  const { transactions, isValidatingTransactions, totalCount } = useTransactions({
    props: [{ id: +departmentIdParam, type: 'DEPARTMENT', name: '', exclude: false }],
    dateRange: transactionTimeRange,
    limit: DEFAULT_ITEMS_PER_INFINITE_LOAD,
    offset: (page - 1) * DEFAULT_ITEMS_PER_INFINITE_LOAD,
    ...StringUtils.toApiSortParam(sortTransactionsBy ?? ''),
  });

  const { data: topCategories = EMPTY_ARRAY, isValidating: isValidatingTopCategories } =
    useTopCategories(departmentId, { dateRange: topCategoriesTimeRange });

  const { data: department, error } = useDepartment(departmentId);

  const isForbidden = error?.code === ApiErrorCode.Forbidden;

  const { profile } = useProfile();

  useEffect(() => {
    mixpanel.track('Team Page View', {
      user_id: profile?.id,
      email: profile?.email,
      company_id: profile?.company?.id,
    });
    useMixPanelUserProfile(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isForbidden)
    return (
      <MainLayout>
        <RestrictedAccessPage />
      </MainLayout>
    );

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
              dateRange={topCategoriesTimeRange}
              onDateRangeChange={setTopCategoriesTimeRange}
              topCategories={topCategories}
            />
          </OverlayLoader>
        </div>
      </div>
      <TransactionList
        onPageChange={setPage}
        transactions={transactions}
        loading={isValidatingTransactions}
        hiddenColumns={['depName']}
        className="mt-6"
        sort={sortTransactionsBy}
        totalCount={totalCount}
        onSortChange={setSortTransactionsBy}
        dateRange={transactionTimeRange}
        onDateRangeChange={setTransactionTimeRange}
      />
    </MainLayout>
  );
};
