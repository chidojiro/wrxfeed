import { Department } from '@/main/entity';
import { getColorByText } from '@/main/utils';
import { ToggleFollowButton } from '@/subscription/ToggleFollowButton';
import React, { MouseEventHandler } from 'react';

interface DirectoryItem {
  item: Department;
  onClick?: MouseEventHandler<HTMLDivElement>;
  department: Department;
}

const RootDepartmentHeader = ({ item, onClick, department }: DirectoryItem) => {
  const deptBgColor = React.useMemo(() => getColorByText(item?.name ?? '', item.id, true), [item]);

  return (
    <div
      aria-hidden="true"
      style={{
        background: deptBgColor,
      }}
      className="flex justify-between items-center px-4 py-4 sm:px-6 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-sm text-white uppercase font-semibold">{item.name || 'Unknown'}</h3>
      <ToggleFollowButton colorScheme="white" type="departments" item={department} />
    </div>
  );
};

export default RootDepartmentHeader;
