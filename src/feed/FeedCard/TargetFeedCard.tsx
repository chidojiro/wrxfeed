import { EyeHideIcon } from '@/assets';
import { distanceToNow } from '@/common/utils';
import { GRADIENT_DEFAULT } from '@/config';
import UserAvatar from '@/main/atoms/UserAvatar';
import { FeedItem, Visibility } from '@/main/entity';
import { OptionsButton } from '@/main/molecules';
import { getTargetName } from '@/main/utils';
import { AddTargetModal } from '@/target/AddTargetModal';
import { Target, UpdateTargetPayload } from '@/target/types';
import { useDisclosure } from '@dwarvesf/react-hooks';
import clsx from 'clsx';
import React from 'react';
import { CommentsSection } from './CommentsSection';
import { FeedBackModal } from './FeedBackModal';
import { TargetFeedOverview } from './TargetFeedOverview';
import { TransactionsSection } from './TransactionsSection';

export interface TargetFeedCardProps {
  feed: FeedItem;
  onUpdateTarget: (id: number, payload: UpdateTargetPayload) => Promise<Target>;
  onDeleteTarget: (id: number) => Promise<unknown>;
}

export const TargetFeedCard = React.memo(
  ({ feed, onDeleteTarget, onUpdateTarget }: TargetFeedCardProps) => {
    const [isOpenFeedbackModal, openFeedbackModal] = React.useState(false);
    const addTargetModalDisclosure = useDisclosure();
    const isHidden = feed?.category !== null && feed?.category?.visibility === Visibility.HIDDEN;

    const renderEditorAvatar = (target: Target) => {
      const updaterName = target?.updatedBy?.fullName ?? '';
      return (
        <div className="flex w-6 h-6 group relative">
          <UserAvatar user={target?.updatedBy} />
          {typeof updaterName === 'string' && updaterName?.length > 0 && (
            <div className="invisible group-hover:visible absolute -top-10 left-0">
              <div className="bg-primary p-2 rounded-sm">
                <p className="text text-white text-xs truncate font-semibold">{updaterName}</p>
              </div>
              <svg
                className="absolute text-primary h-2 left-3 top-full"
                x="0px"
                y="0px"
                viewBox="0 0 255 255"
                xmlSpace="preserve"
              >
                <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
              </svg>
            </div>
          )}
        </div>
      );
    };

    const renderTargetName = (target: Target) => {
      return (
        <div className="group relative">
          <p className="text-base text-primary text-left font-bold line-clamp-2 overflow-ellipsis">
            {getTargetName(target)}
          </p>
        </div>
      );
    };

    return (
      <>
        <article
          key={feed.id}
          className="bg-white flex flex-col filter shadow-md rounded-card relative"
          aria-labelledby={`rollup-title-${feed.id}`}
        >
          <div className="flex flex-col">
            <div
              className="h-4 w-full rounded-t-card"
              style={{
                background: GRADIENT_DEFAULT,
              }}
            />
            <div
              className={clsx(
                isHidden ? 'bg-purple-8' : 'bg-white',
                'flex-col space-y-2 px-8 py-4',
              )}
            >
              <div className="flex flex-row items-center space-x-2">
                <div className="flex items-center min-w-0 flex-1">
                  {renderTargetName(feed.target)}
                  {isHidden && (
                    <div className="flex flex-row items-center bg-Gray-3-50 py-0.5 px-2 ml-2 rounded-full">
                      <EyeHideIcon
                        viewBox="-2 -2 19 19"
                        className="fill-current path-no-filled stroke-current path-no-stroke text-system-alert mr-1"
                      />
                      <span className="text-xs font-medium text-white px-1">Hidden</span>
                    </div>
                  )}
                </div>
                <OptionsButton
                  onEditClick={addTargetModalDisclosure.onOpen}
                  onDeleteClick={
                    !feed.target?.isPrimary ? () => onDeleteTarget(feed.target.id) : undefined
                  }
                />
              </div>
              <div className="flex flex-row space-x-2 items-center h-6">
                {renderEditorAvatar(feed.target)}
                <h2
                  id={`question-title-${feed.id}`}
                  className="mt-1 text-xs font-normal text-Gray-6"
                >
                  {`edited ${distanceToNow(feed.target.updatedAt)}`}
                </h2>
              </div>
            </div>
          </div>
          <TargetFeedOverview target={feed.target} />
          {!!feed.transactions.length && <TransactionsSection feed={feed} />}
          <CommentsSection feed={feed} />
        </article>
        <FeedBackModal
          open={isOpenFeedbackModal}
          onClose={() => openFeedbackModal(false)}
          itemId={feed.id}
        />
        <AddTargetModal
          open={addTargetModalDisclosure.isOpen}
          onClose={addTargetModalDisclosure.onClose}
          onCancel={addTargetModalDisclosure.onClose}
          target={feed.target}
          departmentId={feed.department?.id}
          useDefaultApis={false}
          onUpdate={onUpdateTarget}
          onDelete={onDeleteTarget}
        />
      </>
    );
  },
);

TargetFeedCard.displayName = 'TargetFeedCard';
