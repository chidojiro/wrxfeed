import React from 'react';
import { useDisclosure } from '@dwarvesf/react-hooks';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import Loading from '@/common/atoms/Loading';
import { Avatar } from '@/common/components';
import { useHandler } from '@/common/hooks';
import { ClassName } from '@/common/types';
import { distanceToNow } from '@/common/utils';
import TargetFeedName from '@/main/atoms/TargetFeedName';
import TargetStatus from '@/main/atoms/TargetStatus';
import MiniChartView from '@/main/molecules/MiniChartView';
import {
  decimalLogic,
  DecimalType,
  getColorByText,
  getTargetPeriodsAmountTotal,
} from '@/main/utils';
import { AddTargetModal } from './AddTargetModal';
import { AddTargetModalProps } from './AddTargetModal';
import { TargetApis } from './apis';
import { Target } from './types';
import { Routes } from '@/routing/routes';
import { FeedType } from '@/main/entity';

export type TargetCardProps = ClassName &
  Pick<AddTargetModalProps, 'onUpdateSuccess' | 'onDeleteSuccess'> & {
    data: Target;
    showColorfulHeading?: boolean;
    clickable?: boolean;
  };

export const TargetCard = ({
  data,
  className,
  onUpdateSuccess,
  onDeleteSuccess,
  clickable = true,
  showColorfulHeading = true,
}: TargetCardProps) => {
  const department = data.department;
  const history = useHistory();

  const { isLoading: isDeletingTarget } = useHandler((targetId: number) =>
    TargetApis.delete(targetId),
  );

  const goToTargetDetails = () => {
    if (!clickable) {
      return;
    }
    history.push(
      `${(Routes.Feed.path as string).replace(':id', `${data.id}?route=${FeedType.TargetFeed}`)}`,
    );
  };

  const { overallTarget, currentSpend, targetToDate, exceeding } =
    getTargetPeriodsAmountTotal(data);

  const addTargetModalDisclosure = useDisclosure();

  const headingColor = getColorByText(data.name, undefined, true);

  return (
    <button
      disabled={!clickable}
      onClick={goToTargetDetails}
      type="button"
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
    </button>
  );
};
