import { useApi } from '@/api';
import { ChatIcon, LoopBoldIcon } from '@/assets';
import { Avatar, StatusTag, StatusTagColorScheme, Table, Tooltip } from '@/common/components';
import { useFetcher } from '@/common/hooks';
import { ClassName } from '@/common/types';
import { DateUtils } from '@/common/utils';
import { TranStatus } from '@/main/entity';
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

type Props = ClassName & { departmentId: number };

const TransactionList = ({ className, departmentId }: Props) => {
  const history = useHistory();
  const api = useApi();

  const { data: transactions = [] } = useFetcher(['transactions', departmentId], () =>
    api.getLineItems(departmentId),
  );

  const headers = ['', 'Date', 'Vendor', 'Description', 'Category', 'Amount', 'Status'];

  const goToLineItemPage = (id: number) => {
    history.push(`/feed/${id}`);
  };

  return (
    <Table.OverflowContainer className={className}>
      <Table className="rounded-card">
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
                <p className="text-Gray-6 text-xs">Last 30 Days</p>
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            {headers.map((header) => (
              <Table.Header key={header}>{header}</Table.Header>
            ))}
          </Table.Row>
          {transactions.map(
            ({ amountUsd, category, description, transDate, transaction, vendor, id }) => (
              <Table.Row
                key={id}
                className={clsx(
                  'relative cursor-pointer',
                  'hover:ring-1 hover:ring-Accent-4 hover:shadow-targetHover',
                )}
                onClick={() => goToLineItemPage(id)}
              >
                <Table.Cell>
                  <ChatIcon />
                </Table.Cell>
                <Table.Cell>{transDate && DateUtils.format(transDate)}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Avatar src={vendor?.avatar} className="w-6 h-6 flex-shrink-0" />
                    <span>{vendor?.name}</span>
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
                <Table.Cell>{category?.name}</Table.Cell>
                <Table.Cell className="text-right">{decimalLogic(amountUsd, '$')}</Table.Cell>
                <Table.Cell>
                  {!!transaction.status && (
                    <StatusTag
                      colorScheme={getTransactionColorScheme(transaction.status)}
                      className="font-semibold"
                    >
                      {getTransactionLabel(transaction.status)}
                    </StatusTag>
                  )}
                </Table.Cell>
              </Table.Row>
            ),
          )}
        </Table.Body>
      </Table>
    </Table.OverflowContainer>
  );
};

export default TransactionList;
