import {
  BasicsEditCircle,
  BasicsXRegular,
  ChainLinkIcon,
  DetailLogoDefault,
  EmailIcon,
  PhoneIcon,
  StackItemsIcon,
} from '@/assets';
import Loading from '@/common/atoms/Loading';
import Tooltip from '@/common/atoms/Tooltip';
import { Button } from '@/common/components';
import { ClassName } from '@/common/types';
import { TransLineItem } from '@/main/entity';
import {
  decimalLogic,
  DecimalType,
  getNameAbbreviation,
  getTransactionStatus,
  getVendorNameFromLineItem,
  isEmptyOrSpaces,
} from '@/main/utils';
import { VendorApis } from '@/vendor/apis';
import { useDisclosure } from '@dwarvesf/react-hooks';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { FeedApis } from '../apis';
import { UpdateDetailsLineItemInfoModal } from './UpdateDetailsLineItemInfoModal';
import { UpdateVendorInfoModal } from './UpdateVendorInfoModal';

export type LineItemDetailsProps = ClassName & {
  loading?: boolean;
  item?: TransLineItem;
  onCloseClick?: () => void;
  onModalOpen: () => void;
  onModalClose: () => void;
  onVendorUpdate: typeof VendorApis.update;
  onLineItemUpdate: typeof FeedApis.updateLineItem;
};

export interface SelectItemProps {
  item: TransLineItem;
}

export type LineInfo = {
  id: string;
  key: string;
  value: string;
};

