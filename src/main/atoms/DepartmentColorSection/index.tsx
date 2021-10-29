import { Department } from '@main/entity';
import { getDepartmentBgColor } from '@main/utils';
import React, { useMemo } from 'react';

interface DepartmentColorSectionProps {
  department?: Department;
  onClick?: (id: number) => void;
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
    if (onClick && department?.id) {
      onClick(department?.id);
    }
  };
  return (
    <div style={{ backgroundColor: deptBgClass }} className="w-1/5 min-w-[94px] py-4 px-2.5">
      <h2
        aria-hidden="true"
        className="text-base text-left font-semibold text-white py-2"
        onClick={handleClick}
      >
        {department?.name ?? 'unknown'}
      </h2>
    </div>
  );
};

export default DepartmentColorSection;
