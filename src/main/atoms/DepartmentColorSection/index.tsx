import { Department } from '@main/entity';
import { getDepartmentBgColor } from '@main/utils';
import React, { useMemo } from 'react';

interface DepartmentColorSectionProps {
  department: Department;
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
  return (
    <div style={{ backgroundColor: deptBgClass }} className="w-1/5 min-w-[94px] py-4 px-2.5">
      <h2 className="text-2xs font-semibold text-white py-2">
        <button
          type="button"
          aria-hidden="true"
          className="hover:underline"
          onClick={() => onClick && onClick(department?.id)}
        >
          {department?.name ?? 'unknown'}
        </button>
      </h2>
    </div>
  );
};

export default DepartmentColorSection;
