import Modal from '@/common/atoms/Modal';
import { Button, Form } from '@/common/components';
import { withMountOnOpen } from '@/common/hocs';
import { useHandler } from '@/common/hooks';
import { TransLineItem } from '@/main/entity';
import { getNameAbbreviation } from '@/main/utils';
import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FeedApis } from '../apis';
import { LineInfo } from './LineItemDetails';

export type UpdateDetailsLineItemInfoModalProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  transLineItem: TransLineItem;
  onConfirm: typeof FeedApis.updateLineItem;
};

export const UpdateDetailsLineItemInfoModal = withMountOnOpen(
  ({
    open = false,
    onClose,
    onCancel,
    transLineItem,
    onConfirm,
  }: UpdateDetailsLineItemInfoModalProps) => {
    const methods = useForm();
    const {
      formState: { isValid, isSubmitting },
      reset,
    } = methods;

    React.useEffect(() => {
      reset(transLineItem);
    }, [reset, transLineItem]);

    const getOriginalAmountWithSign = (): string => {
      if (!transLineItem?.transaction?.currency || !transLineItem?.amountFx) return '...';
      const amountWithCurrency = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: transLineItem?.transaction?.currency || '',
      }).format(transLineItem?.amountFx || 0);
      return amountWithCurrency;
    };

    const rows: LineInfo[] = [
      {
        id: 'category',
        key: 'Category',
        value: transLineItem?.category?.name ?? '...',
      },
      {
        id: 'created-by',
        key: 'Created By',
        value: transLineItem?.transaction?.createdByName ?? '...',
      },
      {
        id: 'approver',
        key: 'Approver',
        value: transLineItem?.transaction?.billApproverName ?? '...',
      },
      {
        id: 'terms',
        key: 'Terms',
        value: transLineItem?.transaction?.terms ?? '...',
      },
      {
        id: 'due-date',
        key: 'Due Date',
        value: dayjs(transLineItem?.transaction?.dueDate).format('MMM D, YYYY'),
      },
      {
        id: 'transaction-date',
        key: 'Transaction Date',
        value: dayjs(transLineItem?.transDate).format('MMM D, YYYY'),
      },
      {
        id: 'original-amount',
        key: 'Original Amount',
        value: getOriginalAmountWithSign(),
      },
      {
        id: 'subsidiary-name',
        key: 'Subsidiary',
        value: transLineItem?.transaction?.subsidiaryName ?? '...',
      },
    ];

    const renderAvatarIcon = (fullName: string) => {
      const shortName = getNameAbbreviation(fullName);
      return (
        <span className="flex h-8 w-8 rounded-full bg-purple-5 justify-center items-center ml-2">
          <span className="text-white text-xs font-semibold">{shortName}</span>
        </span>
      );
    };

    const { handle: handleConfirm } = useHandler(onConfirm);

    return (
      <Modal open={open} onClose={onClose} center={false} contentClass="sm:my-24 overflow-visible">
        <Form
          methods={methods}
          onSubmit={async (data) => {
            await handleConfirm(transLineItem.id, data);
            onClose();
          }}
          className="flex flex-col w-[685px] outline-none pt-4"
        >
          <div className="flex flex-col space-y-2 px-10 py-4 w-full">
            <p className="text-primary text-xs font-semibold">Line Item Description</p>
            <div className={clsx('flex flex-col h-[38px] px-2.5 w-auto bg-Gray-12')}>
              <Form.Input
                name="description"
                placeholder="What goods or services does this business provide?"
              />
            </div>

            <ul className="mt-2 flex flex-1 flex-col border-t border-t-Gray-28">
              {rows.map((row: LineInfo) => {
                return (
                  <div
                    key={row?.key}
                    className="flex w-full py-3.5 max-h-32 flex-row items-center justify-between"
                  >
                    <p className="text-Gray-6 text-sm min-w-max">{row?.key}</p>
                    <p className="flex items-center text-Gray-3 text-ellipsis overflow-hidden text-sm text-right ml-6">
                      <span>{row?.value}</span>
                      {row?.id === 'created-by' &&
                        renderAvatarIcon(transLineItem?.transaction?.createdByName ?? '')}
                      {row?.id === 'approver' &&
                        renderAvatarIcon(transLineItem?.transaction?.billApproverName ?? '')}
                    </p>
                  </div>
                );
              })}
            </ul>
          </div>

          <hr className="divider divider-horizontal w-full" />
          <div className="flex flex-row w-full px-10 py-4 gap-3 justify-end">
            <Button variant="ghost" colorScheme="gray" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="solid" type="submit" disabled={!isValid} loading={isSubmitting}>
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>
    );
  },
);
