import { AddSmallSlimIcon, CommentIcon, EyeHideIcon, LoopBoldIcon } from '@/assets';
import { RestrictedItem } from '@/auth/RestrictedItem';
import {
  Avatar,
  Button,
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
import { LineItemDrawer, useLineItemDrawer } from '@/feed/LineItemDrawer';
import { Category, Department, TransLineItem, TranStatus } from '@/main/entity';
import { decimalLogic } from '@/main/utils';
import { RestrictedItem as TRestrictedItem } from '@/role/types';
import { useRestrictedItems } from '@/role/useRestrictedItems';
import { Vendor } from '@/vendor/types';
import clsx from 'clsx';
import { isEqual } from 'lodash-es';
import React from 'react';
import { Link } from 'react-router-dom';
import { TimeRangeSelect } from './TimeRangeSelect';
import { TimeRange } from './types';

export const getTransactionColorScheme = (status: TranStatus): StatusTagColorScheme => {
  switch (status) {
    case TranStatus.PaidInFull:
      return 'green';
    case TranStatus.Open:
      return 'purple';
    default:
      return 'yellow';
  }
};

export const getTransactionLabel = (status: TranStatus) => {
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
  const [_page, setPage] = useUrlState('page');
  const page = _page ? +_page : 1;

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

  const { restrictedItems } = useRestrictedItems();

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

  React.useEffect(() => {
    if (!sort) {
      onSortChange('-transDate', 'REPLACE');
    }
  }, [onSortChange, sort]);

  const isRestricted = (id: number, type: TRestrictedItem['type']) => {
    return !!restrictedItems.find((item) => isEqual({ id, type }, item));
  };

  const isAllRestricted = (department?: Department, vendor?: Vendor, category?: Category) => {
    if (!department || !vendor || !category) return false;

    if (
      !showDepartment &&
      isRestricted(vendor.id, 'VENDOR') &&
      isRestricted(category.id, 'CATEGORY')
    )
      return true;

    if (
      !showVendor &&
      isRestricted(department.id, 'DEPARTMENT') &&
      isRestricted(category.id, 'CATEGORY')
    )
      return true;

    if (
      !showCategory &&
      isRestricted(vendor.id, 'VENDOR') &&
      isRestricted(department.id, 'DEPARTMENT')
    )
      return true;

    return false;
  };

  const isSomeRestricted = (department?: Department, vendor?: Vendor, category?: Category) => {
    if (!department || !vendor || !category) return false;

    if (
      !showDepartment &&
      (isRestricted(vendor.id, 'VENDOR') || isRestricted(category.id, 'CATEGORY'))
    )
      return true;

    if (
      !showVendor &&
      (isRestricted(department.id, 'DEPARTMENT') || isRestricted(category.id, 'CATEGORY'))
    )
      return true;

    if (
      !showCategory &&
      (isRestricted(vendor.id, 'VENDOR') || isRestricted(department.id, 'DEPARTMENT'))
    )
      return true;

    return false;
  };

  return (
    <div>
      <LineItemDrawer
        open={isLineItemDrawerOpen}
        onClose={closeLineItemDrawer}
        lineItem={selectedLineItem!}
        feedId={feedId}
      />
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
                  {transactions.map((transaction: TransLineItem) => (
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
                            {isRestricted(transaction.department?.id ?? 0, 'DEPARTMENT') ? (
                              <RestrictedItem />
                            ) : (
                              <Link
                                className="flex items-center gap-2"
                                to={`/departments/${transaction.department?.id}`}
                              >
                                {transaction.department?.name}
                              </Link>
                            )}
                          </div>
                        </Table.Cell>
                      )}
                      {showCategory && (
                        <Table.Cell className="hover:bg-Gray-12 !p-0">
                          <div className="py-2 px-4">
                            {isRestricted(transaction.category?.id ?? 0, 'CATEGORY') ? (
                              <RestrictedItem />
                            ) : (
                              <Link
                                className="flex items-center gap-2"
                                to={`/categories/${transaction.category?.id}`}
                              >
                                {transaction.category?.name}
                              </Link>
                            )}
                          </div>
                        </Table.Cell>
                      )}
                      {showVendor && (
                        <Table.Cell className="hover:bg-Gray-12 !p-0">
                          <div className="py-2 px-4">
                            {isRestricted(transaction.vendor?.id ?? 0, 'VENDOR') ? (
                              <RestrictedItem />
                            ) : (
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
                                      <p className="text-Accent-2 text-xs font-normal">Expensed</p>
                                    </div>
                                  )}
                                </div>
                              </Link>
                            )}
                          </div>
                        </Table.Cell>
                      )}
                      <Table.Cell>
                        {isSomeRestricted(
                          transaction.department,
                          transaction.vendor,
                          transaction.category,
                        ) ? (
                          <RestrictedItem />
                        ) : (
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
                        )}
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
                            {getTransactionLabel(transaction.transStatus)}
                          </StatusTag>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        {isAllRestricted(
                          transaction.department,
                          transaction.vendor,
                          transaction.category,
                        ) ? (
                          <div className="relative">
                            <CommentIcon className="text-Gray-7 h-7 w-6" />
                            <div className="absolute top-0 left-0 w-6 h-full">
                              <EyeHideIcon className="absolute top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xs font-semibold text-red-1" />
                            </div>
                          </div>
                        ) : (
                          <Link to={`/feed/item/${transaction.id}`}>
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
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
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
