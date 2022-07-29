import Loading from '@/common/atoms/Loading';
import { Avatar, Button } from '@/common/components';
import { useHandler } from '@/common/hooks';
import { ClassName } from '@/common/types';
import { distanceToNow } from '@/common/utils';
import TargetFeedName from '@/main/atoms/TargetFeedName';
import TargetStatus from '@/main/atoms/TargetStatus';
import { FeedRouteType } from '@/main/entity';
import { OptionsButton } from '@/main/molecules';
import { getColorByText, getDisplayUsdAmount, getTargetPeriodsAmountTotal } from '@/main/utils';
import { Routes } from '@/routing/routes';
import { useDisclosure } from '@dwarvesf/react-hooks';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AddTargetModal, AddTargetModalProps } from './AddTargetModal';
import { AddTargetModalWithDefaultApisProps } from './AddTargetModal/AddTargetModal';
import { TargetApis } from './apis';
import { MiniChartView } from './MiniChartView';
import { Target } from './types';

export type TargetCardProps = ClassName &
  Required<Pick<AddTargetModalWithDefaultApisProps, 'onUpdateSuccess' | 'onDeleteSuccess'>> &
  Pick<AddTargetModalProps, 'hidePropertyDropdowns'> & {
    target: Target;
    showColorfulHeading?: boolean;
    deletable?: boolean;
    chartContainerClass?: string;
  };

export const TargetCard = ({
  target,
  className,
  onUpdateSuccess,
  onDeleteSuccess,
  showColorfulHeading = true,
  hidePropertyDropdowns,
  deletable = true,
  chartContainerClass = 'flex-1',
}: TargetCardProps) => {
  const history = useHistory();
  const department = target?.department;
  const addTargetModalDisclosure = useDisclosure();
  const { overallTarget = 0, currentSpend = 0, targetToDate } = getTargetPeriodsAmountTotal(target);

  const { isLoading: isDeletingTarget, handle: deleteTarget } = useHandler((targetId: number) =>
    TargetApis.delete(targetId),
  );

  const goToTargetDetails = () => {
    history.push(
      `${(Routes.Feed.path as string).replace(
        ':id',
        `${target?.id}?route=${FeedRouteType.TargetFeed}`,
      )}`,
    );
  };

  const handleSetTarget = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    addTargetModalDisclosure.onOpen();
    e.stopPropagation();
  };

  const teamHeaderColor: string = React.useMemo(
    () => getColorByText(department?.name ?? '', department?.id, true),
    [department?.id, department?.name],
  );

  const handleDeleteClick = async () => {
    await deleteTarget(target?.id);
    onDeleteSuccess(target?.id);
  };

  return (
    <>
      <AddTargetModal
        open={addTargetModalDisclosure.isOpen}
        onClose={addTargetModalDisclosure.onClose}
        onCancel={addTargetModalDisclosure.onClose}
        target={target}
        departmentId={department?.id}
        onUpdateSuccess={onUpdateSuccess}
        onDeleteSuccess={onDeleteSuccess}
        hidePropertyDropdowns={hidePropertyDropdowns}
      />
      <Button
        onClick={goToTargetDetails}
        key={target?.id}
        className={clsx(
          'bg-white relative w-full rounded-card shadow-shadowCard hover:shadow-targetHover flex flex-col border border-transparent hover:border-Accent-4',
          className,
        )}
      >
        <div className="flex flex-1 flex-col pb-4 space-y-2 w-full">
          <div
            style={{ background: showColorfulHeading ? teamHeaderColor : undefined }}
            className="h-2 rounded-t-card"
          />
          <div className="flex flex-col px-6 space-y-4">
            <div className="flex flex-row space-x-1">
              <div className="flex flex-col flex-1 h-12 max-h-12">
                <div className="flex justify-between items-center h-6">
                  <TargetFeedName target={target} />
                  <OptionsButton
                    onViewClick={goToTargetDetails}
                    onEditClick={addTargetModalDisclosure.onOpen}
                    onDeleteClick={!target?.isPrimary && deletable ? handleDeleteClick : undefined}
                  />
                </div>
                <div className="flex items-center gap-2 h-6 max-h-6 mt-2">
                  <Avatar
                    size="sm"
                    fullName={target?.updatedBy?.fullName ?? ''}
                    src={target?.updatedBy?.avatar}
                  />
                  <span className="text-Gray-6 text-xs">
                    Last edited {distanceToNow(target?.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-2.5 text-Gray-6 min-h-9">
                <div className="flex flex-col items-start min-w-[70px] pr-1.5">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-Green-400" />
                    <p className="text-2xs">Spend</p>
                  </div>
                  <p className="text-sm text-primary font-semibold mt-1">
                    {getDisplayUsdAmount(currentSpend)}
                  </p>
                </div>
                <div className="flex flex-col items-start min-w-[70px] pr-1.5">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-Gray-6" />
                    <p className="text-2xs">Target To Date</p>
                  </div>
                  <p className="text-sm text-primary font-semibold mt-1">
                    {getDisplayUsdAmount(targetToDate)}
                  </p>
                </div>
                <div className="flex flex-col items-start min-w-[70px] pr-1.5">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-Gray-6" />
                    <p className="text-2xs">Overall Target</p>
                  </div>
                  <p className="text-sm text-primary font-semibold mt-1">
                    {getDisplayUsdAmount(overallTarget)}
                  </p>
                </div>
              </div>
              {target.trackingStatus && (
                <TargetStatus
                  type={target.trackingStatus}
                  target={target}
                  onSetTarget={handleSetTarget}
                />
              )}
            </div>
          </div>
          <div className={clsx('flex w-full flex-col px-5', chartContainerClass)}>
            <MiniChartView
              target={target}
              overallTarget={overallTarget}
              className="overflow-hidden"
              xAxisClass="font-normal text-2xs"
            />
          </div>
        </div>
        {isDeletingTarget && (
          <div className="absolute flex justify-center items-center inset-0 rounded-card bg-black/10">
            <Loading color="Gray-3" />
          </div>
        )}
      </Button>
    </>
  );
};
