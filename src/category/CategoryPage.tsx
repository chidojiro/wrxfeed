import { TeamIcon, VendorIcon } from '@/assets';
import { RestrictedAccessPage } from '@/auth/RestrictedAccess';
import { OverlayLoader, Select } from '@/common/components';
import { useUrlState } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { ApiErrorCode } from '@/error';
import { useLineItems } from '@/feed/useLineItems';
import { MainLayout } from '@/layout/MainLayout';
import { getDisplayUsdAmount } from '@/main/utils';
import { GroupedSpendingChart } from '@/spending/GroupedSpendingChart';
import { GroupedSpendingChartLegends } from '@/spending/GroupedSpendingChartLegends';
import { SpendingBarChart } from '@/spending/SpendingBarChart';
import { DEFAULT_SORT } from '@/team/constants';
import { TimeRange } from '@/team/types';
import { TransactionList } from '@/transactions/TransactionList';
import dayjs from 'dayjs';
import { range, sumBy } from 'lodash-es';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryHeader } from './CategoryHeader';
import { GetCategorySpendingsParams } from './types';
import { useCategory } from './useCategory';
import { useCategorySpendingsReport } from './useCategorySpendingsReport';

const TRANSACTIONS_PER_PAGE = 10;
const DATE_FORMAT = 'YYYY-MM-DD';

export const CategoryPage = () => {
  const [hoveredItemId, setHoveredItemId] = React.useState<number>();
  const [sortTransactionsBy, setSortTransactionsBy] = useUrlState(
    'sortTransactionsBy',
    DEFAULT_SORT,
  );
  const [timeRange, setTimeRange] = useUrlState<TimeRange>('timeRange');

  const { categoryId: categoryIdParam } = useParams() as Record<string, string>;
  const categoryId = +categoryIdParam;

  const { data: vendor, isValidating: isValidatingVendor, error } = useCategory(categoryId);

  const [groupBy, setGroupBy] = useState<GetCategorySpendingsParams['groupBy']>(undefined);

  const {
    categorySpendingsReport = { curYearSpends: [], prevYearSpends: [] },
    isValidatingCategorySpendingsReport,
  } = useCategorySpendingsReport(categoryId, { groupBy });

  const { curYearSpends = [], prevYearSpends = [] } = categorySpendingsReport ?? {};

  const totalSpend = sumBy(curYearSpends, 'total');
  const totalSpendLastYear = sumBy(prevYearSpends, 'total');

  const [page, setPage] = useState<number>(1);

  const getFromDate = () => {
    if (!timeRange || timeRange === 'last-30-days') {
      return dayjs().subtract(30, 'days').format(DATE_FORMAT);
    }

    if (timeRange === 'last-90-days') return dayjs().subtract(90, 'days').format(DATE_FORMAT);

    return dayjs().date(1).month(1).format(DATE_FORMAT);
  };

  const getToDate = () => dayjs().format(DATE_FORMAT);

  const { lineItems: transactions, isValidatingLineItems: isValidatingTransactions } = useLineItems(
    {
      catId: categoryId,
      ...StringUtils.toApiSortParam(sortTransactionsBy ?? ''),
      limit: TRANSACTIONS_PER_PAGE * page,
      from: getFromDate(),
      to: getToDate(),
    },
  );

  const handleLoad = async () => {
    setPage(page + 1);
    return range(TRANSACTIONS_PER_PAGE);
  };

  const isForbidden = error?.code === ApiErrorCode.Forbidden;

  if (isForbidden)
    return (
      <MainLayout>
        <RestrictedAccessPage />
      </MainLayout>
    );

  if (!categorySpendingsReport) return null;

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
          <div className="flex gap-8 h-full items-stretch">
            <div className="h-[400px] mt-8 flex-1 border border-Gray-12 rounded-lg px-4 pt-10 pb-6">
              {!groupBy ? (
                <SpendingBarChart thisYearData={curYearSpends} lastYearData={prevYearSpends} />
              ) : (
                <GroupedSpendingChart
                  data={categorySpendingsReport}
                  highlightedItemId={hoveredItemId}
                />
              )}
            </div>
            {!!groupBy && (
              <GroupedSpendingChartLegends
                spendings={curYearSpends}
                groupBy={groupBy}
                highlightedItemId={hoveredItemId}
                onItemMouseEnter={setHoveredItemId}
                onItemMouseLeave={() => setHoveredItemId(undefined)}
              />
            )}
          </div>
        </div>
      </OverlayLoader>
      <TransactionList
        className="mt-6"
        onLoad={handleLoad as any}
        transactions={transactions}
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
