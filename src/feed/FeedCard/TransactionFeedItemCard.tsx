import { MoreVerticalIcon } from '@/assets';
import { OverlayLoader, StatusTag, Tooltip } from '@/common/components';
import PopoverMenu from '@/main/atoms/PopoverMenu';
import PopoverMenuItem from '@/main/atoms/PopoverMenuItem';
import { FeedItem, TranStatus } from '@/main/entity';
import { decimalLogic } from '@/main/utils';
import {
  getTransactionColorScheme,
  shouldTruncateTranStatus,
} from '@/transactions/TransactionList';
import { useDisclosure } from '@dwarvesf/react-hooks';
import { Menu } from '@headlessui/react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CommentsSection } from './CommentsSection';
import { FeedBackModal } from './FeedBackModal';
import { FeedCardHeader } from './FeedCardHeader';

export type TransactionFeedItemCardProps = {
  feed: FeedItem;
  loading: boolean;
};

export const TransactionFeedItemCard = ({ feed, loading }: TransactionFeedItemCardProps) => {
  const feedbackModalDisclosure = useDisclosure();

  const handleCopyFeedLink = () => {
    navigator.clipboard.writeText(`${window.location.host}/feed/item/${feed.id}`);
    toast.success('Feed line item link has been copied');
  };

  const renderMenuItems = () => {
    const items = [];
    items.push(
      <PopoverMenuItem
        key="issue-with-this-item"
        value="issue-with-this-item"
        label="Issue With This Item"
        onClick={feedbackModalDisclosure.onOpen}
      />,
      <PopoverMenuItem
        key="copy-feed-link"
        value="copy-feed-link"
        label="Copy Link"
        onClick={handleCopyFeedLink}
      />,
    );
    return items;
  };

  return (
    <>
      <OverlayLoader loading={loading}>
        <article className="bg-white flex flex-col filter shadow-md rounded-card">
          <div className="flex flex-row">
            <FeedCardHeader type="TRANSACTION" />
          </div>
          <div className="px-8 pt-3 pb-6">
            <div className="flex justify-between">
              <div className="space-y-1">
                <Link
                  className="flex items-center hover:underline"
                  to={`/vendors/${feed?.lineItem.vendor?.id}`}
                >
                  <p className="text-base font-bold text-primary">{feed?.lineItem.vendor?.name}</p>
                </Link>
                <p className="flex space-x-0.5 text-xs font-normal text-Gray-6">
                  <Link
                    className="flex items-center hover:underline"
                    to={`/departments/${feed?.lineItem.department?.id}`}
                  >
                    {feed?.lineItem.department?.name} ·
                  </Link>
                  <Link
                    className="flex items-center hover:underline"
                    to={`/categories/${feed?.lineItem.category?.id}`}
                  >
                    {' '}
                    {feed?.lineItem.category?.name} ·
                  </Link>
                  <span> {dayjs(feed?.lineItem.transDate).format('DD/MM/YY')}</span>
                </p>
              </div>
              <div className="flex space-x-3.5">
                <p className="text-lg leading-5 font-semibold text-primary">
                  {decimalLogic(feed?.lineItem.amountUsd, '$')}
                </p>
                <Menu as="div" className="relative inline-block z-20 text-left mt-0.5">
                  <div>
                    <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Open options</span>
                      <MoreVerticalIcon
                        className="fill-current text-Gray-3 path-no-filled"
                        aria-hidden="true"
                        viewBox="0 0 15 15"
                      />
                    </Menu.Button>
                  </div>
                  <PopoverMenu>{renderMenuItems()}</PopoverMenu>
                </Menu>
              </div>
            </div>
          </div>
          <div className="px-9 py-6 border-t border-b border-Gray-11">
            <div className="flex justify-between">
              <p className=" font-normal text-xs text-Gray-6">
                {feed?.lineItem.description}{' '}
                <span>
                  {` - ${
                    feed?.month &&
                    dayjs()
                      .month(feed?.month - 1)
                      .format('MMMM')
                  }`}
                </span>
              </p>
              <StatusTag
                colorScheme={getTransactionColorScheme(feed?.lineItem.transStatus as TranStatus)}
                className="h-5 text-xs font-medium"
              >
                {shouldTruncateTranStatus(feed?.lineItem.transStatus as TranStatus) ? (
                  <Tooltip
                    trigger={
                      <p className="truncate w-8">{feed?.lineItem.transStatus as TranStatus}</p>
                    }
                  >
                    {feed?.lineItem.transStatus as TranStatus}
                  </Tooltip>
                ) : (
                  <p>{feed?.lineItem.transStatus as TranStatus}</p>
                )}
              </StatusTag>
            </div>
          </div>
          {feed && <CommentsSection feed={feed} />}
        </article>
      </OverlayLoader>
      <FeedBackModal
        open={feedbackModalDisclosure.isOpen}
        onClose={feedbackModalDisclosure.onClose}
        itemId={feed.id as number}
      />
    </>
  );
};
