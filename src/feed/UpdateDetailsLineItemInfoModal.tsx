/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState, KeyboardEventHandler, useEffect } from 'react';
import dayjs from 'dayjs';
import { useSetRecoilState } from 'recoil';

import { EMPTY_LINE_ITEM, LineItem, TransLineItem } from '@/main/entity';
import { useUpdateLineItem } from '@/main/hooks/updateLineItem.hook';
import { lineItemUpdateState } from '@/main/states/lineItemUpdate.state';
import { getNameAbbreviation } from '@/main/utils';
import Loading from '@/common/atoms/Loading';
import Modal from '@/common/atoms/Modal';
import { classNames } from '@/common/utils';
import { LineInfo } from '@/feed/LineItemDetails';

export type UpdateDetailsLineItemInfoModalProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  itemEditing: LineItem;
  transLineItem: TransLineItem;
};

const UpdateDetailsLineItemInfoModal: React.FC<UpdateDetailsLineItemInfoModalProps> = ({
  open = false,
  onClose,
  onCancel,
  itemEditing,
  transLineItem,
}) => {
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

  const descriptionInputRef = useRef<HTMLInputElement>(null);

  const setLineItemUpdate = useSetRecoilState(lineItemUpdateState);
  const { isLoading, updateLineItemById } = useUpdateLineItem({
    onSuccess: (data) => {
      setLineItemUpdate(data);
      onClose();
    },
    onError: () => undefined,
  });

  const [lineItem, setLineItem] = useState<LineItem>(EMPTY_LINE_ITEM);

  useEffect(() => {
    setLineItem(itemEditing);
  }, [itemEditing]);

  const onCloseModal = () => {
    if (typeof onClose === 'function') onClose();
  };

  const onClickCancel = () => {
    onCancel();
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLineItem({
      ...lineItem,
      [event.target.name]: value,
    });
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (['Enter'].includes(event.key)) {
      event.preventDefault();
      descriptionInputRef.current?.blur();
    }
  };

  const isReadyToSave = (value: LineItem | undefined): boolean => {
    if (!value) {
      return false;
    }

    if (value?.description && value?.description?.trim().length > 0) {
      return true;
    }

    return false;
  };

  const onSaveHandler = (id: number, data: LineItem) => {
    updateLineItemById(id, data);
  };

  const createReadyState = isReadyToSave(lineItem) ? 'bg-primary' : 'bg-Gray-6';

  const renderAvatarIcon = (fullName: string) => {
    const shortName = getNameAbbreviation(fullName);
    return (
      <span className="flex h-8 w-8 rounded-full bg-purple-5 justify-center items-center ml-2">
        <span className="text-white text-xs font-semibold">{shortName}</span>
      </span>
    );
  };

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center={false}
      contentClass="sm:my-24 overflow-visible"
    >
      <div className="flex flex-col w-[685px] outline-none pt-4">
        <div className="flex flex-col space-y-2 px-10 py-4 w-full">
          <p className="text-primary text-xs font-semibold">Line Item Description</p>
          <div className={classNames('flex flex-col h-[38px] px-2.5 w-auto bg-Gray-12')}>
            <input
              name="description"
              ref={descriptionInputRef}
              className={classNames(
                'text-primary flex-1 bg-transparent placeholder-Gray-6 outline-none border-none text-sm w-auto',
              )}
              onKeyDown={handleKeyDown}
              placeholder="What goods or services does this business provide?"
              onChange={onChangeInput}
              value={lineItem?.description}
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
        <div className="flex flex-row w-full px-12 py-4">
          <button
            type="button"
            onClick={onClickCancel}
            className="flex px-4 py-2 rounded-sm hover:bg-Gray-12 mr-3 ml-auto"
          >
            <p className="text-Gray-6 text-xs font-semibold">Cancel</p>
          </button>
          <button
            type="button"
            onClick={() => {
              if (lineItem.id) {
                onSaveHandler(lineItem.id, lineItem);
              }
            }}
            className={classNames(
              'flex flex-row items-center px-4 py-2 rounded-sm hover:bg-primary',
              createReadyState,
            )}
          >
            <p className="text-white text-xs font-semibold">Save Changes</p>
            {isLoading && <Loading width={12} height={12} color="white" className="w-4 h-4 ml-2" />}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateDetailsLineItemInfoModal;
