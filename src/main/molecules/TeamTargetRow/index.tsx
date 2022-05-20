import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

import { FeedType, Target } from '@main/entity';
import { getColorByText, getTargetName, nFormatter, getTargetAmountAndTotal } from '@main/utils';
import { classNames } from '@common/utils';
import Routes from '@src/routes';
import ExceedBar from '@main/atoms/ExceedBar';
import { BasicsEditCircle } from '@assets/index';
import { TargetPeriod } from '@api/types';

const SYSTEM_ALERT_COLOR = '#ff5f68';
const INACTIVE_TARGET_COLOR = '#d1d5db';

export const getMultiMonthRange = (periods: TargetPeriod[]): string => {
  let min = 12;
  let max = 0;
  for (let i = 0; i < periods.length; i += 1) {
    const { amount, month } = periods[i];
    if (amount && amount > 0 && month < min) {
      min = month;
    }
    if (amount && amount > 0 && month > max) {
      max = month;
    }
  }

  let name = '...';
  if (min !== 0) {
    name = dayjs()
      .month(min - 1)
      .format('MMM');
  }
  if (max !== 0 && max !== min) {
    name += ` - ${dayjs()
      .month(max - 1)
      .format('MMM')}`;
  }
  return name;
};

interface TeamTargetRowProps {
  className?: string;
  target: Target;
  onClickEdit: (target: Target) => void;
}

const TeamTargetRow: React.VFC<TeamTargetRowProps> = ({ target, onClickEdit }) => {
  const targetName = getTargetName(target);
  const history = useHistory();
  const deptBgClass = useMemo(() => getColorByText(targetName ?? ''), [targetName]);
  const { amount, total } = getTargetAmountAndTotal(target);
  const isActive = (amount ?? 0) > 0 && target?.id !== null;

  const totalSpent = total ?? 0;
  const targetAmount = amount ?? 0;
  const isExceeds = totalSpent > targetAmount;

  const onClickTarget = () => {
    history.push(
      `${(Routes.Feed.path as string).replace(':id', `${target.id}?route=${FeedType.TargetFeed}`)}`,
    );
    // history.push({
    //   pathname: `/departments/${value?.id.toString()}`,
    //   search: `?route=${MainGroups.Directories}`,
    // });
  };

  const renderEditButton = () => {
    return (
      <>
        <button
          type="button"
          onClick={() => onClickEdit(target)}
          className="flex-row ml-auto hidden group-hover:flex"
        >
          <BasicsEditCircle className="text-Accent-2 fill-current path-no-filled" />
          <p className="text-xs text-Accent-2 font-semibold ml-1.5">Edit</p>
        </button>
        <div className="flex-col items-end ml-auto w-24 flex group-hover:hidden">
          <p className="text-2xs text-Gray-6">{getMultiMonthRange(target.periods)}</p>
        </div>
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
      <p className="text-system-alert font-bold font-regular group-hover:hidden ml-auto text-3xs truncate text-right w-52">
        {`Exceeds target by ${exceedNumberCurrency}`}
      </p>
    );
  };
  return (
    <button
      type="button"
      onClick={onClickTarget}
      className="flex flex-1 flex-col w-full justify-center pt-4 pb-4.5 px-6 group border-b border-Gray-11"
    >
      <div className="flex flex-row items-center mb-2 w-full">
        <p className="text-2xs text-Gray-3 font-normal line-clamp-1 overflow-ellipsis mr-2">
          {targetName ?? '...'}
        </p>
        {renderAlertText()}
        {renderEditButton()}
      </div>
      {renderCurrentPerTotalBar()}
    </button>
  );
};

export default TeamTargetRow;
