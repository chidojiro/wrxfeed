/* eslint-disable jsx-a11y/accessible-emoji */
import { classNames } from '@common/utils';
import React from 'react';
import { MouseEventHandler } from 'react-router/node_modules/@types/react';

import { useSubscription } from '@main/hooks/subscription.hook';

import { Department } from '@main/entity';

import Button from '@common/atoms/Button';
import Loading from '@common/atoms/Loading';
import TopCategories from '@main/molecules/TopCategories';
import { TeamIcon, LoopIcon } from '@assets/index';

import { ReactComponent as AddIcon } from '@assets/icons/solid/add-small.svg';
import { ReactComponent as TickIcon } from '@assets/icons/solid/tick-small.svg';
import TeamTargets from '@main/molecules/TeamTargets';

interface TeamHomeProps {
  className?: string;
  deptSelect: Department | null | undefined;
}

const TeamHome: React.VFC<TeamHomeProps> = ({ className = '', deptSelect }) => {
  const { subscribe, unsubscribe, isFollowing, isFollowLoading } = useSubscription();
  const onClickRetryTransactions = () => undefined;

  const handleFollow: MouseEventHandler<HTMLButtonElement> = () => {
    if (deptSelect) subscribe('departments', deptSelect);
  };

  const handleUnfollow: MouseEventHandler<HTMLButtonElement> = () => {
    if (deptSelect) unsubscribe('departments', deptSelect);
  };
  const isFollow = deptSelect && isFollowing('departments', deptSelect);

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
            <h2 className="text-white font-semibold text-xl">{deptSelect?.name ?? '...'}</h2>
          </div>
          {isFollow ? (
            <Button onClick={handleUnfollow} className="group block relative rounded-full">
              <TickIcon
                width={16}
                height={16}
                className="stroke-current path-no-stroke text-white flex group-hover:hidden"
                viewBox="0 0 15 15"
              />
              <span className="group-hover:hidden text-white text-sm">Following</span>
              <span className="group-hover:flex hidden text-white text-sm">Unfollow</span>
            </Button>
          ) : (
            <Button onClick={handleFollow} className="rounded-full bg-white">
              {isFollowLoading ? (
                <div className="w-5 h-5 flex justify-center items-center">
                  <Loading width={16} height={16} />
                </div>
              ) : (
                <AddIcon
                  width={20}
                  height={20}
                  className="w-5 h-5 stroke-current path-no-stroke text-Gray-3"
                  viewBox="0 0 15 15"
                />
              )}
              <span className="text-Gray-3 text-sm">Follow</span>
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderRecentTransactions = () => {
    return (
      <div className="flex bg-white shadow-md rounded-t-lg flex-row px-6 py-2.5 mr-0.5 border-b border-Gray-11 space-x-2">
        <button
          onClick={onClickRetryTransactions}
          type="button"
          className="flex w-6 h-6 justify-center items-center"
        >
          <LoopIcon
            className="w-4 h-4 fill-current path-no-filled text-Gray-3 opacity-100"
            aria-hidden="true"
            width={16}
            height={16}
            viewBox="0 -2 20 20"
          />
        </button>
        <p className="text-Gray-3 text-base font-semibold">Transactions</p>
      </div>
    );
  };
  return (
    <div className={classNames('w-full', className)}>
      <div className="flex flex-col rounded-lg shadow-md bg-white overflow-hidden mb-6">
        {renderTeamHeader()}
        <TeamTargets />
      </div>
      {deptSelect && <TopCategories departmentId={deptSelect?.id} />}
      {renderRecentTransactions()}
    </div>
  );
};

export default TeamHome;
