/* eslint-disable jsx-a11y/accessible-emoji */
import { classNames } from '@common/utils';
import React, { useMemo } from 'react';
import { MouseEventHandler } from 'react-router/node_modules/@types/react';

import { useSubscription } from '@main/hooks/subscription.hook';

import { Department, Target } from '@main/entity';
import { getDepartmentBgColor, nFormatter } from '@main/utils';

import Button from '@common/atoms/Button';
import Loading from '@common/atoms/Loading';
import ExceedBar from '@main/atoms/ExceedBar';
import TopCategories from '@main/molecules/TopCategories';
import { TeamIcon, LoopIcon, BasicsEditCircle } from '@assets/index';

import { ReactComponent as AddIcon } from '@assets/icons/solid/add-small.svg';
import { ReactComponent as BasicsAddSmall } from '@assets/icons/outline/basics-add-small.svg';
import { ReactComponent as TickIcon } from '@assets/icons/solid/tick-small.svg';

const SYSTEM_ALERT_COLOR = '#ff5f68';
const INACTIVE_TARGET_COLOR = '#d1d5db';

interface TeamHomeProps {
  className?: string;
  deptSelect: Department | null | undefined;
}

const TeamHome: React.VFC<TeamHomeProps> = ({ className = '', deptSelect }) => {
  const { subscribe, unsubscribe, isFollowing, isFollowLoading } = useSubscription();
  const onClickNewTarget = () => undefined;
  const onClickEdit = () => undefined;
  const onClickRetryTransactions = () => undefined;

  const handleFollow: MouseEventHandler<HTMLButtonElement> = () => {
    if (deptSelect) subscribe('departments', deptSelect);
  };

  const handleUnfollow: MouseEventHandler<HTMLButtonElement> = () => {
    if (deptSelect) unsubscribe('departments', deptSelect);
  };
  const isFollow = deptSelect && isFollowing('departments', deptSelect);

  const renderEditButton = () => {
    return (
      <button
        type="button"
        onClick={onClickEdit}
        className="flex-row ml-auto hidden group-hover:flex"
      >
        <BasicsEditCircle className="text-Accent-2 fill-current path-no-filled" />
        <p className="text-xs text-Accent-2 font-semibold ml-1.5">Edit</p>
      </button>
    );
  };
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
  const renderAddNewTargetButton = () => {
    return (
      <button
        type="button"
        className="flex flex-row items-center px-2 py-1.5 rounded-sm hover:bg-Gray-12"
        onClick={onClickNewTarget}
      >
        <BasicsAddSmall className="w-4 h-4 mr-0.5" />
        <p className="text-xs text-Gray-3 font-normal">New</p>
      </button>
    );
  };

  const target: Target = {
    id: 1,
    month: 2,
    year: 2022,
    amount: 1000000,
    total: 800000,
    props: [],
  };

  const targetName =
    'Core Field Operations Core Field Operations Core Field Operations Core Field Operations Core Field Operations';

  const deptBgClass = useMemo(() => getDepartmentBgColor(targetName ?? ''), [targetName]);
  const isActive = true;

  const totalSpent = target?.total ?? 0;
  const targetAmount = target?.amount ?? 0;

  let percent = (totalSpent / targetAmount) * 100;
  const currentCurrency = nFormatter(totalSpent);
  const totalAmountCurrency = nFormatter(targetAmount);
  const isExceeds = totalSpent > targetAmount;

  const renderCurrentPerTotalBar = () => {
    if (isExceeds) {
      percent = (targetAmount / totalSpent) * 100;
    }
    const percentLength = percent ? `${percent}%` : '0%';
    const currentColor = deptBgClass;
    let totalColor = deptBgClass;

    if (!isActive) {
      totalColor = INACTIVE_TARGET_COLOR;
    }
    if (isExceeds) {
      totalColor = SYSTEM_ALERT_COLOR;
    }

    if (isExceeds) {
      return (
        <div className="flex flex-col">
          <div className="flex flex-row space-x-0.5">
            <div className="flex flex-col" style={{ width: percentLength }}>
              <div
                className="flex mt-1 w-full h-2 rounded-full"
                style={{ backgroundColor: currentColor }}
              />
              <div className="flex flex-row mt-1.5 text-2xs space-x-1.5">
                <p className="text-Gray-6 font-normal">Spend</p>
                <p className="text-Gray-3 font-bold">{currentCurrency}</p>
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <ExceedBar className="flex mt-1 w-full h-2 rounded-full" color={totalColor} />
              <div className="flex flex-row mt-1.5 ml-auto text-2xs space-x-1.5">
                <p className="text-Gray-6 font-normal">Target</p>
                <p className="text-Gray-3 font-bold">{totalAmountCurrency}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-row space-x-0.5">
        <div className="flex flex-col" style={{ width: percentLength }}>
          <div
            className="flex mt-1 w-full h-2 rounded-full"
            style={{ backgroundColor: currentColor }}
          />
          <div className="flex flex-row mt-1.5 text-2xs space-x-1.5">
            <p className="text-Gray-6 font-normal">Spend</p>
            <p className="text-Gray-3 font-bold">{currentCurrency}</p>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className={classNames('flex mt-1 w-full h-2 rounded-full bg-Gray-11')} />
          <div className="flex flex-row mt-1.5 ml-auto text-2xs space-x-1.5">
            <p className="text-Gray-6 font-normal">Target</p>
            <p className="text-Gray-3 font-bold">{totalAmountCurrency}</p>
          </div>
        </div>
      </div>
    );
  };
  const renderTargetRow = () => {
    return (
      <div className="flex flex-1 flex-col w-full justify-center pt-4 pb-4.5 px-6 group border-b border-Gray-11">
        <div className="flex flex-row items-center mb-2 w-full">
          <p className="text-2xs text-Gray-3 font-normal line-clamp-1 overflow-ellipsis">
            {targetName}
          </p>
          {renderEditButton()}
        </div>
        {renderCurrentPerTotalBar()}
      </div>
    );
  };
  const renderEmptyTarget = () => {
    return (
      <div className="flex flex-1 flex-col justify-center items-center w-full bg-purple-12 px-8">
        <button type="button" onClick={onClickNewTarget}>
          <p className="text-Gray-6 text-xs text-center">
            Thats all of the teams targets 🎯
            <br />
            <span className="text-Gray-3 underline">create a new target</span>
          </p>
        </button>
      </div>
    );
  };
  const renderTeamTargets = () => {
    return (
      <div className="flex flex-col mt-px w-full">
        <div className="flex w-full flex-row px-6 py-3 items-center justify-between">
          <p className="text-Gray-3 font-semibold">Team Targets</p>
          {renderAddNewTargetButton()}
        </div>
        {renderTargetRow()}
        <div className="flex flex-col sm:flex-row w-full">
          {renderTargetRow()}
          <div className="hidden sm:flex w-px h-auto bg-Gray-11" />
          {/* {renderTargetRow()} */}
          {renderEmptyTarget()}
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
        {renderTeamTargets()}
      </div>
      <TopCategories />
      {renderRecentTransactions()}
    </div>
  );
};

export default TeamHome;
