import { classNames } from '@common/utils';
import React from 'react';

import { TeamIcon } from '@assets/index';
import Button from '@common/atoms/Button';
import { ReactComponent as AddIcon } from '@assets/icons/solid/add-small.svg';
import { ReactComponent as BasicsAddSmall } from '@assets/icons/outline/basics-add-small.svg';

interface TeamHomeProps {
  className?: string;
}

const TeamHome: React.VFC<TeamHomeProps> = ({ className = '' }) => {
  const onClickNewTarget = () => undefined;
  const renderTeamHeader = () => {
    return (
      <div>
        <div
          className="flex flex-row space-x-4 items-center p-6"
          style={{
            background:
              'linear-gradient(90.91deg, #F4A27F 0.49%, #F28C6E 20.72%, #DB7271 40.14%, #9A5FAF 65.43%, #6A6AF2 80.23%, #9656AC 102.35%, #9656AC 105.59%)',
          }}
        >
          <div className="w-9 h-9 rounded-full border border-white flex justify-center items-center">
            <TeamIcon
              className="w-4 h-4 fill-current path-no-filled text-white opacity-100"
              aria-hidden="true"
              width={16}
              height={16}
            />
          </div>
          <div className="flex flex-1 w-full">
            <h2 className="text-white font-semibold text-xl">Core Field Operations</h2>
          </div>
          <Button onClick={() => undefined} className="rounded-full">
            <AddIcon
              width={16}
              height={16}
              className="stroke-current path-no-stroke text-white"
              viewBox="0 0 15 15"
            />
            <span className="text-white">Follow</span>
          </Button>
        </div>
      </div>
    );
  };
  const renderTeamTargets = () => {
    return (
      <div className="flex mt-px w-full">
        <div className="flex w-full flex-row px-6 py-3 items-center justify-between">
          <p>Team Targets</p>
          <button
            type="button"
            className="flex flex-row items-center px-2 py-1.5 rounded-sm hover:bg-Gray-12"
            onClick={onClickNewTarget}
          >
            <BasicsAddSmall className="w-4 h-4 mr-0.5" />
            <p className="text-xs text-Gray-3 font-normal">New</p>
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className={classNames('w-full', className)}>
      <div className="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden">
        {renderTeamHeader()}
        {renderTeamTargets()}
      </div>
    </div>
  );
};

export default TeamHome;
