import { AddSmallSlimIcon, CommentIcon, LoopBoldIcon } from '@/assets';
import {
  Avatar,
  Button,
  Divider,
  OverlayLoader,
  Pagination,
  StatusTag,
  StatusTagColorScheme,
  Table,
  Tooltip,
} from '@/common/components';
import { EmptyState } from '@/common/components/EmptyState';
import { DEFAULT_ITEMS_PER_INFINITE_LOAD } from '@/common/constants';
import { RedirectMethod } from '@/common/hooks';
import { ClassName } from '@/common/types';
import { DateUtils } from '@/common/utils';
import { CommentGroup } from '@/feed/CommentGroup';
import { LineItemDrawer, useLineItemDrawer } from '@/feed/LineItemDrawer';
import { DateRangeFilter } from '@/feed/types';
import { TransLineItem, TranStatus } from '@/main/entity';
import { decimalLogic } from '@/main/utils';
import { useRestrictedItems } from '@/role/useRestrictedItems';
import { TimeRangeSelect } from '@/team/TimeRangeSelect';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export const getTransactionColorScheme = (status: TranStatus): StatusTagColorScheme => {
  switch (status) {
    case TranStatus.PaidInFull || TranStatus.Paid:
      return 'green';
    case TranStatus.Open:
      return 'purple';
    default:
      return 'yellow';
  }
};

const statusTruncateConditions = [
  TranStatus.Open,
  TranStatus.Cancelled,
  TranStatus.Closed,
  TranStatus.Rejected,
  TranStatus.Paid,
];

export const shouldTruncateTranStatus = (status: TranStatus) =>
  !statusTruncateConditions.includes(status);

type TransactionListProps = ClassName & {
  transactions: TransLineItem[];
  defaultExpand?: boolean;
  loading?: boolean;
  hiddenColumns?: ('vendorName' | 'depName' | 'categoryName')[];
  dateRange?: DateRangeFilter;
  onDateRangeChange?: (dateRange: DateRangeFilter) => void;
  sort: string;
  onSortChange: (sort: string, method?: RedirectMethod) => void;
  showLoadMoreButton?: boolean;
  showDateRangeSelect?: boolean;
  page?: number;
  onPageChange?: (page: number) => void;
  totalCount?: number;
  renderTitle?: (isExpanded: boolean, isEmpty?: boolean) => React.ReactNode;
};

