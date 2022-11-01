import { RestrictedAccessPage } from '@/auth/RestrictedAccess';
import { OverlayLoader, Select } from '@/common/components';
import { useMountEffect, useUrlState } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { ApiErrorCode } from '@/error';
import { MainLayout } from '@/layout/MainLayout';
import { getDisplayUsdAmount } from '@/main/utils';
import { SpendingBarChart } from '@/spending/SpendingBarChart';
import { DEFAULT_SORT } from '@/team/constants';
import { TransactionList } from '@/transactions/TransactionList';
import { TimeRange } from '@/team/types';
import { useTransactions } from '@/transactions/useTransactions';
import dayjs from 'dayjs';
import { sumBy } from 'lodash-es';
import { useParams } from 'react-router-dom';
import { CategoryHeader } from './CategoryHeader';
import { useCategory } from './useCategory';
import { useCategorySpendingsReport } from './useCategorySpendingsReport';
import { TransLineItem } from '@/main/entity';
import { useEffect, useState } from 'react';
import { TeamIcon, VendorIcon } from '@/assets';
import { GetCategorySpendingsParams } from './types';

const TRANSACTIONS_PER_PAGE = 10;
const DATE_FORMAT = 'YYYY-MM-DD';

export const CategoryPage = () => {
  const [sortTransactionsBy, setSortTransactionsBy] = useUrlState(
    'sortTransactionsBy',
    DEFAULT_SORT,
  );
  const [timeRange, setTimeRange] = useUrlState<TimeRange>('timeRange');

  const { categoryId: categoryIdParam } = useParams() as Record<string, string>;
  const categoryId = +categoryIdParam;

  const { data: vendor, isValidating: isValidatingVendor, error } = useCategory(categoryId);

  const [groupBy, setGroupBy] = useState<GetCategorySpendingsParams['groupBy']>(undefined);

  const { categorySpendingsReport, isValidatingCategorySpendingsReport } =
    useCategorySpendingsReport(categoryId, { groupBy });

  const { curYearSpends = [], prevYearSpends = [] } = categorySpendingsReport ?? {};

  const totalSpend = sumBy(curYearSpends, 'total');
  const totalSpendLastYear = sumBy(prevYearSpends, 'total');

  const [page, setPage] = useState<number>(1);
  const [loadedTransactions, setLoadedTransactions] = useState<TransLineItem[]>();

  const getFromDate = () => {
    if (!timeRange || timeRange === 'last-30-days') {
      return dayjs().subtract(30, 'days').format(DATE_FORMAT);
    }

    if (timeRange === 'last-90-days') return dayjs().subtract(90, 'days').format(DATE_FORMAT);

    return dayjs().date(1).month(1).format(DATE_FORMAT);
  };

  const getToDate = () => dayjs().format(DATE_FORMAT);

  const { transactions, isValidatingTransactions } = useTransactions({
    catId: categoryId,
    ...StringUtils.toApiSortParam(sortTransactionsBy ?? ''),
    offset: (page - 1) * TRANSACTIONS_PER_PAGE,
    limit: TRANSACTIONS_PER_PAGE,
    from: getFromDate(),
    to: getToDate(),
  });

  useMountEffect(() => {
    setLoadedTransactions(transactions);
  });

  const isForbidden = error?.code === ApiErrorCode.Forbidden;

  useEffect(() => {
    if (loadedTransactions?.length === 0) {
      setLoadedTransactions(transactions);
    }
  }, [loadedTransactions, transactions]);

  if (isForbidden)
    return (
      <MainLayout>
        <RestrictedAccessPage />
      </MainLayout>
    );

  const handleLoad = async () => {
    setPage(page + 1);
    setLoadedTransactions(loadedTransactions?.concat(transactions));
    return loadedTransactions;
  };

  return (
    <MainLayout>
      <CategoryHeader categoryId={categoryId} />
      <div className="flex justify-end mt-4 w-full">
        <Select
          className="border border-solid border-Gray-11 rounded"
          value={groupBy}
          onChange={(value: any) => setGroupBy(value)}
          options={[
            { label: 'None', value: '' },
            {
              label: (
                <div className="flex items-center gap-2">
                  <TeamIcon />
                  Team
                </div>
              ),
              value: 'DEPARTMENT',
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  <VendorIcon />
                  Vendor
                </div>
              ),
              value: 'VENDOR',
            },
          ]}
        />
      </div>
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
        onLoad={() => handleLoad() as Promise<TransLineItem[]>}
        transactions={loadedTransactions as TransLineItem[]}
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