export const LineItemDetails = ({
  className,
  loading,
  item,
  onLineItemUpdate,
  onVendorUpdate,
  onCloseClick,
  onModalClose,
  onModalOpen,
}: LineItemDetailsProps) => {
  const history = useHistory();

  const lineItemModalDisclosure = useDisclosure();
  const vendorModalDisclosure = useDisclosure();

  const openLineItemModal = () => {
    lineItemModalDisclosure.onOpen();
    onModalOpen();
  };

  const closeLineItemModal = () => {
    lineItemModalDisclosure.onClose();
    onModalClose();
  };

  const openVendorModal = () => {
    vendorModalDisclosure.onOpen();
    onModalOpen();
  };

  const closeVendorModal = () => {
    vendorModalDisclosure.onClose();
    onModalClose();
  };

  const goToCategoryPage = (categoryId?: number) => {
    onCloseClick?.();
    history.push({
      pathname: `/categories/${categoryId}`,
    });
  };

  const getOriginalAmountWithSign = (): string => {
    if (!item?.transaction?.currency || !item?.amountFx) return '...';
    const amountWithCurrency = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: item?.transaction?.currency || '',
    }).format(item?.amountFx || 0);
    return amountWithCurrency;
  };

  const rows: LineInfo[] = [
    {
      id: 'category',
      key: 'Category',
      value: item?.category?.name ?? '...',
    },
    {
      id: 'original-amount',
      key: 'Original Amount',
      value: getOriginalAmountWithSign(),
    },
    {
      id: 'subsidiary-name',
      key: 'Subsidiary',
      value: item?.transaction?.subsidiaryName ?? '...',
    },
    {
      id: 'terms',
      key: 'Terms',
      value: item?.transaction?.terms ?? '...',
    },
    {
      id: 'due-date',
      key: 'Due Date',
      value: item?.transaction?.dueDate
        ? dayjs(item?.transaction?.dueDate).format('MMM D, YYYY')
        : '',
    },
  ];

  const renderVendorName = () => {
    const vendorName = item ? getVendorNameFromLineItem(item) : '';
    return <div className="flex-auto text-lg font-bold text-Gray-3 mr-2">{vendorName}</div>;
  };

  const renderEditVendorInfoButton = () => {
    return (
      <Button
        size="sm"
        variant="ghost"
        colorScheme="gray"
        iconLeft={<BasicsEditCircle className="w-4 h-4 path-no-filled text-Gray-6 fill-current" />}
        onClick={openVendorModal}
      >
        Edit
      </Button>
    );
  };

  const renderEditLineItemDescriptionButton = () => {
    return (
      <Button
        size="sm"
        variant="ghost"
        colorScheme="gray"
        iconLeft={<BasicsEditCircle className="w-4 h-4 path-no-filled text-Gray-6 fill-current" />}
        onClick={openLineItemModal}
      >
        Edit
      </Button>
    );
  };

  const tranType = getTransactionStatus(item?.transaction?.status ?? '');

  const renderTransactionType = () => {
    return (
      <div
        className="flex flex-row flex-none justify-center items-center rounded-full bg-Green-8 px-2.5 py-0.5 h-5 mr-2.5 min-h-[20px]"
        style={{ backgroundColor: tranType?.color?.bgColor }}
      >
        <div
          className="w-1.5 h-1.5 bg-Green-400 rounded-full mr-[7px]"
          style={{ backgroundColor: tranType?.color?.dotColor }}
        />
        <p
          className="text-Green-800 text-xs font-medium"
          style={{ color: tranType?.color?.textColor }}
        >
          {tranType?.displayName}
        </p>
      </div>
    );
  };

  const renderAvatarIcon = (fullName: string) => {
    const shortName = getNameAbbreviation(fullName);
    return (
      <Tooltip message={fullName}>
        <div className="flex h-8 w-8 rounded-full bg-purple-5 justify-center items-center">
          <div className="flex text-white text-xs font-semibold">{shortName}</div>
        </div>
      </Tooltip>
    );
  };

  const lineItems = item?.transaction?.lineItems || [];

  const { vendor } = item ?? {};

  return (
    <div className={clsx('h-full flex flex-1 flex-col bg-white shadow-xl', className)}>
      <div
        className="w-full h-28 flex p-8"
        style={{
          background:
            'linear-gradient(124.66deg, #E081E2 7.8%, #A26ECC 27.02%, #835EBF 83.43%, #8945AF 95.9%)',
        }}
      >
        <div className="w-24 h-24 mr-4">
          <DetailLogoDefault className="w-24 h-24" />
        </div>
        <Button onClick={onCloseClick} className="ml-auto w-4 h-4">
          <BasicsXRegular
            className="w-4 h-4 float-right stroke-current text-white"
            width={20}
            height={20}
          />
        </Button>
      </div>

      <div className="flex flex-col my-5 px-8 overflow-y-auto flex-1">
        <div className="flex flex-row group w-[524px]">
          {item && renderVendorName()}
          <div className="hidden group-hover:block">{renderEditVendorInfoButton()}</div>
        </div>
        <div className="flex flex-row w-[524px] mt-2 mb-2">
          <div className="flex mr-4 text-xs">
            <ChainLinkIcon
              className="mr-1 stroke-current text-gray-500 align-middle"
              width={20}
              height={20}
            />
            <span>{vendor?.website}</span>
          </div>
          <div className="flex mr-4 text-xs">
            <EmailIcon className="mr-1 stroke-current text-gray-500" width={20} height={20} />
            <span>{vendor?.contactEmail}</span>
          </div>
          <div className="flex text-xs">
            <PhoneIcon className="stroke-current text-gray-500" width={20} height={20} />
            <span>{vendor?.contactNumber}</span>
          </div>
        </div>
        <div
          className="flex-row w-[524px] text-sm text-gray-500 rounded-lg border border-gray-200 p-3 hover:cursor-pointer"
          onClick={openVendorModal}
        >
          {vendor?.description ?? 'Add a vendor description'}
        </div>

        <div className="flex flex-col mt-6 rounded-lg border border-gray-200 p-3 bg-gray-50 w-[524px]">
          <div className="flex flex-row w-full text-sm text-gray-500 group mb-2 relative">
            <p className="flex-auto text-base font-bold text-Gray-3 mr-2">{item?.description}</p>
            {!!loading && (
              <Loading className="mx-4 absolute inset-x-0 bottom-0" width={12} height={12} />
            )}
            <div className="w-auto 2xl:w-[154px] flex justify-end">
              <div className="hidden group-hover:block h-6 justify-end">
                {renderEditLineItemDescriptionButton()}
              </div>
              <div className="flex group-hover:hidden h-6">
                {renderTransactionType()}
                <p className="text-base text-Gray-3 font-bold text-right">
                  {`${decimalLogic(item?.amountUsd, DecimalType.DetailView, '$')}`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-row w-full mt-2 mb-2">
            {item?.transaction?.createdByName && (
              <div className="flex flex-row flex-initial text-xs text-Gray-6 mr-1">
                <div className="flex items-center mr-0.5">Created by:</div>
                {renderAvatarIcon(item.transaction.createdByName)}
              </div>
            )}
            {item?.transaction?.billApproverName && (
              <div className="flex flex-row flex-0 text-xs text-Gray-6 mr-1">
                <div className="flex items-center mr-0.5">Approver:</div>
                {renderAvatarIcon(item.transaction.billApproverName)}
              </div>
            )}
            <div className="flex flex-row flex-1 text-xs text-Gray-6 justify-end">
              <div className="flex items-center">
                Transaction Date:&nbsp;
                {dayjs(item?.transDate).format('MMM D, YYYY')}
              </div>
            </div>
          </div>

          <ul className="mt-2 flex flex-1 flex-col border-t border-t-Gray-28">
            {rows.map((row: LineInfo) => {
              if (!loading && isEmptyOrSpaces(row?.value)) return null;

              return (
                <div
                  key={row?.key}
                  className="flex w-full py-3.5 max-h-32 flex-row items-center justify-between border-b border-b-Gray-28 last:border-b-0"
                >
                  <p className="text-Gray-6 text-sm min-w-max">{row?.key}</p>
                  <p className="text-Gray-3 line-clamp-5 text-ellipsis overflow-hidden text-sm text-right ml-6">
                    {row?.value}
                  </p>
                </div>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col p-3 w-[524px]">
          <p className="text-sm font-bold text-Gray-3">Line Items from this transaction</p>
          {!!loading && <Loading className="ml-4" width={12} height={12} />}
          <ul className="mt-2 flex flex-1 flex-col border-t border-t-Gray-28">
            {lineItems.map((row: TransLineItem) => {
              return (
                <div
                  key={row?.id}
                  className="flex w-full py-3.5 max-h-32 flex-col items-center justify-between border-b border-b-Gray-28 last:border-b-0"
                >
                  <div className="flex w-full mb-2">
                    <StackItemsIcon className="flex-initial w-4 h-4 mr-2" width={20} height={20} />
                    <p className="text-Gray-6 text-xs min-w-max">{row?.category?.name}</p>
                  </div>
                  <div className="flex w-[524px] px-3">
                    <p className="flex-auto text-Gray-6 text-sm truncate">{row?.description}</p>
                    <p className="float-right text-Gray-3 text-sm">
                      {`${decimalLogic(row?.amountUsd, DecimalType.DetailView, '$')}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col px-3 w-[524px]">
          <p className="text-sm font-bold text-Gray-3">
            {`${getVendorNameFromLineItem(item)} also appears in these categories`}
          </p>
          {!!loading && <Loading className="ml-4" width={12} height={12} />}
          <div className="flex flex-wrap">
            {item?.vendor?.categories?.map((category) => {
              return (
                <span
                  className="text-xs bg-purple-600 rounded px-2 mx-2 my-1 text-white hover:cursor-pointer"
                  key={category.id}
                  onClick={() => goToCategoryPage(category?.id)}
                >
                  {category.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <UpdateVendorInfoModal
        open={vendorModalDisclosure.isOpen}
        onClose={closeVendorModal}
        onCancel={closeVendorModal}
        vendor={vendor}
        onConfirm={onVendorUpdate}
      />
      {item && (
        <UpdateDetailsLineItemInfoModal
          open={lineItemModalDisclosure.isOpen}
          onClose={closeLineItemModal}
          onCancel={closeLineItemModal}
          transLineItem={item}
          onConfirm={onLineItemUpdate}
        />
      )}
    </div>
  );
};
