import React from 'react';
import clsx from 'clsx';

import { getColorByText } from '@/main/utils';
import { TeamIcon } from '@/assets';
import { ClassName } from '@/common/types';

export type TeamHeaderProps = ClassName & {
  departmentId: number;
  teamName?: string;
};

export const TeamHeader = ({ className, departmentId, teamName = '' }: TeamHeaderProps) => {
  const teamHeaderColor = React.useMemo(
    () => getColorByText('', departmentId, true),
    [departmentId],
  );

  return (
    <div
      className={clsx(
        'flex flex-row items-center px-6 mt-6 justify-between py-6 max-h-[84px] rounded-card',
        className,
      )}
      style={{ background: teamHeaderColor }}
    >
      <div className="flex flex-row items-center space-x-4">
        <div className="flex justify-center items-center w-9 h-9 rounded-full border border-white">
          <TeamIcon
            className="w-5 h-5 fill-current path-no-filled text-white opacity-100"
            aria-hidden="true"
            width={20}
            height={20}
          />
        </div>
        <p className="text-white font-semibold">{teamName}</p>
      </div>
    </div>
  );
};