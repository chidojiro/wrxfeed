import Loading from '@/common/atoms/Loading';
import { useHandler } from '@/common/hooks';
import { distanceToNow } from '@/common/utils';
import EditorAvatar from '@/main/atoms/EditorAvatar';
import TargetFeedName from '@/main/atoms/TargetFeedName';
import TargetStatus from '@/main/atoms/TargetStatus';
import { FeedType } from '@/main/entity';
import { OptionsButton } from '@/main/molecules';
import MiniChartView from '@/main/molecules/MiniChartView';
import { getDisplayCurrency, getTargetPeriodsAmountTotal } from '@/main/utils';
import { Routes } from '@/routing/routes';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { TargetApis } from './apis';
import { Target } from './types';

type TargetWrapListProps = {
  data: Target;
  onEditClick?: (target: Target) => void;
  onDeleteSuccess?: (id: number) => void;
};

export const TargetWrapListItem = React.memo(
  ({ data, onEditClick, onDeleteSuccess }: TargetWrapListProps) => {
    const { overallTarget, currentSpend, targetToDate, exceeding } =
      getTargetPeriodsAmountTotal(data);

    const history = useHistory();

    const handleViewClick = () => {
      history.push(
        `${(Routes.Feed.path as string).replace(':id', `${data.id}?route=${FeedType.TargetFeed}`)}`,
      );
    };

    const { isLoading: isDeleting, handle: deleteTarget } = useHandler(
      (id: number) => TargetApis.delete(id),
      { onSuccess: () => onDeleteSuccess?.(data.id) },
    );

    return (
      <button
        type="button"
        onClick={handleViewClick}
        key={`Dashboard-TargetChartView-${data.id}`}
        className="bg-white relative w-[500px] h-[330px] rounded-card shadow-shadowCard hover:shadow-targetHover flex flex-col mr-4 mt-4 border border-transparent hover:border-Accent-4"
      >
        <div className="flex flex-1 flex-col py-4 space-y-2 w-full">
          <div className="flex flex-col px-6 space-y-4">
            <div className="flex flex-row space-x-1">
              <div className="flex flex-col flex-1 h-12 max-h-12">
                <div className="flex flex-row items-center h-6">
                  <TargetFeedName target={data} />
                </div>
                <div className="flex flex-row space-x-2 items-center h-6 max-h-6">
                  <EditorAvatar updater={data?.updatedBy} />
                  <h2
                    id={`question-title-${data?.id}`}
                    className="mt-1 text-xs font-normal text-Gray-6"
                  >
                    {`edited ${distanceToNow(data?.updatedAt ?? data?.lastInteraction)}`}
                  </h2>
                </div>
              </div>
              <OptionsButton
                onViewClick={handleViewClick}
                onEditClick={() => onEditClick?.(data)}
                onDeleteClick={() => deleteTarget(data.id)}
              />
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-2.5 text-Gray-6">
                <div className="flex flex-col items-start min-w-[70px] h-9 pr-1.5">
                  <div className="flex flex-row items-center space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-Green-400" />
                    <p className="text-2xs">Spend</p>
                  </div>
                  <p className="text-sm text-primary font-semibold mt-1">
                    {getDisplayCurrency(currentSpend)}
                  </p>
                </div>
                <div className="flex flex-col items-start min-w-[70px] h-9 pr-1.5">
                  <div className="flex flex-row items-center space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-Gray-6" />
                    <p className="text-2xs">Target To Date</p>
                  </div>
                  <p className="text-sm text-primary font-semibold mt-1">
                    {getDisplayCurrency(targetToDate)}
                  </p>
                </div>
                <div className="flex flex-col items-start min-w-[70px] h-9 pr-1.5">
                  <div className="flex flex-row items-center space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-Gray-6" />
                    <p className="text-2xs">Overall Target</p>
                  </div>
                  <p className="text-sm text-primary font-semibold mt-1">
                    {getDisplayCurrency(overallTarget)}
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
        {isDeleting && (
          <div className="absolute flex justify-center items-center inset-0 rounded-card bg-black/10">
            <Loading color="Gray-3" />
          </div>
        )}
      </button>
    );
  },
);

TargetWrapListItem.displayName = 'TargetWrapListItem';
