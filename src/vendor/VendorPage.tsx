import { CategoryIcon, TeamIcon } from '@/assets';
import { RestrictedAccessPage } from '@/auth/RestrictedAccess';
import { OverlayLoader, Select } from '@/common/components';
import { DEFAULT_ITEMS_PER_INFINITE_LOAD } from '@/common/constants';
import { useUrlState } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import { ApiErrorCode } from '@/error';
import { DateRangeFilter } from '@/feed/types';
import { MainLayout } from '@/layout/MainLayout';
import { getDisplayUsdAmount } from '@/main/utils';
import { useMixPanelUserProfile } from '@/mixpanel/useMixPanelUserProfile';
import { useProfile } from '@/profile/useProfile';
import { GroupedSpendingChart } from '@/spending/GroupedSpendingChart';
import { GroupedSpendingChartLegends } from '@/spending/GroupedSpendingChartLegends';
import { SpendingBarChart } from '@/spending/SpendingBarChart';
import { DEFAULT_SORT } from '@/team/constants';
import { TransactionList } from '@/transactions/TransactionList';
import { useTransactions } from '@/transactions/useTransactions';
import { sumBy } from 'lodash-es';
import mixpanel from 'mixpanel-browser';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetVendorSpendingsParams } from './types';
import { useVendor } from './useVendor';
import { useVendorSpendings } from './useVendorSpendings';
import { VendorHeader } from './VendorHeader';

export const VendorPage = () => {
  const [hoveredItemId, setHoveredItemId] = React.useState<number>();
  const [sortTransactionsBy, setSortTransactionsBy] = useUrlState<string>(
    'sortTransactionsBy',
    DEFAULT_SORT,
  );
  const [dateRange, setDateRange] = useUrlState<DateRangeFilter>('dateRange', 'year-to-date');
  const [groupBy, setGroupBy] = React.useState<GetVendorSpendingsParams['groupBy']>(undefined);

  const { vendorId: vendorIdParam } = useParams() as Record<string, string>;
  const vendorId = +vendorIdParam;
  const [page, setPage] = useState<number>(1);
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

  const { transactions, isValidatingTransactions, totalCount } = useTransactions({
    props: [{ id: vendorId, type: 'VENDOR', name: '', exclude: false }],
    limit: DEFAULT_ITEMS_PER_INFINITE_LOAD,
    offset: (page - 1) * DEFAULT_ITEMS_PER_INFINITE_LOAD,
    dateRange,
    ...StringUtils.toApiSortParam(sortTransactionsBy ?? ''),
  });

  const { curYearSpends = [], prevYearSpends = [] } = vendorSpendings ?? {};

  const totalSpend = sumBy(curYearSpends, 'total');
  const totalSpendLastYear = sumBy(prevYearSpends, 'total');

  if (!vendorSpendings) return null;

  const { profile } = useProfile();

  useEffect(() => {
    mixpanel.track('Vendor Page View', {
      user_id: profile?.id,
      email: profile?.email,
      company: profile?.company?.id,
    });
    useMixPanelUserProfile(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <OverlayLoader loading={isValidatingVendor || isValidatingVendorSpendings} className="mt-6">
        <div className="rounded-card shadow-card px-6 py-4 bg-white">
          <div className="flex justify-between">
            <h3 className="text-primary font-bold">{vendor?.name}</h3>
            <div className="flex space-x-2 items-center">
              <p className="text-xs text-primary">Group By</p>
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
          </div>
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
        onPageChange={setPage}
        totalCount={totalCount}
        transactions={transactions}
        loading={isValidatingTransactions}
        hiddenColumns={['vendorName']}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        sort={sortTransactionsBy}
        onSortChange={setSortTransactionsBy}
      />
    </MainLayout>
  );
};
