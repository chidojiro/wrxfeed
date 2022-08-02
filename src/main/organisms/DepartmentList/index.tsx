import InfiniteScroller from '@/common/atoms/InfiniteScroller';
import ListLoading from '@/main/atoms/ListLoading';
import { Department } from '@/main/entity';
import { DepartmentSection } from '@/main/hooks/department.hook';
import DepartmentItem from '@/main/molecules/DepartmentItem';
import RootDepartmentHeader from '@/main/molecules/RootDepartmentHeader';
import { useProfile } from '@/profile/useProfile';
import mixpanel from 'mixpanel-browser';
import React, { useEffect } from 'react';

interface DepartmentListProps {
  departments: DepartmentSection[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  onSelect?: (dept: Department) => void;
  onSelectRoot?: (dept: Department) => void;
}

const DepartmentList: React.FC<DepartmentListProps> = ({
  departments,
  isLoading,
  onLoadMore,
  onSelect,
  onSelectRoot,
}) => {
  const { profile } = useProfile();

  useEffect(() => {
    mixpanel.track('Team Directory View', {
      user_id: profile?.id,
      email: profile?.email,
      company: profile?.company?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDeptSection = (dept: DepartmentSection) => (
    <div className="shadow-md rounded-card overflow-hidden" key={dept.id}>
      <RootDepartmentHeader
        item={dept}
        department={dept}
        onClick={() => onSelectRoot && onSelectRoot(dept)}
      />
      {!!dept.children.length && (
        <div className="bg-white">
          <ul className="divide-y divide-gray-200">
            {dept.children.map((child) => (
              <li key={child.id} className="sm:pl-4">
                <DepartmentItem item={child} onClick={() => onSelect && onSelect(child)} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <InfiniteScroller
      className="pb-14 mr-0.5 overflow-hidden px-2 sm:px-0"
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <div className="overflow-hidden space-y-6 pb-5">{departments.map(renderDeptSection)}</div>
    </InfiniteScroller>
  );
};

export default DepartmentList;
