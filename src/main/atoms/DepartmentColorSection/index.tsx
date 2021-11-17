import { Department } from '@main/entity';
import { getDepartmentBgColor } from '@main/utils';
import React, { useMemo } from 'react';

interface DepartmentColorSectionProps {
  department?: Department;
  onClick?: (dept: Department) => void;
}

const DepartmentColorSection: React.VFC<DepartmentColorSectionProps> = ({
  department,
  onClick,
}) => {
  const deptBgClass = useMemo(
    () => getDepartmentBgColor(department?.name ?? ''),
    [department?.name],
  );

  const handleClick = () => {
    if (onClick && department) {
      onClick(department);
    }
  };
  return (
    <div style={{ backgroundColor: deptBgClass }} className="w-1/5 min-w-[94px] p-4">
      <h2
        aria-hidden="true"
        className="text-base text-left font-semibold text-white cursor-pointer py-2 hover:underline"
        onClick={handleClick}
      >
        {department?.name ?? 'unknown'}
      </h2>
    </div>
  );
};

export default DepartmentColorSection;
