import { LoopBoldIcon } from '@/assets';
import {
  Avatar,
  OverlayLoader,
  StatusTag,
  StatusTagColorScheme,
  Table,
  Tooltip,
} from '@/common/components';
import { EmptyState } from '@/common/components/EmptyState';
import { Pagination } from '@/common/components/Pagination';
import { RedirectMethod, useUrlState } from '@/common/hooks';
import { ClassName } from '@/common/types';
import { DateUtils } from '@/common/utils';
import { CommentGroup } from '@/feed/CommentGroup';
import { TransLineItem, TranStatus } from '@/main/entity';
import { decimalLogic } from '@/main/utils';
import clsx from 'clsx';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TimeRangeSelect } from './TimeRangeSelect';
import { TimeRange } from './types';

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
  hiddenColumns?: ('vendorName' | 'depName' | 'categoryName')[];
  timeRange: TimeRange;
  onTimeRangeChange: (timeRange: TimeRange) => void;
  sort: string;
  onSortChange: (sort: string, method?: RedirectMethod) => void;
};

type HeaderItem = { label: string; sortKey?: string; align?: string };
export const TransactionList = ({
  className,
  transactions,
  totalCount,
  perPage,
  loading,
  hiddenColumns,
  timeRange,
  onTimeRangeChange,
  sort,
  onSortChange,
}: TransactionListProps) => {
  const history = useHistory();
  const [_page, setPage] = useUrlState('page');
  const page = _page ? +_page : 1;

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

  const goToLineItemPage = (feedItemId: number) => {
    history.push(`/feed/${feedItemId}`);
  };

  const hasTransactions = transactions?.length > 0;

  React.useEffect(() => {
    if (!sort) {
      onSortChange('-transDate', 'REPLACE');
    }
  }, [onSortChange, sort]);

  return (
    <div>
      <Table.OverflowContainer className={className}>
        <OverlayLoader loading={loading}>
          <Table className="rounded-card" sort={sort} onSortChange={(sort) => onSortChange(sort)}>
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
                    <TimeRangeSelect value={timeRange} onChange={onTimeRangeChange} />
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
                      department,
                    }: TransLineItem) => (
                      <Table.Row
                        key={id}
                        className={clsx('relative cursor-pointer h-14', 'list-row-hover')}
                        onClick={() => feedItemId && goToLineItemPage(feedItemId)}
                      >
                        <Table.Cell>{transDate && DateUtils.format(transDate)}</Table.Cell>
                        {showDepartment && (
                          <Table.Cell className="hover:bg-Gray-12 !p-0">
                            <Link
                              className="flex items-center gap-2 py-2 px-4"
                              to={`/departments/${department?.id}`}
                            >
                              {department?.name}
                            </Link>
                          </Table.Cell>
                        )}
                        {showCategory && (
                          <Table.Cell className="hover:bg-Gray-12 !p-0">
                            <Link
                              className="flex items-center gap-2 py-2 px-4"
                              to={`/categories/${category?.id}`}
                            >
                              {category?.name}
                            </Link>
                          </Table.Cell>
                        )}
                        {showVendor && (
                          <Table.Cell className="hover:bg-Gray-12 !p-0">
                            <Link
                              to={`/vendors/${vendor?.id}`}
                              className="flex items-center gap-2 py-2 px-4"
                            >
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
                            </Link>
                          </Table.Cell>
                        )}
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
                          <div className="flex justify-end">
                            <StatusTag
                              colorScheme={getTransactionColorScheme(transStatus)}
                              className="font-semibold"
                            >
                              {getTransactionLabel(transStatus)}
                            </StatusTag>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/feed/${feedItem?.id}`}>
                            {feedItem?.comments.length ? (
                              <CommentGroup comments={feedItem.comments} />
                            ) : (
                              <p className="text-center">--</p>
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
      {hasTransactions && (
        <Pagination
          totalRecord={totalCount}
          sideItemsCount={2}
          onChange={(page) => setPage(page.toString())}
          perPage={perPage}
          page={page}
        >
          <div className="flex items-center justify-between mt-4">
            <Pagination.ShowingRange className="hidden md:block" />
            <Pagination.Items className="mx-auto md:mx-0" />
          </div>
        </Pagination>
      )}
    </div>
  );
};
