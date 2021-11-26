import React from 'react';
import { Target } from '@main/entity';
import { BasicsEditCircle, BasicsXSmall } from '@assets';
import { PostTargetParams, PutTargetParams } from '@api/types';
import Loading from '@common/atoms/Loading';
import { getDepartmentBgColor, nFormatter } from '@main/utils';
import { classNames, formatToCurrency, replaceAll } from '@common/utils';

const SYSTEM_ALERT_COLOR = '#ff5f68';
const TARGET_PLACEHOLDER = 10000;
export interface TargetRowProps {
  target: Target;
  index?: number;
  onPostTarget: (data: PostTargetParams) => void;
  onPutTarget: (id: number, data: PutTargetParams) => void;
  isPutTarget: boolean;
  isPostTarget: boolean;
}

const TargetRow: React.VFC<TargetRowProps> = ({
  target,
  onPostTarget,
  onPutTarget,
  isPutTarget,
  isPostTarget,
}) => {
  const [isEdit, setEdit] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!isPutTarget || !isPostTarget) {
      setLoading(false);
      setEdit(false);
    }
  }, [isPutTarget, isPostTarget]);

  const deptBgClass = React.useMemo(() => getDepartmentBgColor(target?.name ?? ''), [target?.name]);
  const isActive = (target?.amount ?? 0) > 0 && target?.id !== null;

  const handlePostTarget = (amountInput: number) => {
    onPostTarget({
      month: new Date().getMonth() + 1, // Get the month (0-11)
      year: new Date().getFullYear(),
      amount: amountInput,
      departmentId: target?.depId,
    });
  };

  const handlePutTarget = (newAmount: number) => {
    onPutTarget(target.id, {
      amount: newAmount,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const amountNumber = replaceAll(amount, ',', '');
      if (isActive) {
        setLoading(true);
        handlePutTarget(parseInt(amountNumber, 10));
      } else {
        setLoading(true);
        handlePostTarget(parseInt(amountNumber, 10));
      }
    }
  };

  const handleClickClearButton = () => {
    if (amount === '') {
      setEdit(false);
      return;
    }
    setAmount('');
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
    setAmount(formatToCurrency(event.target.value, ''));
  };

  const onBlurInput = () => {
    setEdit(false);
    setAmount('');
  };

  if (isEdit) {
    const currentTargetAsPlaceHolder = formatToCurrency(
      `${target?.amount ? Math.abs(target?.amount) : TARGET_PLACEHOLDER}`,
      '',
    );
    return (
      <div className="flex flex-row py-3 px-6 mb-4">
        <div className="flex flex-col">
          <p className="text-xs text-Gray-6 font-normal">{target?.name}</p>
          {!!loading && <Loading width={15} height={15} className="flex mt-1" />}
          {/* <Loading width={15} height={15} className="flex mt-1" /> */}
        </div>
        <div className="flex ml-auto flex-col">
          <p className="w-32 ml-auto text-right text-sm text-Gray-3 font-semibold">
            Edit target amount
          </p>
          <div className="flex flex-1 w-[120px] max-w-lg flex-row items-center mt-1 py-2 border-b border-Gray-11">
            <p className="text-sm text-Gray-6">$</p>
            <input
              ref={inputRef}
              onKeyDown={handleKeyDown}
              placeholder={currentTargetAsPlaceHolder}
              className="flex flex-1 mx-2 text-sm outline-none border-none w-[76px]"
              style={{ color: 'rgba 125 132 144, 0.5' }}
              onBlur={onBlurInput}
              onChange={onChangeInput}
              value={amount}
            />
            <button type="button" onClick={handleClickClearButton}>
              <BasicsXSmall className="flex w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderEditButton = () => {
    const onClickEdit = () => {
      setTimeout(() => {
        if (!isEdit) {
          inputRef.current?.focus();
        }
      }, 500);
      setEdit(!isEdit);
    };
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
          <p className="text-Gray-6 font-regular text-sm">{target?.name}</p>
          {renderEditButton()}
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col" style={{ width: percentLength }}>
            <div className="flex mt-1 w-full h-1" style={{ backgroundColor: inactiveColor }} />
            <p className="text-Gray-3 text-2xs mt-1 font-bold ml-auto">{totalSpentCurrency}</p>
          </div>
          <div className="flex flex-col flex-1 min-w-[60px]">
            <div className="flex mt-1 w-full h-1" style={{ backgroundColor: inactiveTarget }} />
            <p className="text-Gray-6 text-2xs mt-1 font-bold ml-auto">{targetAmountCurrency}</p>
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
            <p className="flex text-2xs mt-1 font-bold ml-auto text-system-alert">
              {currentCurrency}
            </p>
            <p className="flex text-Gray-6 text-2xs mt-1 font-bold">{`/${totalAmountCurrency}`}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-row">
        <div className="flex flex-col" style={{ width: percentLength }}>
          <div className="flex mt-1 w-full h-1" style={{ backgroundColor: currentColor }} />
          <p className="flex text-Gray-3 text-2xs mt-1 font-bold ml-auto">{currentCurrency}</p>
        </div>
        <div className="flex flex-col flex-1">
          <div
            className={classNames('flex mt-1 w-full h-1', styleTotal)}
            style={{ backgroundColor: totalColor }}
          />
          <p className="flex text-Gray-6 text-2xs mt-1 font-bold ml-auto">{totalAmountCurrency}</p>
        </div>
      </div>
    );
  };

  const renderAlertText = () => {
    if (!isExceeds) return null;
    const exceedNumber = targetAmount - totalSpent;
    const exceedNumberCurrency = nFormatter(Math.round(Math.abs(exceedNumber) * 100) / 100);
    return (
      <p className="text-system-alert font-bold font-regular group-hover:hidden ml-auto text-2xs truncate">
        {`Exceeds target by ${exceedNumberCurrency}`}
      </p>
    );
  };

  return (
    <div className="group flex px-6 py-2 h-16 bg-white hover:bg-Gray-12 flex-col">
      <div className="flex flex-row items-center">
        <p
          className="text-Gray-6 font-regular text-sm truncate max-w-xs"
          style={{ maxWidth: '145px' }}
        >
          {target?.name}
        </p>
        {renderAlertText()}
        {renderEditButton()}
      </div>
      {renderCurrentPerTotalBar()}
    </div>
  );
};

export default TargetRow;
