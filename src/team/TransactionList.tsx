import { LoopBoldIcon } from '@/assets';
import {
  Avatar,
  OverlayLoader,
  Select,
  StatusTag,
  StatusTagColorScheme,
  Table,
  Tooltip,
} from '@/common/components';
import { EmptyState } from '@/common/components/EmptyState';
import { Pagination } from '@/common/components/Pagination';
import { useUrlState } from '@/common/hooks';
import { ClassName } from '@/common/types';
import { DateUtils } from '@/common/utils';
import { CommentGroup } from '@/feed/CommentGroup';
import { TransLineItem, TranStatus } from '@/main/entity';
import { decimalLogic } from '@/main/utils';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';

const getTransactionColorScheme = (status: TranStatus): StatusTagColorScheme => {
  switch (status) {
    case TranStatus.PaidInFull:
      return 'green';
    case TranStatus.Open:
      return 'purple';
    default:
      return 'yellow';
  }
};

const getTransactionLabel = (status: TranStatus) => {
  switch (status) {
    case TranStatus.PaidInFull:
      return 'Paid';
    case TranStatus.Open:
      return 'Open';
    default:
      return 'Pending';
  }
};

type TransactionListProps = ClassName & {
  transactions: TransLineItem[];
  totalCount: number;
  loading: boolean;
  perPage: number;
};

export const TransactionList = ({
  className,
  transactions,
  totalCount,
  perPage,
  loading,
}: TransactionListProps) => {
  const history = useHistory();
  const [sortTransactionsBy, setSortTransactionsBy] = useUrlState('sortTransactionsBy');
  const [timeRange, setTimeRange] = useUrlState('timeRange');
  const [_page, setPage] = useUrlState('page');
  const page = _page ? +_page : 1;

  const headers: { label: string; sortKey?: string }[] = [
    { label: 'Date', sortKey: 'transDate' },
    { label: 'Category', sortKey: 'categoryName' },
    { label: 'Vendor', sortKey: 'vendorName' },
    { label: 'Description' },
    { label: 'Amount', sortKey: 'amountUsd' },
    { label: 'Status', sortKey: 'transStatus' },
    { label: 'Comments' },
  ];

  const goToLineItemPage = (feedItemId: number) => {
    history.push(`/feed/${feedItemId}`);
  };

  const hasTransactions = transactions?.length > 0;

  React.useEffect(() => {
    if (!sortTransactionsBy) {
      setSortTransactionsBy('-amountUsd');
    }
  }, [setSortTransactionsBy, sortTransactionsBy]);

  return (
    <div>
      <Table.OverflowContainer className={className}>
        <OverlayLoader loading={loading}>
          <Table
            className="rounded-card"
            sort={sortTransactionsBy}
            onSortChange={setSortTransactionsBy}
          >
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={7}>
                  <div
                    className={clsx(
                      'bg-white py-2 px-4 text-base',
                      'flex items-center justify-between',
                    )}
                  >
                    <div className={clsx('flex items-center gap-2', 'font-semibold text-Gray-3')}>
                      <LoopBoldIcon />
                      <span>Transactions</span>
                    </div>
                    <Select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      options={[
                        { label: 'Last 30 Days', value: 'last-30-days' },
                        { label: 'Last 90 Days', value: 'last-90-days' },
                        { label: 'Year To Date', value: 'year-to-date' },
                      ]}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
              {hasTransactions ? (
                <>
                  <Table.Row>
                    {headers.map(({ label, sortKey }) => (
                      <Table.Header key={label} sortKey={sortKey}>
                        {label}
                      </Table.Header>
                    ))}
                  </Table.Row>
                  {transactions.map(
                    ({
                      amountUsd,
                      category,
                      description,
                      transDate,
                      vendor,
                      id,
                      transStatus,
                      transRecordType,
                      feedItemId,
                      feedItem,
                    }: TransLineItem) => (
                      <Table.Row
                        key={id}
                        className={clsx('relative cursor-pointer h-14', 'list-row-hover')}
                        onClick={() => feedItemId && goToLineItemPage(feedItemId)}
                      >
                        <Table.Cell>{transDate && DateUtils.format(transDate)}</Table.Cell>
                        <Table.Cell>{category?.name}</Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            <Avatar
                              size="sm"
                              src={vendor?.avatar}
                              fullName={vendor?.name ?? ''}
                              className="w-6 h-6 flex-shrink-0"
                            />
                            <div>
                              <p>{vendor?.name}</p>
                              {transRecordType?.toLowerCase() ===
                                'Expense Report'.toLowerCase() && (
                                <div className="flex flex-row items-center space-x-1">
                                  <p className="text-Accent-2 text-xs font-normal">Expensed</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <Tooltip
                            trigger={
                              <div className="flex items-center max-w-[350px]">
                                <p className="line-clamp-3">{description}</p>
                              </div>
                            }
                          >
                            {description}
                          </Tooltip>
                        </Table.Cell>
                        <Table.Cell className="text-right">
                          {decimalLogic(amountUsd, '$')}
                        </Table.Cell>
                        <Table.Cell>
                          <StatusTag
                            colorScheme={getTransactionColorScheme(transStatus)}
                            className="font-semibold"
                          >
                            {getTransactionLabel(transStatus)}
                          </StatusTag>
                        </Table.Cell>
                        <Table.Cell>
                          {feedItem?.comments.length ? (
                            <CommentGroup comments={feedItem.comments} />
                          ) : (
                            <p className="text-center">--</p>
                          )}
                        </Table.Cell>
                      </Table.Row>
                    ),
                  )}
                </>
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={7}>
                    <div className="flex flex-1 py-4 px-2 w-full">
                      <EmptyState
                        title="No recent transactions"
                        content="This will change as more transactions come in."
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </OverlayLoader>
      </Table.OverflowContainer>
      {hasTransactions && (
        <Pagination
          totalRecord={totalCount}
          sideItemsCount={2}
          onChange={(page) => setPage(page.toString())}
          perPage={perPage}
          page={page}
        >
          <div className="flex items-center justify-between mt-4">
            <Pagination.ShowingRange />
            <Pagination.Items />
          </div>
        </Pagination>
      )}
    </div>
  );
};
