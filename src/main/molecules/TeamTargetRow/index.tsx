import React, { useMemo } from 'react';

import { Target } from '@main/entity';
import { getDepartmentBgColor, getTargetName, nFormatter } from '@main/utils';
import { classNames } from '@common/utils';

import ExceedBar from '@main/atoms/ExceedBar';
import { BasicsEditCircle } from '@assets/index';

const SYSTEM_ALERT_COLOR = '#ff5f68';
const INACTIVE_TARGET_COLOR = '#d1d5db';

interface TeamTargetRowProps {
  className?: string;
  target: Target;
  onClickEdit: (target: Target) => void;
}

const TeamTargetRow: React.VFC<TeamTargetRowProps> = ({ target, onClickEdit }) => {
  const targetName = getTargetName(target);
  const deptBgClass = useMemo(() => getDepartmentBgColor(targetName ?? ''), [targetName]);
  const isActive = (target?.amount ?? 0) > 0 && target?.id !== null;

  const renderEditButton = () => {
    return (
      <button
        type="button"
        onClick={() => onClickEdit(target)}
        className="flex-row ml-auto hidden group-hover:flex"
      >
        <BasicsEditCircle className="text-Accent-2 fill-current path-no-filled" />
        <p className="text-xs text-Accent-2 font-semibold ml-1.5">Edit</p>
      </button>
    );
  };
  const renderCurrentPerTotalBar = () => {
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
  return (
    <div className="flex flex-1 flex-col w-full justify-center pt-4 pb-4.5 px-6 group border-b border-Gray-11">
      <div className="flex flex-row items-center mb-2 w-full">
        <p className="text-2xs text-Gray-3 font-normal line-clamp-1 overflow-ellipsis">
          {targetName ?? '...'}
        </p>
        {renderEditButton()}
      </div>
      {renderCurrentPerTotalBar()}
    </div>
  );
};

export default TeamTargetRow;
