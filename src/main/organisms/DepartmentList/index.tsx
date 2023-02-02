import InfiniteScroller from '@/common/atoms/InfiniteScroller';
import { useMountEffect } from '@/common/hooks';
import ListLoading from '@/main/atoms/ListLoading';
import { Department } from '@/main/entity';
import DepartmentItem from '@/main/molecules/DepartmentItem';
import RootDepartmentHeader from '@/main/molecules/RootDepartmentHeader';
import { identifyMixPanelUserProfile } from '@/mixpanel/useMixPanel';
import { useProfile } from '@/profile/useProfile';
import mixpanel from 'mixpanel-browser';
import React from 'react';

interface DepartmentListProps {
  departments: Department[];
  onSelect?: (dept: Department) => void;
  onSelectRoot?: (dept: Department) => void;
}

const DepartmentList: React.FC<DepartmentListProps> = ({ departments, onSelect, onSelectRoot }) => {
  const { profile } = useProfile();

  useMountEffect(() => {
    mixpanel.track('Team Directory View', {
      user_id: profile?.id,
      email: profile?.email,
      company_id: profile?.company?.id,
    });
    identifyMixPanelUserProfile(profile);
  });

  const renderDeptSection = (dept: Department) => (
    <div className="shadow-md rounded-card overflow-hidden" key={dept.id}>
      <RootDepartmentHeader
        item={dept}
        department={dept}
        onClick={() => onSelectRoot && onSelectRoot(dept)}
      />
      {!!dept.children?.length && (
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

  return <div className="overflow-hidden space-y-6 pb-5">{departments.map(renderDeptSection)}</div>;
};

export default DepartmentList;
