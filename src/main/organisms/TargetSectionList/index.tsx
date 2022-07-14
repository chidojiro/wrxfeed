import InfiniteScroller from '@/common/atoms/InfiniteScroller';
import { GET_TARGETS_DASHBOARD_LIMIT } from '@/config';
import ListEndComponent from '@/main/atoms/ListEndComponent';
import ListLoading from '@/main/atoms/ListLoading';
import { useTarget } from '@/main/hooks';
import { filterTargetsToTargetByTeam } from '@/main/utils';
import { TeamTargetSection } from '@/target/TeamTargetSection';
import { TargetByTeam, TargetFilter } from '@/target/types';
import React, { CSSProperties } from 'react';

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

const TargetSectionList: React.FC<TargetSectionListProps> = ({
  style,
  enableLoadMore,
  endMessage,
  EndComponent,
  EmptyStateComponent,
}) => {
  const [filter, setFilter] = React.useState<TargetFilter>(initFilter);
  const { targets, hasMore, isGetTargets } = useTarget({ filter });

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
      LoadingComponent={<ListLoading className="mt-4" />}
    >
      <ul className="flex flex-1 flex-col mb-2">
        {targetByTeam.map((item: TargetByTeam) => (
          <TeamTargetSection
            departmentId={item.department.id}
            key={`targets-by-team-${item?.department?.id}`}
          />
        ))}
      </ul>
      {!isGetTargets && !targetByTeam.length && renderEmptyList}
      {!isGetTargets && targetByTeam.length > 0 && !hasMore && renderEndComponent}
    </InfiniteScroller>
  );
};

export default TargetSectionList;
