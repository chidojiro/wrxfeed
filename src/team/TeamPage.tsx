import { RestrictedAccessPage } from '@/auth/RestrictedAccess';
import { OverlayLoader } from '@/common/components';
import { DEFAULT_ITEMS_PER_INFINITE_LOAD, EMPTY_ARRAY } from '@/common/constants';
import { useHandler, useMountEffect, useUrlState } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { ApiErrorCode } from '@/error';
import { DateRangeFilter } from '@/feed/types';
import { MainLayout } from '@/layout/MainLayout';
import { identifyMixPanelUserProfile } from '@/mixpanel/useMixPanel';
import { useProfile } from '@/profile/useProfile';
import { TargetCard } from '@/target/TargetCard';
import { usePrimaryTarget } from '@/target/usePrimaryTarget';
import { TransactionList } from '@/transactions/TransactionList';
import { useTransactions } from '@/transactions/useTransactions';
import dayjs from 'dayjs';
import mixpanel from 'mixpanel-browser';
import { useState } from 'react';
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
  const [dateRange, setDateRange] = useState<DateRangeFilter>('30-days');
  const [topCategoriesDateRange, setTopCategoriesDateRange] = useState<DateRangeFilter>('30-days');
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
    dateRange: typeof dateRange === 'string' ? dateRange : 'custom',
    from: Array.isArray(dateRange) ? dayjs(dateRange[0]).format('YYYY-MM-DD') : undefined,
    to: Array.isArray(dateRange) ? dayjs(dateRange[1]).format('YYYY-MM-DD') : undefined,
    limit: DEFAULT_ITEMS_PER_INFINITE_LOAD,
    offset: (page - 1) * DEFAULT_ITEMS_PER_INFINITE_LOAD,
    ...StringUtils.toApiSortParam(sortTransactionsBy ?? ''),
  });

  const { data: topCategories = EMPTY_ARRAY, isValidating: isValidatingTopCategories } =
    useTopCategories(departmentId, {
      dateRange: typeof topCategoriesDateRange === 'string' ? topCategoriesDateRange : undefined,
      from: Array.isArray(topCategoriesDateRange)
        ? dayjs(topCategoriesDateRange[0]).format('YYYY-MM-DD')
        : undefined,
      to: Array.isArray(topCategoriesDateRange)
        ? dayjs(topCategoriesDateRange[1]).format('YYYY-MM-DD')
        : undefined,
    });

  const { data: department, error } = useDepartment(departmentId);

  const isForbidden = error?.code === ApiErrorCode.Forbidden;

  const { profile } = useProfile();

  useMountEffect(() => {
    mixpanel.track('Team Page View', {
      user_id: profile?.id,
      email: profile?.email,
      company_id: profile?.company?.id,
    });
    identifyMixPanelUserProfile(profile);
  });

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
            href={`/feed/${target.feedItem?.id}`}
          />
        </OverlayLoader>
        <div className="col-span-9 lg:col-span-4 flex flex-col gap-6">
          <TeamTargetSummary departmentId={departmentId} />
          <OverlayLoader loading={isValidatingTopCategories}>
            <TopCategories
              dateRange={topCategoriesDateRange}
              onDateRangeChange={setTopCategoriesDateRange}
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
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
    </MainLayout>
  );
};
