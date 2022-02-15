import { classNames } from '@common/utils';
import React, { useMemo } from 'react';

import { TeamIcon, CategoryIcon, LoopIcon } from '@assets/index';
import Button from '@common/atoms/Button';
import { ReactComponent as AddIcon } from '@assets/icons/solid/add-small.svg';
import { ReactComponent as BasicsAddSmall } from '@assets/icons/outline/basics-add-small.svg';
import { Target } from '@main/entity';
import { getDepartmentBgColor, nFormatter } from '@main/utils';

const SYSTEM_ALERT_COLOR = '#ff5f68';
// const TARGET_PLACEHOLDER = 10000;
const INACTIVE_TARGET_COLOR = '#d1d5db';
// const inactiveTarget = 'rgba(209,213,219,0.3)';

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
    total: 200000,
    props: [],
  };

  const targetName = 'Core Field Operations';

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
            <div className="flex flex-col rounded-full" style={{ width: percentLength }}>
              <div className="flex mt-1 w-full h-2" style={{ backgroundColor: currentColor }} />
            </div>
            <div className="flex flex-col flex-1 rounded-full">
              <div
                className={classNames('flex mt-1 w-full h-2')}
                style={{ backgroundColor: totalColor }}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <p className="flex text-3xs mt-1.5 font-bold ml-auto text-system-alert">
              {currentCurrency}
            </p>
            <p className="flex text-Gray-6 text-3xs mt-1.5 font-bold">{`/${totalAmountCurrency}`}</p>
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
      <div className="flex flex-col w-full justify-center pt-4 pb-4.5 px-6">
        <p className="text-2xs text-Gray-3 font-normal mb-2">{targetName}</p>
        {renderCurrentPerTotalBar()}
      </div>
    );
  };
  const renderTeamTargets = () => {
    return (
      <div className="flex flex-col mt-px w-full">
        <div className="flex w-full flex-row px-6 py-3 items-center justify-between">
          <p>Team Targets</p>
          {renderAddNewTargetButton()}
        </div>
        {renderTargetRow()}
        <div className="flex flex-row w-full border-t border-Gray-11">
          {renderTargetRow()}
          <div className="flex w-px h-auto bg-Gray-11" />
          {renderTargetRow()}
        </div>
      </div>
    );
  };
  const renderTopCategoryItem = () => {
    return (
      <div className="flex flex-row items-center px-6 py-4 border-b border-Gray-11">
        <p className="text-Gray-3 text-xs font-semibold">Core Vehicle In Market Labor</p>
        <p className="mx-1 text-Gray-6 text-sm">·</p>
        <p className="text-Gray-6 text-xs font-normal">January</p>
        <p className="text-Gray-3 text-xs font-semibold ml-auto">$14,500.00</p>
      </div>
    );
  };
  const renderTopCategories = () => {
    return (
      <div className="flex flex-col bg-white shadow-md rounded-lg mb-6">
        <div className="flex flex-row items-center px-6 py-2 space-x-2 border-b border-Gray-11">
          <div className="flex w-6 h-6 justify-center items-center">
            <CategoryIcon
              className="w-4 h-4 fill-current path-no-filled text-Gray-3 opacity-100"
              aria-hidden="true"
              width={16}
              height={16}
            />
          </div>
          <p className="text-Gray-3 text-base font-semibold">Top Categories</p>
        </div>
        {[1, 2, 3, 4, 5, 6].map(renderTopCategoryItem)}
      </div>
    );
  };
  const renderRecentTransactions = () => {
    return (
      <div className="flex bg-white shadow-md rounded-t-lg flex-row px-6 py-2.5 mr-0.5 border-b border-Gray-11">
        <div className="flex w-6 h-6 justify-center items-center">
          <LoopIcon
            className="w-4 h-4 fill-current path-no-filled text-Gray-3 opacity-100"
            aria-hidden="true"
            width={16}
            height={16}
          />
        </div>
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
      {renderTopCategories()}
      {renderRecentTransactions()}
    </div>
  );
};

export default TeamHome;
