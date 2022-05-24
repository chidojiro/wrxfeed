import React, { CSSProperties } from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Target } from '@main/entity';
import ListLoading from '@main/atoms/ListLoading';
import ListEndComponent from '@main/atoms/ListEndComponent';
import TargetChartView from '@main/molecules/TargetChartView';

interface TargetSectionListProps {
  style?: CSSProperties;
  data: Target[];
  isLoading?: boolean;
  enableLazyLoad?: boolean;
  hasMore?: boolean;
  endMessage?: string;
  onLoadMore?: () => void;
  EndComponent?: React.FunctionComponent | undefined;
  EmptyStateComponent?: React.FunctionComponent | undefined;
}

export enum FeedItemType {
  target = 'target',
  transaction = 'transaction',
}

const TargetSectionList: React.VFC<TargetSectionListProps> = ({
  style,
  data,
  isLoading,
  enableLazyLoad,
  hasMore,
  endMessage,
  onLoadMore,
  EndComponent,
  EmptyStateComponent,
}) => {
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

  return (
    <InfiniteScroller
      className="flex flex-1 flex-col"
      style={style}
      threshold={500}
      onLoadMore={() => enableLazyLoad && onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <ul className="flex flex-1 flex-row flex-wrap">
        {data.map((item) => {
          return (
            <div
              key={`Dashboard-TargetChartView-${item.id}`}
              className="bg-white w-[500px] h-[292px] rounded-card shadow-shadowCard hover:shadow-targetHover flex flex-col mx-1 overflow-hidden my-3 border border-transparent hover:border-Accent-4"
            >
              <div
                className="flex h-2 w-full rounded-t-card"
                style={{
                  background: gradientBg,
                }}
              />
              <div className="flex flex-1 flex-col overflow-hidden mb-2">
                <TargetChartView target={item} onEdit={() => undefined} />
              </div>
            </div>
          );
        })}
      </ul>
      {!isLoading && !data.length && renderEmptyList}
      {!isLoading && data.length > 0 && !hasMore && renderEndComponent}
    </InfiniteScroller>
  );
};

export default TargetSectionList;
