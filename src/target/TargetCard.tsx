import { BinIcon, EditIcon, EyeIcon, MoreVerticalIcon } from '@/assets';
import Loading from '@/common/atoms/Loading';
import { Avatar } from '@/common/components';
import { useHandler } from '@/common/hooks';
import { ClassName } from '@/common/types';
import { distanceToNow } from '@/common/utils';
import PopoverMenu from '@/main/atoms/PopoverMenu';
import PopoverMenuItem from '@/main/atoms/PopoverMenuItem';
import TargetFeedName from '@/main/atoms/TargetFeedName';
import TargetStatus from '@/main/atoms/TargetStatus';
import { FeedType } from '@/main/entity';
import MiniChartView from '@/main/molecules/MiniChartView';
import {
  decimalLogic,
  DecimalType,
  getColorByText,
  getTargetPeriodsAmountTotal,
} from '@/main/utils';
import { Routes } from '@/routing/routes';
import { useDisclosure } from '@dwarvesf/react-hooks';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AddTargetModal } from './AddTargetModal';
import { AddTargetModalProps } from './AddTargetModal';
import { TargetApis } from './apis';
import { Target } from './types';

export type TargetCardProps = ClassName &
  Pick<AddTargetModalProps, 'onUpdateSuccess' | 'onDeleteSuccess'> & {
    data: Target;
    showColorfulHeading?: boolean;
  };

export const TargetCard = ({
  data,
  className,
  onUpdateSuccess,
  onDeleteSuccess,
  showColorfulHeading,
}: TargetCardProps) => {
  const history = useHistory();

  const department = data.department;

  const { isLoading: isDeletingTarget, handle: deleteTarget } = useHandler((targetId: number) =>
    TargetApis.delete(targetId),
  );

  const goToTargetDetails = () => {
    history.push(
      `${(Routes.Feed.path as string).replace(':id', `${data.id}?route=${FeedType.TargetFeed}`)}`,
    );
  };

  const { overallTarget, currentSpend, targetToDate, exceeding } =
    getTargetPeriodsAmountTotal(data);

  const addTargetModalDisclosure = useDisclosure();

  const headingColor = getColorByText(data.name, undefined, true);

  return (
    <div
      key={`Dashboard-TargetChartView-${data.id}`}
      className={clsx(
        'bg-white relative w-full overflow-hidden rounded-card shadow-shadowCard hover:shadow-targetHover flex flex-col border border-transparent hover:border-Accent-4',
        className,
      )}
    >
      {addTargetModalDisclosure.isOpen && (
        <AddTargetModal
          open={addTargetModalDisclosure.isOpen}
          onClose={addTargetModalDisclosure.onClose}
          onCancel={addTargetModalDisclosure.onOpen}
          target={data}
          departmentId={department?.id}
          onUpdateSuccess={onUpdateSuccess}
          onDeleteSuccess={onDeleteSuccess}
        />
      )}
      <div className="flex flex-1 flex-col pb-4 space-y-2 w-full">
        <div
          style={{ background: showColorfulHeading ? headingColor : undefined }}
          className="h-2 mb-4"
        />
        <div className="flex flex-col px-6 space-y-4">
          <div className="flex flex-row space-x-1">
            <div className="flex flex-col flex-1 h-12 max-h-12">
              <div className="flex justify-between items-center h-6">
                <TargetFeedName target={data} />
                <Menu as="div" className="relative inline-block z-20 text-left">
                  <div>
                    <Menu.Button className="-m-2 p-2 rounded-full flex datas-center text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Open options</span>
                      <MoreVerticalIcon
                        className="fill-current text-Gray-3 path-no-filled"
                        aria-hidden="true"
                        viewBox="0 0 15 15"
                      />
                    </Menu.Button>
                  </div>
                  <PopoverMenu>
                    <PopoverMenuItem
                      key="View-Details"
                      value="view-details"
                      label="View Details"
                      onClick={goToTargetDetails}
                      stopPropagation
                      Icon={EyeIcon}
                      className="text-Gray-3"
                    />
                    <PopoverMenuItem
                      key="Edit-Target"
                      value="edit-target"
                      label="Edit Target"
                      onClick={addTargetModalDisclosure.onOpen}
                      stopPropagation
                      Icon={EditIcon}
                      className="text-Gray-3"
                    />
                    {!data.isPrimary && (
                      <PopoverMenuItem
                        key="Delete-Target"
                        value="delete-target"
                        label="Delete Target"
                        onClick={() => deleteTarget(data.id)}
                        stopPropagation
                        Icon={BinIcon}
                        className="text-system-alert"
                      />
                    )}
                  </PopoverMenu>
                </Menu>
              </div>
              <div className="flex items-center gap-2 h-6 max-h-6 mt-2">
                <Avatar
                  size="sm"
                  fullName={data?.updatedBy?.fullName ?? ''}
                  src={data?.updatedBy?.avatar}
                />
                <span className="text-Gray-6 text-xs">
                  Last edited {distanceToNow(data?.updatedBy?.updatedAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row space-x-2.5 text-Gray-6">
              <div className="flex flex-col datas-start min-w-[70px] h-9 pr-1.5">
                <div className="flex items-center datas-center space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-Green-400" />
                  <p className="text-2xs">Spend</p>
                </div>
                <p className="text-sm text-primary font-semibold mt-1">
                  {decimalLogic(currentSpend ?? '0', DecimalType.SummedNumbers)}
                </p>
              </div>
              <div className="flex flex-col datas-start min-w-[70px] h-9 pr-1.5">
                <div className="flex items-center datas-center space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-Gray-6" />
                  <p className="text-2xs">Target To Date</p>
                </div>
                <p className="text-sm text-primary font-semibold mt-1">
                  {decimalLogic(targetToDate ?? '0', DecimalType.SummedNumbers)}
                </p>
              </div>
              <div className="flex flex-col datas-start min-w-[70px] h-9 pr-1.5">
                <div className="flex items-center datas-center space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-Gray-6" />
                  <p className="text-2xs">Overall Target</p>
                </div>
                <p className="text-sm text-primary font-semibold mt-1">
                  {decimalLogic(overallTarget ?? '0', DecimalType.SummedNumbers)}
                </p>
              </div>
            </div>
            {data?.trackingStatus && (
              <TargetStatus type={data?.trackingStatus} exceeding={exceeding} />
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col px-4">
          <MiniChartView
            target={data}
            onEdit={() => undefined}
            className=""
            xAxisClass="font-normal text-2xs"
          />
        </div>
      </div>
      {isDeletingTarget && (
        <div className="absolute flex justify-center datas-center inset-0 rounded-card bg-black/10">
          <Loading color="Gray-3" />
        </div>
      )}
    </div>
  );
};
