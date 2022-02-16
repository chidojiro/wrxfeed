/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useMemo } from 'react';

import { classNames } from '@common/utils';
import { Target } from '@main/entity';
import { getDepartmentBgColor, nFormatter } from '@main/utils';

import ExceedBar from '@main/atoms/ExceedBar';
import { BasicsEditCircle } from '@assets/index';
import { ReactComponent as BasicsAddSmall } from '@assets/icons/outline/basics-add-small.svg';

const SYSTEM_ALERT_COLOR = '#ff5f68';
const INACTIVE_TARGET_COLOR = '#d1d5db';

interface TeamTargetsProps {
  className?: string;
}

const TeamTargets: React.VFC<TeamTargetsProps> = () => {
  const onClickNewTarget = () => undefined;
  const onClickEdit = () => undefined;
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
  const renderCurrentPerTotalBar = () => {
    const isActive = true;

    const totalSpent = target?.total ?? 0;
    const targetAmount = target?.amount ?? 0;

    let percent = (totalSpent / targetAmount) * 100;
    const currentCurrency = nFormatter(totalSpent);
    const totalAmountCurrency = nFormatter(targetAmount);
    const isExceeds = totalSpent > targetAmount;
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

export default TeamTargets;
