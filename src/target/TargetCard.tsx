import Loading from '@/common/atoms/Loading';
import { Avatar } from '@/common/components';
import { useHandler } from '@/common/hooks';
import { ClassName } from '@/common/types';
import { distanceToNow } from '@/common/utils';
import TargetFeedName from '@/main/atoms/TargetFeedName';
import TargetStatus from '@/main/atoms/TargetStatus';
import { FeedType } from '@/main/entity';
import { OptionsButton } from '@/main/molecules';
import MiniChartView from '@/main/molecules/MiniChartView';
import { getColorByText, getDisplayUsdAmount, getTargetPeriodsAmountTotal } from '@/main/utils';
import { Routes } from '@/routing/routes';
import { useDisclosure } from '@dwarvesf/react-hooks';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AddTargetModal, AddTargetModalProps } from './AddTargetModal';
import { TargetApis } from './apis';
import { Target } from './types';

export type TargetCardProps = ClassName &
  Pick<AddTargetModalProps, 'onUpdateSuccess' | 'onDeleteSuccess' | 'hidePropertyDropdowns'> & {
    target: Target;
    showColorfulHeading?: boolean;
  };

export const TargetCard = ({
  target,
  className,
  onUpdateSuccess,
  onDeleteSuccess,
  showColorfulHeading = true,
  hidePropertyDropdowns,
}: TargetCardProps) => {
  const history = useHistory();
  const department = target.department;

  const { isLoading: isDeletingTarget, handle: deleteTarget } = useHandler((targetId: number) =>
    TargetApis.delete(targetId),
  );

  const goToTargetDetails = () => {
    history.push(
      `${(Routes.Feed.path as string).replace(':id', `${target.id}?route=${FeedType.TargetFeed}`)}`,
    );
  };

  const { overallTarget, currentSpend, targetToDate, exceeding } =
    getTargetPeriodsAmountTotal(target);

  const addTargetModalDisclosure = useDisclosure();

  const headingColor = getColorByText(target.name, undefined, true);

  return (
    <button
      onClick={goToTargetDetails}
      type="button"
      key={`Dashboard-TargetChartView-${target.id}`}
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
          target={target}
          departmentId={department?.id}
          onUpdateSuccess={onUpdateSuccess}
          onDeleteSuccess={onDeleteSuccess}
          hidePropertyDropdowns={hidePropertyDropdowns}
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
                <TargetFeedName target={target} />
                <OptionsButton
                  onViewClick={goToTargetDetails}
                  onEditClick={addTargetModalDisclosure.onOpen}
                  onDeleteClick={target.isPrimary ? undefined : () => deleteTarget(target.id)}
                />
              </div>
              <div className="flex items-center gap-2 h-6 max-h-6 mt-2">
                <Avatar
                  size="sm"
                  fullName={target.updatedBy?.fullName ?? ''}
                  src={target.updatedBy?.avatar}
                />
                <span className="text-Gray-6 text-xs">
                  Last edited {distanceToNow(target.updatedBy?.updatedAt)}
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
                  {getDisplayUsdAmount(currentSpend)}
                </p>
              </div>
              <div className="flex flex-col datas-start min-w-[70px] h-9 pr-1.5">
                <div className="flex items-center datas-center space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-Gray-6" />
                  <p className="text-2xs">Target To Date</p>
                </div>
                <p className="text-sm text-primary font-semibold mt-1">
                  {getDisplayUsdAmount(targetToDate)}
                </p>
              </div>
              <div className="flex flex-col datas-start min-w-[70px] h-9 pr-1.5">
                <div className="flex items-center datas-center space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-Gray-6" />
                  <p className="text-2xs">Overall Target</p>
                </div>
                <p className="text-sm text-primary font-semibold mt-1">
                  {getDisplayUsdAmount(overallTarget)}
                </p>
              </div>
            </div>
            {target.trackingStatus && (
              <TargetStatus type={target.trackingStatus} exceeding={exceeding} />
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col px-4">
          <MiniChartView target={target} xAxisClass="font-normal text-2xs" />
        </div>
      </div>
      {isDeletingTarget && (
        <div className="absolute flex justify-center datas-center inset-0 rounded-card bg-black/10">
          <Loading color="Gray-3" />
        </div>
      )}
    </button>
  );
};
