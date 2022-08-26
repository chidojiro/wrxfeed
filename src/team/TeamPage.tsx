import { OverlayLoader } from '@/common/components';
import { useQuery } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { MainLayout } from '@/layout/MainLayout';
import { TargetCard } from '@/target/TargetCard';
import { usePrimaryTarget } from '@/target/usePrimaryTarget';
import React from 'react';
import { useParams } from 'react-router-dom';
import { TeamHeader } from './TeamHeader';
import { TeamTargetSummary } from './TeamTargetSummary';
import { TopCategories } from './TopCategories';
import { TransactionList } from './TransactionList';
import { useTransactions } from './useTransactions';
import dayjs from 'dayjs';

const TRANSACTIONS_PER_PAGE = 10;
const DATE_FORMAT = 'YYYY-MM-DD';

export const TeamPage = () => {
  const { id: departmentIdParam } = useParams() as Record<string, string>;
  const departmentId = +departmentIdParam;
  const { data: target, isValidating: isValidatingTarget, mutate } = usePrimaryTarget(departmentId);

  const query = useQuery();

  const sortTransactionsBy = query.get('sortTransactionsBy');
  const timeRange = query.get('timeRange');
  const _page = query.get('page');
  const page = _page ? +_page : 1;

  const getFromDate = () => {
    if (!timeRange || timeRange === 'last-30-days') {
      debugger;
      return dayjs().subtract(30, 'days').format(DATE_FORMAT);
    }

    if (timeRange === 'last-90-days') return dayjs().subtract(90, 'days').format(DATE_FORMAT);

    return dayjs().date(1).month(1).format(DATE_FORMAT);
  };

  const getToDate = () => dayjs().format(DATE_FORMAT);

  const { transactions, totalCount, isValidatingTransactions } = useTransactions({
    depId: +departmentIdParam,
    ...StringUtils.toApiSortParam(sortTransactionsBy ?? ''),
    offset: (page - 1) * TRANSACTIONS_PER_PAGE,
    limit: TRANSACTIONS_PER_PAGE,
    from: getFromDate(),
    to: getToDate(),
  });

  return (
    <MainLayout>
      <h1 className="sr-only">Department list</h1>
      <TeamHeader departmentId={departmentId} />
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
          <TopCategories />
        </div>
      </div>
      <TransactionList
        transactions={transactions}
        loading={isValidatingTransactions}
        perPage={TRANSACTIONS_PER_PAGE}
        totalCount={totalCount}
        hiddenColumns={['depName']}
        className="mt-6"
      />
    </MainLayout>
  );
};
