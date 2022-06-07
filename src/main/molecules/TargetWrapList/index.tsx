import React from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

import { Target, FeedType } from '@main/entity';
import MiniChartView from '@main/molecules/MiniChartView';
import { decimalLogic, DecimalType, getTargetPeriodsAmountTotal } from '@main/utils';
import routes from '@src/routes';
import TargetFeedName from '@main/atoms/TargetFeedName';
import EditorAvatar from '@main/atoms/EditorAvatar';

export interface TargetWrapListProps {
  targets: Target[];
}

const TargetWrapList: React.VFC<TargetWrapListProps> = ({ targets = [] }) => {
  const history = useHistory();
  const onClickTarget = (target: Target) => {
    history.push(
      `${(routes.Feed.path as string).replace(':id', `${target.id}?route=${FeedType.TargetFeed}`)}`,
    );
  };
  return (
    <>
      {targets.map((item: Target) => {
        const { amount, total } = getTargetPeriodsAmountTotal(item);
        return (
          <button
            type="button"
            onClick={() => onClickTarget(item)}
            key={`Dashboard-TargetChartView-${item.id}`}
            className="bg-white w-[500px] h-[330px] rounded-card shadow-shadowCard hover:shadow-targetHover flex flex-col mr-4 mt-4 border border-transparent hover:border-Accent-4"
          >
            <div className="flex flex-1 flex-col mb-2 py-4 space-y-2 w-full">
              <div className="flex flex-row pl-6 pr-2 space-x-1">
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
                <div className="flex flex-row mt-auto">
                  <div className="flex flex-col w-20 max-w-20 h-9">
                    <p className="text-2xs text-Gray-6">Spend</p>
                    <p className="text-sm text-primary font-semibold mt-1">
                      {decimalLogic(total ?? '0', DecimalType.SummedNumbers)}
                    </p>
                  </div>
                  <div className="flex flex-col w-20 max-w-20 h-9">
                    <p className="text-2xs text-Gray-6">Total Target</p>
                    <p className="text-sm text-primary font-semibold mt-1">
                      {decimalLogic(amount ?? '0', DecimalType.SummedNumbers)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col px-4.5">
                <MiniChartView
                  target={item}
                  onEdit={() => undefined}
                  className=""
                  xAxisClass="font-normal text-2xs"
                />
              </div>
            </div>
          </button>
        );
      })}
    </>
  );
};

export default TargetWrapList;
