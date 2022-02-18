import React, { useMemo } from 'react';

import { Target } from '@main/entity';
import { getDepartmentBgColor, getTargetName, nFormatter } from '@main/utils';
import { classNames } from '@common/utils';
import { BasicsEditCircle } from '@assets';

const SYSTEM_ALERT_COLOR = '#ff5f68';
const TARGET_PLACEHOLDER = 10000;
export interface TargetRowProps {
  target: Target;
  index?: number;
  onClickEdit: () => void;
}

const TargetRow: React.VFC<TargetRowProps> = ({ target, onClickEdit }) => {
  const targetName = getTargetName(target);
  const deptBgClass = useMemo(() => getDepartmentBgColor(targetName ?? ''), [targetName]);
  const isActive = (target?.amount ?? 0) > 0 && target?.id !== null;

  const renderEditButton = () => {
    return (
      <button
        type="button"
        onClick={onClickEdit}
        className="flex-row ml-auto hidden group-hover:flex"
      >
        <BasicsEditCircle />
        <p className="text-xs text-Gray-4 font-semibold ml-1">Edit</p>
      </button>
    );
  };

  const inactiveColor = '#d1d5db';
  const inactiveTarget = 'rgba(209,213,219,0.3)';

  if (!isActive) {
    const totalSpent = target?.total ?? 0;
    let targetAmount = TARGET_PLACEHOLDER;
    const percent = (totalSpent / targetAmount) * 100;
    const percentLength = percent < 75 ? `${percent}%` : '75%';
    const totalSpentCurrency = nFormatter(totalSpent);
    if (totalSpent > targetAmount) {
      targetAmount = totalSpent * 1.2;
    }
    const targetAmountCurrency = `${nFormatter(targetAmount)}(est)`;
    return (
      <div className="group flex px-6 py-2 h-16 bg-white hover:bg-Gray-12 flex-col">
        <div className="flex flex-row items-center">
          <p className="text-Gray-6 font-regular text-sm truncate">{targetName}</p>
          {renderEditButton()}
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col" style={{ width: percentLength }}>
            <div className="flex mt-1 w-full h-1" style={{ backgroundColor: inactiveColor }} />
            <p className="text-Gray-3 text-3xs mt-1 font-bold ml-auto">{totalSpentCurrency}</p>
          </div>
          <div className="flex flex-col flex-1 min-w-[60px]">
            <div className="flex mt-1 w-full h-1" style={{ backgroundColor: inactiveTarget }} />
            <p className="text-Gray-6 text-3xs mt-1 font-bold ml-auto">{targetAmountCurrency}</p>
          </div>
        </div>
      </div>
    );
  }

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
    const styleTotal = isExceeds ? '' : 'opacity-30';
    const currentColor = deptBgClass;
    let totalColor = deptBgClass;

    if (!isActive) {
      totalColor = inactiveColor;
    }
    if (isExceeds) {
      totalColor = SYSTEM_ALERT_COLOR;
    }

    if (isExceeds) {
      return (
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="flex flex-col" style={{ width: percentLength }}>
              <div className="flex mt-1 w-full h-1" style={{ backgroundColor: currentColor }} />
            </div>
            <div className="flex flex-col flex-1">
              <div
                className={classNames('flex mt-1 w-full h-1', styleTotal)}
                style={{ backgroundColor: totalColor }}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <p className="flex text-3xs mt-1 font-bold ml-auto text-system-alert">
              {currentCurrency}
            </p>
            <p className="flex text-Gray-6 text-3xs mt-1 font-bold">{`/${totalAmountCurrency}`}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-row">
        <div className="flex flex-col" style={{ width: percentLength }}>
          <div className="flex mt-1 w-full h-1" style={{ backgroundColor: currentColor }} />
          <p className="flex text-Gray-3 text-3xs mt-1 font-bold ml-auto">{currentCurrency}</p>
        </div>
        <div className="flex flex-col flex-1">
          <div
            className={classNames('flex mt-1 w-full h-1', styleTotal)}
            style={{ backgroundColor: totalColor }}
          />
          <p className="flex text-Gray-6 text-3xs mt-1 font-bold ml-auto">{totalAmountCurrency}</p>
        </div>
      </div>
    );
  };

  const renderAlertText = () => {
    if (!isExceeds) return null;
    const exceedNumber = targetAmount - totalSpent;
    const exceedNumberCurrency = nFormatter(Math.round(Math.abs(exceedNumber) * 100) / 100);
    return (
      <p className="text-system-alert font-bold font-regular group-hover:hidden ml-auto text-3xs truncate">
        {`Exceeds target by ${exceedNumberCurrency}`}
      </p>
    );
  };

  return (
    <div className="group flex px-6 py-2 h-16 bg-white hover:bg-Gray-12 flex-col">
      <div className="flex flex-row items-center">
        <p
          className="text-Gray-6 font-regular text-sm truncate max-w-xs w-full mr-2"
          // style={{ maxWidth: '200px' }}
        >
          {targetName}
        </p>
        {renderAlertText()}
        {renderEditButton()}
      </div>
      {renderCurrentPerTotalBar()}
    </div>
  );
};

export default TargetRow;
