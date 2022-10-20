import { RestrictedAccessPage } from '@/auth/RestrictedAccess';
import { OverlayLoader } from '@/common/components';
import { useQuery, useUrlState } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { ApiErrorCode } from '@/error';
import { MainLayout } from '@/layout/MainLayout';
import { getDisplayUsdAmount } from '@/main/utils';
import { SpendingBarChart } from '@/spending/SpendingChart/SpendingBarChart';
import { TransactionList } from '@/team/TransactionList';
import { TimeRange } from '@/team/types';
import { useTransactions } from '@/team/useTransactions';
import dayjs from 'dayjs';
import { sumBy } from 'lodash-es';
import { useParams } from 'react-router-dom';
import { CategoryHeader } from './CategoryHeader';
import { useCategory } from './useCategory';
import { useCategorySpendingsReport } from './useCategorySpendingsReport';

const TRANSACTIONS_PER_PAGE = 10;
const DATE_FORMAT = 'YYYY-MM-DD';

export const CategoryPage = () => {
  const [sortTransactionsBy, setSortTransactionsBy] = useUrlState('sortTransactionsBy');
  const [timeRange, setTimeRange] = useUrlState<TimeRange>('timeRange');

  const { categoryId: categoryIdParam } = useParams() as Record<string, string>;
  const categoryId = +categoryIdParam;

  const { data: vendor, isValidating: isValidatingVendor, error } = useCategory(categoryId);

  const { categorySpendingsReport, isValidatingCategorySpendingsReport } =
    useCategorySpendingsReport(categoryId);

  const { curYearSpends = [], prevYearSpends = [] } = categorySpendingsReport ?? {};

  const totalSpend = sumBy(curYearSpends, 'total');
  const totalSpendLastYear = sumBy(prevYearSpends, 'total');

  const query = useQuery();

  const _page = query.get('page');
  const page = _page ? +_page : 1;

  const getFromDate = () => {
    if (!timeRange || timeRange === 'last-30-days') {
      return dayjs().subtract(30, 'days').format(DATE_FORMAT);
    }

    if (timeRange === 'last-90-days') return dayjs().subtract(90, 'days').format(DATE_FORMAT);

    return dayjs().date(1).month(1).format(DATE_FORMAT);
  };

  const getToDate = () => dayjs().format(DATE_FORMAT);

  const { transactions, totalCount, isValidatingTransactions } = useTransactions({
    catId: categoryId,
    ...StringUtils.toApiSortParam(!sortTransactionsBy ? '-transDate' : sortTransactionsBy),
    offset: (page - 1) * TRANSACTIONS_PER_PAGE,
    limit: TRANSACTIONS_PER_PAGE,
    from: getFromDate(),
    to: getToDate(),
  });

  const isForbidden = error?.code === ApiErrorCode.Forbidden;

  if (isForbidden)
    return (
      <MainLayout>
        <RestrictedAccessPage />
      </MainLayout>
    );

  return (
    <MainLayout>
      <CategoryHeader categoryId={categoryId} />
      <OverlayLoader
        loading={isValidatingVendor || isValidatingCategorySpendingsReport}
        className="mt-6"
      >
        <div className="rounded-card shadow-card px-6 py-4 bg-white">
          <h3 className="text-primary font-bold">{vendor?.name}</h3>
          <div className="flex gap-4 mt-2">
            <div>
              <div className="flex gap-1 items-center text-xs text-Gray-6">
                <div className="w-1.5 h-1.5 rounded bg-Accent-2"></div>
                <span>Spend</span>
              </div>
              <p className="text-primary font-bold font-sm">{getDisplayUsdAmount(totalSpend)}</p>
            </div>
            <div>
              <div className="flex gap-1 items-center text-xs text-Gray-6">
                <div className="w-1.5 h-1.5 rounded bg-Gray-6"></div>
                <span>Last Year</span>
              </div>
              <p className="text-primary font-bold font-sm">
                {getDisplayUsdAmount(totalSpendLastYear)}
              </p>
            </div>
          </div>
          <div className="h-[400px] mt-4">
            <SpendingBarChart thisYearData={curYearSpends} lastYearData={prevYearSpends} />
          </div>
        </div>
      </OverlayLoader>
      <TransactionList
        className="mt-6"
        transactions={transactions}
        totalCount={totalCount}
        perPage={TRANSACTIONS_PER_PAGE}
        loading={isValidatingTransactions}
        hiddenColumns={['categoryName']}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        sort={sortTransactionsBy}
        onSortChange={setSortTransactionsBy}
      />
    </MainLayout>
  );
};
