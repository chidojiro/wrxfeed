import { RestrictedAccessPage } from '@/auth/RestrictedAccess';
import { OverlayLoader } from '@/common/components';
import { EMPTY_ARRAY } from '@/common/constants';
import { useHandler, useMountEffect, useQuery, useUrlState } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { ApiErrorCode } from '@/error';
import { MainLayout } from '@/layout/MainLayout';
import { TargetCard } from '@/target/TargetCard';
import { usePrimaryTarget } from '@/target/usePrimaryTarget';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { DepartmentApis } from './apis';
import { TeamHeader } from './TeamHeader';
import { TeamTargetSummary } from './TeamTargetSummary';
import { TopCategories } from './TopCategories';
import { TransactionList } from './TransactionList';
import { TimeRange } from './types';
import { useDepartment } from './useDepartment';
import { useTopCategories } from './useTopCategories';
import { useTransactions } from './useTransactions';

const TRANSACTIONS_PER_PAGE = 10;
const DATE_FORMAT = 'YYYY-MM-DD';

export const TeamPage = () => {
  const [sortTransactionsBy, setSortTransactionsBy] = useUrlState(
    'sortTransactionsBy',
    '-transDate',
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

  useMountEffect(() => {
    viewDepartmentSummary(departmentId);
  });

  const query = useQuery();

  const _page = query.get('page');
  const page = _page ? +_page : 1;

  const getFromDate = (timeRange: TimeRange) => {
    if (!timeRange || timeRange === 'last-30-days') {
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
    from: getFromDate(transactionTimeRange),
    to: getToDate(),
  });

  const { data: topCategories = EMPTY_ARRAY, isValidating: isValidatingTopCategories } =
    useTopCategories(departmentId, { from: getFromDate(topCategoriesTimeRange), to: getToDate() });

  const { data: department, error } = useDepartment(departmentId);

  const isForbidden = error?.code === ApiErrorCode.Forbidden;

  return (
    <MainLayout>
      {isForbidden ? (
        <RestrictedAccessPage />
      ) : (
        <>
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
            transactions={transactions}
            loading={isValidatingTransactions}
            perPage={TRANSACTIONS_PER_PAGE}
            totalCount={totalCount}
            hiddenColumns={['depName']}
            className="mt-6"
            sort={sortTransactionsBy}
            onSortChange={setSortTransactionsBy}
            timeRange={transactionTimeRange}
            onTimeRangeChange={setTransactionTimeRange}
          />
        </>
      )}
    </MainLayout>
  );
};
