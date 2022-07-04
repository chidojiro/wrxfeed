import { BasicsEditCircle } from '@/assets';
import { classNames } from '@/common/utils';
import ExceedBar from '@/main/atoms/ExceedBar';
import { FeedType } from '@/main/entity';
import {
  getColorByText,
  getMultiMonthRange,
  getTargetName,
  getTargetPeriodsAmountTotal,
  nFormatter,
} from '@/main/utils';
import { Routes } from '@/routing/routes';
import { Target } from './types';
import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

const SYSTEM_ALERT_COLOR = '#ff5f68';
const INACTIVE_TARGET_COLOR = '#d1d5db';

interface TeamTargetRowProps {
  className?: string;
  target: Target;
  onClickEdit: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, target: Target) => void;
}

export const TeamTargetRow: React.VFC<TeamTargetRowProps> = ({
  className = '',
  target,
  onClickEdit,
}) => {
  const targetName = getTargetName(target);
  const history = useHistory();
  const deptBgClass = useMemo(() => getColorByText(targetName ?? ''), [targetName]);
  const { overallTarget, currentSpend } = getTargetPeriodsAmountTotal(target);
  const isActive = (overallTarget ?? 0) > 0 && target?.id !== null;

  const totalSpent = currentSpend ?? 0;
  const targetAmount = overallTarget ?? 0;
  const isExceeds = totalSpent > targetAmount;

  const onClickTarget = () => {
    history.push(
      `${(Routes.Feed.path as string).replace(':id', `${target.id}?route=${FeedType.TargetFeed}`)}`,
    );
  };

  const renderEditOrMonthRange = () => {
    return (
      <>
        <button
          type="button"
          onClick={(event) => onClickEdit(event, target)}
          className="flex-row ml-auto hidden group-hover:flex"
        >
          <BasicsEditCircle className="text-Accent-2 fill-current path-no-filled" />
          <p className="text-xs text-Accent-2 font-semibold ml-1.5">Edit</p>
        </button>
        {!isExceeds && (
          <div className="flex-col items-end ml-auto w-24 flex group-hover:hidden">
            <p className="text-2xs text-Gray-6">{getMultiMonthRange(target?.periods)}</p>
          </div>
        )}
      </>
    );
  };

  const renderCurrentPerTotalBar = () => {
    let percent = (totalSpent / targetAmount) * 100;
    const currentCurrency = nFormatter(+totalSpent.toFixed(2));
    const totalAmountCurrency = nFormatter(+targetAmount.toFixed(2));

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
        <div className="flex flex-col w-full">
          <div className="flex flex-row space-x-0.5">
            <div className="flex flex-col" style={{ width: percentLength }}>
              <div
                className="flex mt-1 w-full h-2 rounded-full"
                style={{ backgroundColor: currentColor }}
              />
              <div className="flex flex-row mt-1.5 text-2xs space-x-1.5">
                <p className="text-Gray-6 font-normal">Spend</p>
                <p className="text-system-alert font-bold">{currentCurrency}</p>
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
      <div className="flex flex-row space-x-0.5 w-full">
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
  const renderAlertText = () => {
    if (!isExceeds) return null;
    const exceedNumber = targetAmount - totalSpent;
    const exceedNumberCurrency = nFormatter(Math.round(Math.abs(exceedNumber) * 100) / 100);
    return (
      <p className="text-system-alert font-bold font-regular group-hover:hidden ml-auto text-3xs truncate text-right">
        {`Exceeds target by ${exceedNumberCurrency}`}
      </p>
    );
  };
  return (
    <button
      type="button"
      onClick={onClickTarget}
      className={classNames(
        'flex flex-1 flex-col justify-center pt-4 pb-4.5 px-6 group border-b border-Gray-11',
        className,
      )}
    >
      <div className="flex flex-row items-center mb-2 w-full">
        <p className="text-2xs text-Gray-3 font-normal line-clamp-1 overflow-ellipsis mr-2 text-left">
          {targetName ?? '...'}
        </p>
        {renderAlertText()}
        {renderEditOrMonthRange()}
      </div>
      {renderCurrentPerTotalBar()}
    </button>
  );
};
