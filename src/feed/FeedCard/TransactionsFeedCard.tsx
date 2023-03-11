import { ExclamationCircle, EyeHideIcon, MoreVerticalIcon } from '@/assets';
import { Button, ButtonProps, ConditionalWrapper } from '@/common/components';
import ConfirmModal from '@/main/atoms/ConfirmModal';
import PopoverMenu from '@/main/atoms/PopoverMenu';
import PopoverMenuItem from '@/main/atoms/PopoverMenuItem';
import { Category, FeedItem, Visibility } from '@/main/entity';
import { decimalLogic, DecimalType, getDisplayUsdAmount, scrollToTop } from '@/main/utils';
import { useDisclosure } from '@dwarvesf/react-hooks';
import { Menu } from '@headlessui/react';
import dayjs from 'dayjs';
import { sumBy } from 'lodash-es';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CommentsSection } from './CommentsSection';
import { FeedBackModal } from './FeedBackModal';
import { FeedCardHeader } from './FeedCardHeader';
import { TransactionsSection } from './TransactionsSection';

export type TransactionsFeedCardProps = {
  feed: FeedItem;
  categoryRedirectHref?: (category: Category) => string;
  onCategoryClick?: (category: Category) => void;
  onHideCategoryConfirm?: () => void;
  onShowCategoryConfirm?: () => void;
};

export const TransactionsFeedCard = React.memo(
  ({
    feed,
    onCategoryClick,
    onHideCategoryConfirm,
    onShowCategoryConfirm,
    categoryRedirectHref,
  }: TransactionsFeedCardProps) => {
    const total = sumBy(feed.transactions, 'amountUsd');

    const feedbackModalDisclosure = useDisclosure();
    const showCategoryConfirmModalDisclosure = useDisclosure();
    const hideCategoryConfirmModalDisclosure = useDisclosure();

    const isHidden = feed.category !== null && feed.category?.visibility === Visibility.HIDDEN;

    const handleCopyFeedLink = () => {
      navigator.clipboard.writeText(`${window.location.host}/feed/${feed.id}`);
      toast.success('Feed link has been copied');
    };

    return (
      <>
        <article
          className="bg-white flex flex-col filter shadow-md rounded-card"
          aria-labelledby={`rollup-title-${feed.id}`}
        >
          <FeedCardHeader type="CATEGORY" />
          <div className="flex flex-row">
            <div className="flex-grow w-4/5 px-6 py-5 border-b border-Gray-11">
              <div className="flex items-center space-x-3">
                <div className="flex items-center min-w-0 flex-1 ">
                  <p className="text-base">
                    <ConditionalWrapper
                      conditions={[
                        {
                          condition: !!categoryRedirectHref,
                          component: (props: Partial<LinkProps>) => (
                            <Link
                              to={categoryRedirectHref?.(feed.category) ?? '/'}
                              onClick={() => scrollToTop()}
                              {...props}
                            />
                          ),
                        },
                        {
                          component: (props: Partial<ButtonProps>) => (
                            <Button onClick={() => onCategoryClick?.(feed.category)} {...props} />
                          ),
                        },
                      ]}
                      className="hover:underline text-left font-bold"
                    >
                      {feed.category?.name}
                    </ConditionalWrapper>
                  </p>
                  {isHidden && (
                    <div className="flex flex-row items-center bg-Gray-3-50 py-0.5 px-2 ml-2 rounded-full">
                      <EyeHideIcon
                        viewBox="-2 -2 19 19"
                        className="fill-current path-no-filled stroke-current path-no-stroke text-system-alert mr-1"
                      />
                      <span className="text-xs font-medium px-1">Hidden</span>
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 self-center flex items-center">
                  <h2 id={`question-title-${feed.id}`} className="text-lg font-semibold mr-3">
                    {`${decimalLogic(total, DecimalType.SummedNumbers, '$')}`}
                  </h2>
                  <Menu as="div" className="relative inline-block z-20 text-left">
                    <div>
                      <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <MoreVerticalIcon
                          className="fill-current path-no-filled"
                          aria-hidden="true"
                          viewBox="0 0 15 15"
                        />
                      </Menu.Button>
                    </div>
                    <PopoverMenu>
                      <PopoverMenuItem
                        key="issue-with-this-item"
                        value="issue-with-this-item"
                        label="Issue With This Item"
                        onClick={feedbackModalDisclosure.onOpen}
                      />
                      <PopoverMenuItem
                        key="copy-feed-link"
                        value="copy-feed-link"
                        label="Copy Link"
                        onClick={handleCopyFeedLink}
                      />
                    </PopoverMenu>
                  </Menu>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between mt-1 text-xs font-normal text-Gray-6">
                <h2 id={`question-title-${feed.id}`}>
                  <Link
                    to={`/departments/${feed.department.id}`}
                    className="hover:underline"
                    aria-hidden="true"
                  >
                    {`${feed.department?.name}`}
                  </Link>
                  <span>
                    {` · ${
                      feed.month &&
                      dayjs()
                        .month(feed.month - 1)
                        .format('MMMM')
                    }`}
                  </span>
                </h2>
                <h2 className="mr-7">{`Last Month: ${getDisplayUsdAmount(
                  feed.prevMonthSpend,
                )}`}</h2>
              </div>
            </div>
          </div>
          {feed.transactions?.length > 0 && <TransactionsSection feed={feed} defaultExpand />}
          {!feed.isFallback && <CommentsSection feed={feed} />}
        </article>
        <ConfirmModal
          open={hideCategoryConfirmModalDisclosure.isOpen}
          icon={<ExclamationCircle />}
          title="Hide this from the entire company?"
          okLabel="Hide"
          onClose={hideCategoryConfirmModalDisclosure.onClose}
          onOk={onHideCategoryConfirm}
        >
          <p id="modal-modal-description" className="text-Gray-6 text-sm">
            Only you will be able to see this category. Other teammates will not be able to see
            this.
          </p>
        </ConfirmModal>
        <ConfirmModal
          open={showCategoryConfirmModalDisclosure.isOpen}
          icon={<ExclamationCircle />}
          title="Unhide this category?"
          okLabel="Unhide"
          onClose={showCategoryConfirmModalDisclosure.onClose}
          onOk={onShowCategoryConfirm}
        >
          <p id="modal-modal-description" className="text-Gray-6 text-sm">
            This will unhide the category and it will be visible to the entire company.
          </p>
        </ConfirmModal>
        <FeedBackModal
          open={feedbackModalDisclosure.isOpen}
          onClose={feedbackModalDisclosure.onClose}
          itemId={feed.id}
        />
      </>
    );
  },
);

TransactionsFeedCard.displayName = 'TransactionsFeedCard';
