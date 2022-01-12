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
  const departmentName = department?.parent?.name ?? department?.name ?? 'unknown';
  const deptBgClass = useMemo(() => getDepartmentBgColor(departmentName ?? ''), [departmentName]);

  const handleClick = () => {
    if (onClick && department) {
      onClick(department);
    }
  };
  return (
    <div style={{ backgroundColor: deptBgClass }} className="w-1/5 min-w-[94px] p-4">
      <h2
        style={{ textOverflow: 'ellipsis' }}
        aria-hidden="true"
        className="text-base text-left font-semibold text-white cursor-pointer py-2 hover:underline min-w-[50px] text-ellipsis overflow-hidden"
        onClick={handleClick}
      >
        {departmentName}
      </h2>
    </div>
  );
};

export default DepartmentColorSection;
