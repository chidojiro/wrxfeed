import React from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { Menu } from '@headlessui/react';

import routes from '@src/routes';
import { Target, FeedType } from '@main/entity';
import { decimalLogic, DecimalType, getTargetPeriodsAmountTotal } from '@main/utils';
import { MoreVerticalIcon, BinIcon, EditIcon, EyeIcon } from '@assets';
import TargetStatus, { TargetStatusType } from '@main/atoms/TargetStatus';
import MiniChartView from '@main/molecules/MiniChartView';
import TargetFeedName from '@main/atoms/TargetFeedName';
import EditorAvatar from '@main/atoms/EditorAvatar';
import PopoverMenu from '@main/atoms/PopoverMenu';
import PopoverMenuItem from '@main/atoms/PopoverMenuItem';
import Loading from '@common/atoms/Loading';

export interface TargetWrapListProps {
  targets: Target[];
  onEdit?: (target: Target) => void;
  onDelete?: (target: Target) => void;
  deletingItemId?: number;
}

const TargetWrapList: React.VFC<TargetWrapListProps> = ({
  targets = [],
  onEdit,
  onDelete,
  deletingItemId,
}) => {
  const history = useHistory();
  const onClickTarget = (target: Target) => {
    history.push(
      `${(routes.Feed.path as string).replace(':id', `${target.id}?route=${FeedType.TargetFeed}`)}`,
    );
  };

  const onClickEditTarget = (item: Target) => {
    if (onEdit) {
      onEdit(item);
    }
  };
  const onClickDeleteTarget = (item: Target) => {
    if (onDelete) {
      onDelete(item);
    }
  };

  const renderMenuItems = (target: Target) => {
    const items = [];
    items.push(
      <PopoverMenuItem
        key="View-Details"
        value="view-details"
        label="View Details"
        onClick={() => onClickTarget(target)}
        stopPropagation
        Icon={EyeIcon}
        className="text-Gray-3"
      />,
      <PopoverMenuItem
        key="Edit-Target"
        value="edit-target"
        label="Edit Target"
        onClick={() => onClickEditTarget(target)}
        stopPropagation
        Icon={EditIcon}
        className="text-Gray-3"
      />,
      <PopoverMenuItem
        key="Delete-Target"
        value="delete-target"
        label="Delete Target"
        onClick={() => onClickDeleteTarget(target)}
        stopPropagation
        Icon={BinIcon}
        className="text-system-alert"
      />,
    );
    return items;
  };

  return (
    <>
      {targets.map((item: Target) => {
        const { amount, total } = getTargetPeriodsAmountTotal(item);
        const isDeleting = deletingItemId === item.id;
        return (
          <div
            key={`Dashboard-TargetChartView-${item.id}`}
            className="bg-white relative w-[500px] h-[330px] rounded-card shadow-shadowCard hover:shadow-targetHover flex flex-col mr-4 mt-4 border border-transparent hover:border-Accent-4"
          >
            <div className="flex flex-1 flex-col py-4 space-y-2 w-full">
              <div className="flex flex-col px-6 space-y-4">
                <div className="flex flex-row space-x-1">
                  <div className="flex flex-col flex-1 h-12 max-h-12">
                    <div className="flex flex-row items-center h-6">
                      <TargetFeedName target={item} />
                    </div>
                    <div className="flex flex-row space-x-2 items-center h-6 max-h-6">
                      <EditorAvatar updater={item?.updater} />
                      <h2
                        id={`question-title-${item?.id}`}
                        className="mt-1 text-xs font-normal text-Gray-6"
                      >
                        {`${item.updater?.fullName ?? 'Unknown'} edited at ${dayjs(
                          item?.updatedAt ?? item?.lastInteraction,
                        ).format('MM/DD/YYYY')}`}
                      </h2>
                    </div>
                  </div>
                  <Menu as="div" className="relative inline-block z-20 text-left">
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
                    <PopoverMenu>{renderMenuItems(item)}</PopoverMenu>
                  </Menu>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row space-x-2.5 text-Gray-6">
                    <div className="flex flex-col items-start min-w-[70px] h-9 pr-1.5">
                      <div className="flex flex-row items-center space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-Green-400" />
                        <p className="text-2xs">Spend</p>
                      </div>
                      <p className="text-sm text-primary font-semibold mt-1">
                        {decimalLogic(total ?? '0', DecimalType.SummedNumbers)}
                      </p>
                    </div>
                    <div className="flex flex-col items-start min-w-[70px] h-9 pr-1.5">
                      <div className="flex flex-row items-center space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-Gray-6" />
                        <p className="text-2xs">Target To Date</p>
                      </div>
                      <p className="text-sm text-primary font-semibold mt-1">
                        {decimalLogic(amount ?? '0', DecimalType.SummedNumbers)}
                      </p>
                    </div>
                    <div className="flex flex-col items-start min-w-[70px] h-9 pr-1.5">
                      <div className="flex flex-row items-center space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-Gray-6" />
                        <p className="text-2xs">Overall Target</p>
                      </div>
                      <p className="text-sm text-primary font-semibold mt-1">
                        {decimalLogic(amount ?? '0', DecimalType.SummedNumbers)}
                      </p>
                    </div>
                  </div>
                  <TargetStatus type={TargetStatusType.OnTrack} />
                </div>
              </div>
              <div className="flex flex-1 flex-col px-4">
                <MiniChartView
                  target={item}
                  onEdit={() => undefined}
                  className=""
                  xAxisClass="font-normal text-2xs"
                />
              </div>
            </div>
            {isDeleting && (
              <div className="absolute flex justify-center items-center inset-0 rounded-card bg-black/10">
                <Loading color="Gray-3" />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default TargetWrapList;
