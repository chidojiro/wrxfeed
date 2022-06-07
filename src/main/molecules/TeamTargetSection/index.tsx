import React from 'react';

import { TargetByTeam } from '@main/entity';
import { getColorByText } from '@main/utils';
import { TeamIcon } from '@assets';
import { ReactComponent as AddIcon } from '@assets/icons/solid/add-small.svg';
import { classNames } from '@common/utils';
import TargetWrapList from '../TargetWrapList';

export interface TeamTargetSectionProps {
  className?: string;
  onClickCreate?: () => void;
  targetByTeam: TargetByTeam;
}

const TeamTargetSection: React.VFC<TeamTargetSectionProps> = ({
  className = '',
  onClickCreate,
  targetByTeam,
}) => {
  const teamHeaderColor = React.useMemo(
    () => getColorByText(targetByTeam.department.name ?? '', targetByTeam.department.id, true),
    [targetByTeam.department.id, targetByTeam.department.name],
  );
  return (
    <div
      className={classNames('flex flex-col space-y-2', className)}
      key={`targets-by-team-${targetByTeam?.department?.id}`}
    >
      <div
        className="flex flex-row items-center px-6 mt-6 justify-between h-14 max-h-14 rounded-card max-w-[500px] xl:max-w-[1016px] mr-8"
        style={{ background: teamHeaderColor }}
      >
        <div className="flex flex-row items-center space-x-2">
          <TeamIcon
            className="w-4 h-4 fill-current path-no-filled text-white opacity-100"
            aria-hidden="true"
            width={16}
            height={16}
          />
          <p className="text-white font-semibold">{targetByTeam?.department?.name}</p>
        </div>
        <button
          type="button"
          onClick={onClickCreate}
          className="flex flex-row items-center space-x-2 pr-3"
        >
          <AddIcon
            width={16}
            height={16}
            className="stroke-current stroke-1 path-no-stroke text-white"
            viewBox="0 0 15 15"
          />
          <p className="text-white text-sm">Create Target</p>
        </button>
      </div>
      <div className="flex flex-1 flex-row flex-wrap">
        <TargetWrapList targets={targetByTeam?.targets} />
      </div>
    </div>
  );
};

export default TeamTargetSection;
