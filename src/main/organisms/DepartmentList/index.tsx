import React from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Department } from '@main/entity';
import TransactionLoading from '@main/atoms/TransactionLoading';
import TransactionListEnd from '@main/atoms/TransactionListEnd';

interface DepartmentListProps {
  departments: Department[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  onSelect?: (dept: Department) => void;
}

const DepartmentList: React.VFC<DepartmentListProps> = ({
  departments,
  isLoading,
  onLoadMore,
  hasMore,
  onSelect,
}) => {
  return (
    <InfiniteScroller
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'scroll',
        paddingTop: 52,
        paddingBottom: 52,
        marginRight: 2,
      }}
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<TransactionLoading />}
    >
      <ul className="pb-4 divide-y divide-Gray-8 rounded-sm">
        {departments.map((department) => (
          <li key={department.id} className="flex bg-white">
            <div
              aria-hidden="true"
              className="py-4 cursor-pointer w-full"
              onClick={() => onSelect && onSelect(department)}
              onKeyDown={() => onSelect && onSelect(department)}
            >
              <p className="ml-3 text-sm font-medium text-Gray-1">{department.name}</p>
            </div>
          </li>
        ))}
      </ul>
      {!isLoading && !hasMore && <TransactionListEnd />}
    </InfiniteScroller>
  );
};

export default DepartmentList;