type HeaderItem = { label: string; sortKey?: string; align?: string };
export const TransactionList = ({
  className,
  transactions,
  loading,
  hiddenColumns,
  sort,
  onSortChange,
  dateRange,
  onDateRangeChange,
  page,
  onPageChange,
  totalCount,
}: TransactionListProps) => {
  const {
    isLineItemDrawerOpen,
    selectedLineItem,
    closeLineItemDrawer,
    feedId,
    openLineItemDrawer,
  } = useLineItemDrawer();

  const showCategory = !hiddenColumns?.includes('categoryName');
  const showDepartment = !hiddenColumns?.includes('depName');
  const showVendor = !hiddenColumns?.includes('vendorName');

  const headers: HeaderItem[] = [
    { label: 'Date', sortKey: 'transDate' },
    showDepartment && { label: 'Team', sortKey: 'depName' },
    showCategory && { label: 'Category', sortKey: 'categoryName' },
    showVendor && { label: 'Vendor', sortKey: 'vendorName' },
    { label: 'Description' },
    { label: 'Amount', sortKey: 'amountUsd', align: 'text-right' },
    { label: 'Status', sortKey: 'transStatus', align: 'text-right' },
    { label: 'Comments', align: 'text-center flex justify-center' },
  ].filter((item): item is HeaderItem => !!item);

  const hasTransactions = transactions?.length > 0;

  if (!transactions.length)
    return (
      <div
        className={clsx(
          'bg-white py-2 px-4 text-base',
          'flex items-center justify-between rounded-card',
          className,
        )}
        style={{
          filter:
            'drop-shadow(0px 3px 5px rgba(9, 30, 66, 0.05)) drop-shadow(-1px 6px 8px rgba(6, 25, 56, 0.03))',
        }}
      >
        <div
          className={clsx(
            'flex items-center gap-2',
            'font-semibold text-Gray-6 bg-white w-full py-2 px-4',
          )}
        >
          <LoopBoldIcon />
          <span>No Transactions</span>
        </div>
        {dateRange && onDateRangeChange && (
          <TimeRangeSelect value={dateRange} onChange={onDateRangeChange} />
        )}
      </div>
    );

  return (
    <>
      <div
        className={className}
        style={{
          filter:
            'drop-shadow(0px 3px 5px rgba(9, 30, 66, 0.05)) drop-shadow(-1px 6px 8px rgba(6, 25, 56, 0.03))',
        }}
      >
        <div>
          <LineItemDrawer
            open={isLineItemDrawerOpen}
            onClose={closeLineItemDrawer}
            lineItem={selectedLineItem!}
            feedId={feedId}
          />
          <Table.OverflowContainer style={{ filter: 'none' }}>
            <OverlayLoader loading={loading}>
              <Table
                className="rounded-card"
                sort={sort}
                onSortChange={(sort) => onSortChange(sort)}
              >
                <Table.Body>
                  <Table.Row>
                    <Table.Cell colSpan={headers.length}>
                      <div
                        className={clsx(
                          'bg-white py-2 px-4 text-base',
                          'flex items-center justify-between',
                        )}
                      >
                        <div
                          className={clsx('flex items-center gap-2', 'font-semibold text-Gray-3')}
                        >
                          <LoopBoldIcon />
                          <span>View Transactions</span>
                        </div>
                        {dateRange && onDateRangeChange && (
                          <TimeRangeSelect value={dateRange} onChange={onDateRangeChange} />
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  {hasTransactions ? (
                    <>
                      <Table.Row>
                        {headers.map(({ label, sortKey, align }) => (
                          <Table.Header key={label} sortKey={sortKey} className={align}>
                            {label}
                          </Table.Header>
                        ))}
                      </Table.Row>
                      {transactions.map(
                        (transaction: TransLineItem) =>
                          ((transaction as any).department = null) || (
                            <Table.Row
                              key={transaction.id}
                              className={clsx('relative cursor-pointer h-14', 'list-row-hover')}
                            >
                              <Table.Cell>
                                {transaction.transDate && DateUtils.format(transaction.transDate)}
                              </Table.Cell>
                              {showDepartment && (
                                <Table.Cell className="hover:bg-Gray-12 !p-0">
                                  <div className="py-2 px-4">
                                    {transaction.department ? (
                                      <Link
                                        className="flex items-center gap-2"
                                        to={`/departments/${transaction.department?.id}`}
                                      >
                                        {transaction.department?.name}
                                      </Link>
                                    ) : (
                                      '--'
                                    )}
                                  </div>
                                </Table.Cell>
                              )}
                              {showCategory && (
                                <Table.Cell className="hover:bg-Gray-12 !p-0">
                                  <div className="py-2 px-4">
                                    <Link
                                      className="flex items-center gap-2"
                                      to={`/categories/${transaction.category?.id}`}
                                    >
                                      {transaction.category?.name}
                                    </Link>
                                  </div>
                                </Table.Cell>
                              )}
                              {showVendor && (
                                <Table.Cell className="hover:bg-Gray-12 !p-0">
                                  <div className="py-2 px-4">
                                    <Link
                                      to={`/vendors/${transaction.vendor?.id}`}
                                      className="flex items-center gap-2"
                                    >
                                      <Avatar
                                        size="sm"
                                        src={transaction.vendor?.avatar}
                                        fullName={transaction.vendor?.name ?? ''}
                                        className="w-6 h-6 flex-shrink-0"
                                      />
                                      <div>
                                        <p>{transaction.vendor?.name}</p>
                                        {transaction.transRecordType?.toLowerCase() ===
                                          'Expense Report'.toLowerCase() && (
                                          <div className="flex flex-row items-center space-x-1">
                                            <p className="text-Accent-2 text-xs font-normal">
                                              Expensed
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </Link>
                                  </div>
                                </Table.Cell>
                              )}
                              <Table.Cell>
                                <Button
                                  className="text-left"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openLineItemDrawer(transaction, transaction?.feedItem?.id);
                                  }}
                                >
                                  {(transaction.description ?? '').length >= 93 ? (
                                    <Tooltip
                                      trigger={
                                        <div className="flex flex-col items-center max-w-[350px]">
                                          <p className="line-clamp-3">{transaction.description}</p>
                                        </div>
                                      }
                                    >
                                      {transaction.description}
                                    </Tooltip>
                                  ) : (
                                    <p>{transaction.description}</p>
                                  )}
                                </Button>
                              </Table.Cell>
                              <Table.Cell className="text-right">
                                {decimalLogic(transaction.amountUsd, '$')}
                              </Table.Cell>
                              <Table.Cell>
                                <div className="flex justify-end">
                                  <StatusTag
                                    colorScheme={getTransactionColorScheme(transaction.transStatus)}
                                    className="font-semibold"
                                  >
                                    {shouldTruncateTranStatus(transaction.transStatus) ? (
                                      <Tooltip
                                        trigger={
                                          <p className="truncate w-8">{transaction.transStatus}</p>
                                        }
                                      >
                                        {transaction.transStatus}
                                      </Tooltip>
                                    ) : (
                                      <p>{transaction.transStatus}</p>
                                    )}
                                  </StatusTag>
                                </div>
                              </Table.Cell>
                              <Table.Cell>
                                <Link to={`/feed/item/${transaction.feedItem?.id}`}>
                                  {transaction.feedItem?.comments.length ? (
                                    <CommentGroup comments={transaction.feedItem.comments} />
                                  ) : (
                                    <div className="relative m-2">
                                      <CommentIcon className="text-Gray-7 h-7 w-6" />
                                      <div className="absolute bottom-[43%] left-3 transform -translate-x-1/2 text-Gray-2">
                                        <AddSmallSlimIcon />
                                      </div>
                                    </div>
                                  )}
                                </Link>
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
        </div>
      </div>
      {hasTransactions && onPageChange && !!totalCount && (
        <div>
          <Divider className="mt-4" />
          <Pagination
            totalRecord={totalCount}
            sideItemsCount={2}
            onChange={(page) => onPageChange(page)}
            perPage={DEFAULT_ITEMS_PER_INFINITE_LOAD}
            page={page}
          >
            <div className="flex items-center justify-between mt-4 px-4">
              <Pagination.ShowingRange className="hidden md:block" />
              <Pagination.Items className="mx-auto md:mx-0" />
            </div>
          </Pagination>
        </div>
      )}
    </>
  );
};
