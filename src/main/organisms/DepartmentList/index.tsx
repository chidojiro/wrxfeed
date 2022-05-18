import React, { useEffect } from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Department } from '@main/entity';
import ListLoading from '@main/atoms/ListLoading';
import { DepartmentSection } from '@main/hooks/department.hook';
import DirectoryItem from '@main/molecules/DirectoryItem';
import RootDepartmentHeader from '@main/molecules/RootDepartmentHeader';
import { useSubscription } from '@main/hooks/subscription.hook';

import mixpanel from 'mixpanel-browser';
import { useIdentity } from '@identity/hooks';

interface DepartmentListProps {
  departments: DepartmentSection[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  onSelect?: (dept: Department) => void;
  onSelectRoot?: (dept: Department) => void;
}

const DepartmentList: React.VFC<DepartmentListProps> = ({
  departments,
  isLoading,
  onLoadMore,
  onSelect,
  onSelectRoot,
}) => {
  const { subscribe, batchSubscribe, unsubscribe, batchUnsubscribe, isFollowing } =
    useSubscription();

  const identity = useIdentity();

  useEffect(() => {
    mixpanel.track('Team Directory View', {
      source: 'Team Directory View',
      user_id: identity?.id,
      email: identity?.email,
      company: identity?.company?.id,
    });
  }, []);

  const renderDeptSection = (dept: DepartmentSection) => (
    <div className="shadow-md" key={dept.id}>
      <RootDepartmentHeader
        item={dept}
        isFollowing={isFollowing('departments', dept)}
        onClick={() => onSelectRoot && onSelectRoot(dept)}
        onFollow={() => batchSubscribe({ departments: [dept, ...dept.children] })}
        onUnfollow={() => batchUnsubscribe({ departments: [dept, ...dept.children] })}
      />
      {!!dept.children.length && (
        <div className="bg-white overflow-hidden sm:rounded-sm">
          <ul className="divide-y divide-gray-200">
            {dept.children.map((child) => (
              <li key={child.id} className="px-4 py-4 sm:pl-16">
                <DirectoryItem
                  item={child}
                  isFollowing={isFollowing('departments', child)}
                  onClick={() => onSelect && onSelect(child)}
                  onFollow={() => subscribe('departments', child)}
                  onUnfollow={() => unsubscribe('departments', child)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <InfiniteScroller
      className="pb-14 mr-0.5 overflow-hidden"
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <div className="overflow-hidden space-y-6 pb-5">{departments.map(renderDeptSection)}</div>
    </InfiniteScroller>
  );
};

export default DepartmentList;
