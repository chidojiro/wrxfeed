import { OverlayLoader } from '@/common/components';
import { EMPTY_ARRAY } from '@/common/constants';
import { useQuery, useUrlState } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { MainLayout } from '@/layout/MainLayout';
import { TargetCard } from '@/target/TargetCard';
import { usePrimaryTarget } from '@/target/usePrimaryTarget';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { TeamHeader } from './TeamHeader';
import { TeamTargetSummary } from './TeamTargetSummary';
import { TopCategories } from './TopCategories';
import { TransactionList } from './TransactionList';
import { TimeRange } from './types';
import { useTopCategories } from './useTopCategories';
import { useTransactions } from './useTransactions';

const TRANSACTIONS_PER_PAGE = 10;
const DATE_FORMAT = 'YYYY-MM-DD';

export const TeamPage = () => {
  const [sortTransactionsBy, setSortTransactionsBy] = useUrlState('sortTransactionsBy');
  const [transactionTimeRange, setTransactionTimeRange] =
    useUrlState<TimeRange>('transactionTimeRange');
  const [topCategoriesTimeRange, setTopCategoriesTimeRange] =
    useUrlState<TimeRange>('topCategoriesTimeRange');

  const { id: departmentIdParam } = useParams() as Record<string, string>;
  const departmentId = +departmentIdParam;
  const { data: target, isValidating: isValidatingTarget, mutate } = usePrimaryTarget(departmentId);

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
    </MainLayout>
  );
};
