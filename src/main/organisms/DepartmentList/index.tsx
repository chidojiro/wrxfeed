import React from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Department } from '@main/entity';
import ListLoading from '@main/atoms/ListLoading';
import { DepartmentSection } from '@main/hooks/department.hook';
import { getDepartmentBgColor } from '@main/utils';

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
  const renderEmptyList = () => (
    <div className="text-left">
      <h3 className="mt-2 text-sm text-Gray-3">No teams</h3>
    </div>
  );

  const renderDeptSection = (dept: DepartmentSection) => {
    const deptBgColor = getDepartmentBgColor(dept?.name ?? '');
    return (
      <div key={dept.id}>
        <div
          aria-hidden="true"
          style={{ backgroundColor: deptBgColor }}
          className="flex items-center px-4 py-4 sm:px-6 cursor-pointer"
          onClick={() => onSelectRoot && onSelectRoot(dept)}
          onKeyDown={() => onSelectRoot && onSelectRoot(dept)}
        >
          <h3 className="text-sm text-white uppercase font-semibold">{dept.name || 'Unknown'}</h3>
        </div>
        {dept.children.length ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-sm">
            <ul className="divide-y divide-gray-200">
              {dept.children.map((child) => (
                <li key={child.id} className="px-4 py-4 sm:px-16">
                  <div
                    aria-hidden="true"
                    className="cursor-pointer w-full"
                    onClick={() => onSelect && onSelect(child)}
                    onKeyDown={() => onSelect && onSelect(child)}
                  >
                    <p className="ml-3 text-sm font-medium text-Gray-1">{child.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          renderEmptyList()
        )}
      </div>
    );
  };

  return (
    <InfiniteScroller
      className="pb-14 mr-0.5 overflow-scroll"
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <div className="overflow-hidden space-y-6 pb-5">{departments.map(renderDeptSection)}</div>
    </InfiniteScroller>
  );
};

export default DepartmentList;
