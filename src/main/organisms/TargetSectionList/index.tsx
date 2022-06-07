import React, { CSSProperties } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Target, TargetByTeam, FeedType } from '@main/entity';
import ListLoading from '@main/atoms/ListLoading';
import ListEndComponent from '@main/atoms/ListEndComponent';
import MiniChartView from '@main/molecules/MiniChartView';
import EditorAvatar from '@main/atoms/EditorAvatar';
import {
  decimalLogic,
  DecimalType,
  getTargetPeriodsAmountTotal,
  filterTargetsToTargetByTeam,
} from '@main/utils';
import TargetFeedName from '@main/atoms/TargetFeedName';
import { TeamIcon } from '@assets';
import routes from '@src/routes';
import { useTarget } from '@main/hooks';
import { TargetFilter } from '@api/types';
import { GET_TARGETS_DASHBOARD_LIMIT } from '@src/config';

const initFilter: TargetFilter = {
  offset: 0,
  limit: GET_TARGETS_DASHBOARD_LIMIT,
  forYou: 1,
  year: new Date().getFullYear(),
  timestamp: Date.now(),
};

interface TargetSectionListProps {
  style?: CSSProperties;
  enableLoadMore?: boolean;
  endMessage?: string;
  EndComponent?: React.FunctionComponent | undefined;
  EmptyStateComponent?: React.FunctionComponent | undefined;
}

export enum FeedItemType {
  target = 'target',
  transaction = 'transaction',
}

const TargetSectionList: React.VFC<TargetSectionListProps> = ({
  style,
  enableLoadMore,
  endMessage,
  EndComponent,
  EmptyStateComponent,
}) => {
  const history = useHistory();

  const [filter, setFilter] = React.useState<TargetFilter>(initFilter);
  const { targets, hasMore, isGetTargets } = useTarget(filter);

  const targetByTeam = React.useMemo(() => {
    return filterTargetsToTargetByTeam(targets);
  }, [targets]);

  const handleLoadMore = React.useCallback(() => {
    if (!hasMore || isGetTargets) return;
    setFilter((prevFilter) => ({
      ...prevFilter,
      limit: prevFilter?.limit ?? GET_TARGETS_DASHBOARD_LIMIT,
      offset: (prevFilter?.offset ?? 0) + (prevFilter?.limit ?? GET_TARGETS_DASHBOARD_LIMIT),
    }));
  }, [hasMore, isGetTargets]);

  const renderEmptyList = EmptyStateComponent ? (
    <EmptyStateComponent />
  ) : (
    <div className="pb-2 sm:pb-5 text-center">
      <svg
        className="mx-auto h-8 w-8 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
      <h3 className="mt-2 text-sm text-Gray-3">No targets now!</h3>
    </div>
  );

  const renderEndComponent = EndComponent ? (
    <EndComponent />
  ) : (
    <ListEndComponent message={endMessage} />
  );
  const gradientBg = 'linear-gradient(125.45deg, #CA77B3 18.62%, #514EE7 74.47%)';

  const onClickTarget = (target: Target) => {
    history.push(
      `${(routes.Feed.path as string).replace(':id', `${target.id}?route=${FeedType.TargetFeed}`)}`,
    );
  };

  const renderTargetsByTeam = (targetsByTeam: Target[]) => {
    return (
      <>
        {targetsByTeam.map((item: Target) => {
          const { amount, total } = getTargetPeriodsAmountTotal(item);
          return (
            <button
              type="button"
              onClick={() => onClickTarget(item)}
              key={`Dashboard-TargetChartView-${item.id}`}
              className="bg-white w-[500px] h-[292px] rounded-card shadow-shadowCard hover:shadow-targetHover flex flex-col mx-1 mb-6 border border-transparent hover:border-Accent-4"
            >
              <div className="flex h-2 w-full rounded-t-card" style={{ background: gradientBg }} />
              <div className="flex flex-1 flex-col mb-2 space-y-2 w-full">
                <div className="flex flex-row pl-6 pr-2 mt-[7px] space-x-1">
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

  return (
    <InfiniteScroller
      className="flex flex-1 flex-col"
      style={style}
      threshold={500}
      onLoadMore={() => {
        if (enableLoadMore && handleLoadMore) {
          handleLoadMore();
        }
      }}
      isLoading={isGetTargets}
      LoadingComponent={<ListLoading />}
    >
      <ul className="flex flex-1 flex-col">
        {targetByTeam.map((item: TargetByTeam) => {
          return (
            <div
              className="flex flex-col space-y-2"
              key={`targets-by-team-${item?.department?.id}`}
            >
              <div className="flex flex-row items-center px-2 space-x-2 h-7 max-h-7">
                <TeamIcon
                  className="w-4 h-4 fill-current path-no-filled text-Gray-3 opacity-100"
                  aria-hidden="true"
                  width={16}
                  height={16}
                />
                <p className="text-Gray-3 font-normal">{item?.department?.name}</p>
              </div>
              <div className="flex flex-1 flex-row flex-wrap">
                {renderTargetsByTeam(item?.targets)}
              </div>
            </div>
          );
        })}
      </ul>
      {!isGetTargets && !targetByTeam.length && renderEmptyList}
      {!isGetTargets && targetByTeam.length > 0 && !hasMore && renderEndComponent}
    </InfiniteScroller>
  );
};

export default TargetSectionList;
