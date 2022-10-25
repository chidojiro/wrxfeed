import { CategoryIcon, TeamIcon } from '@/assets';
import { RestrictedAccessPage } from '@/auth/RestrictedAccess';
import { OverlayLoader, Select } from '@/common/components';
import { useQuery, useUrlState } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { ApiErrorCode } from '@/error';
import { MainLayout } from '@/layout/MainLayout';
import { getDisplayUsdAmount } from '@/main/utils';
import { GroupedSpendingChart } from '@/spending/GroupedSpendingChart';
import { GroupedSpendingChartLegends } from '@/spending/GroupedSpendingChartLegends';
import { SpendingBarChart } from '@/spending/SpendingBarChart';
import { DEFAULT_SORT } from '@/team/constants';
import { TransactionList } from '@/team/TransactionList';
import { TimeRange } from '@/team/types';
import { useTransactions } from '@/team/useTransactions';
import dayjs from 'dayjs';
import { sumBy } from 'lodash-es';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GetVendorSpendingsParams } from './types';
import { useVendor } from './useVendor';
import { useVendorSpendings } from './useVendorSpendings';
import { VendorHeader } from './VendorHeader';

const TRANSACTIONS_PER_PAGE = 10;
const DATE_FORMAT = 'YYYY-MM-DD';

export const VendorPage = () => {
  const [hoveredItemId, setHoveredItemId] = React.useState<number>();
  const [sortTransactionsBy, setSortTransactionsBy] = useUrlState(
    'sortTransactionsBy',
    DEFAULT_SORT,
  );
  const [timeRange, setTimeRange] = useUrlState<TimeRange>('timeRange');
  const [groupBy, setGroupBy] = React.useState<GetVendorSpendingsParams['groupBy']>(undefined);

  const { vendorId: vendorIdParam } = useParams() as Record<string, string>;
  const vendorId = +vendorIdParam;

  const {
    data: vendor,
    isValidating: isValidatingVendor,
    error,
  } = useVendor(vendorId, {
    onError: (error) => {
      if (error.code === ApiErrorCode.Forbidden) {
        return false;
      }
    },
  });

  const { vendorSpendings, isValidatingVendorSpendings } = useVendorSpendings(vendorId, {
    groupBy,
  });

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
    vendId: vendorId,
    ...StringUtils.toApiSortParam(sortTransactionsBy ?? ''),
    offset: (page - 1) * TRANSACTIONS_PER_PAGE,
    limit: TRANSACTIONS_PER_PAGE,
    from: getFromDate(),
    to: getToDate(),
  });

  const { curYearSpends = [], prevYearSpends = [] } = vendorSpendings ?? {};

  const totalSpend = sumBy(curYearSpends, 'total');
  const totalSpendLastYear = sumBy(prevYearSpends, 'total');

  if (!vendorSpendings) return null;

  const isForbidden = error?.code === ApiErrorCode.Forbidden;

  if (isForbidden) {
    return (
      <MainLayout>
        <RestrictedAccessPage />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <VendorHeader vendorId={vendorId} />
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
                  <CategoryIcon />
                  Category
                </div>
              ),
              value: 'CATEGORY',
            },
          ]}
        />
      </div>
      <OverlayLoader loading={isValidatingVendor || isValidatingVendorSpendings} className="mt-6">
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
                <GroupedSpendingChart data={vendorSpendings} highlightedItemId={hoveredItemId} />
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
        transactions={transactions}
        totalCount={totalCount}
        perPage={TRANSACTIONS_PER_PAGE}
        loading={isValidatingTransactions}
        hiddenColumns={['vendorName']}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        sort={sortTransactionsBy}
        onSortChange={setSortTransactionsBy}
      />
    </MainLayout>
  );
};
