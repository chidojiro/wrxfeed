import React from 'react';
import { Target } from '@main/entity';
import { BasicsEditCircle, BasicsXSmall } from '@assets';
import { PostTargetParams, PutTargetParams } from '@api/types';
import Loading from '@common/atoms/Loading';
import { getDepartmentBgColor, nFormatter } from '@main/utils';
import { classNames, parseMoneyInput, replaceAll } from '@common/utils';

const SystemAlertColor = '#ff5f68';
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
  const isActive = target?.total !== null;

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
    if (amount === '0') {
      setEdit(false);
      return;
    }
    setAmount('0');
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
    // setAmount(formatCurrency(parseFloat(event.target.value)));
    setAmount(parseMoneyInput(event.target.value, ''));
  };

  const onBlurInput = () => {
    setEdit(false);
    setAmount('0');
  };

  const onMouseLeaveInput = () => {
    setEdit(false);
    setAmount('0');
  };

  const onPointerOutInput = () => {
    setEdit(false);
    setAmount('0');
    // console.log('Check onPointerOutInput');
  };

  if (isEdit) {
    return (
      <div className="flex flex-row py-3 px-6 mb-4">
        <div className="flex flex-col">
          <div className="flex text-xs text-Gray-6 font-normal">{target?.name}</div>
          {!!loading && <Loading width={15} height={15} className="flex mt-1" />}
          {/* <Loading width={15} height={15} className="flex mt-1" /> */}
        </div>
        <div className="flex ml-auto flex-col">
          <div className="flex w-32 ml-auto text-right text-sm text-Gray-3 font-semibold">
            Edit target amount
          </div>
          <div className="flex flex-1 w-[120px] max-w-lg flex-row items-center mt-1 py-2 border-b border-Gray-11">
            <div className="text-sm text-Gray-6">$</div>
            <input
              ref={inputRef}
              onKeyDown={handleKeyDown}
              placeholder="10,000.00"
              className="flex flex-1 mx-2 text-sm outline-none border-none w-[76px]"
              style={{ color: 'rgba 125 132 144, 0.5' }}
              onBlur={onBlurInput}
              onMouseLeave={onMouseLeaveInput}
              onPointerOut={onPointerOutInput}
              onChange={onChangeInput}
              value={amount}
              // autoFocus
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
        <div className="flex text-xs text-Gray-4 font-semibold ml-1">Edit</div>
      </button>
    );
  };

  const inactiveColor = '#d1d5db';

  if (!isActive) {
    const currentDemoInactive = target?.total ?? 0;
    const amountDemoInactive = 10000;

    const percent = (currentDemoInactive / amountDemoInactive) * 100;
    const percentLength = `${percent}%`;
    const currentCurrency = `$${Math.round((currentDemoInactive / 1000) * 10) / 10}K`;
    const totalAmountCurrency = `$${Math.round((amountDemoInactive / 1000) * 10) / 10}K(est)`;
    return (
      <div className="group flex px-6 py-2 h-16 bg-white hover:bg-Gray-12 flex-col">
        <div className="flex flex-row items-center">
          <div className="flex text-Gray-6 font-regular text-sm">{target?.name}</div>
          {renderEditButton()}
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col" style={{ width: percentLength }}>
            <div className="flex mt-1 w-full h-1" style={{ backgroundColor: inactiveColor }} />
            <div className="flex text-Gray-3 text-2xs mt-1 font-bold ml-auto">
              {currentCurrency}
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div
              className="flex mt-1 w-full h-1 opacity-30"
              style={{ backgroundColor: inactiveColor }}
            />
            <div className="flex text-Gray-6 text-2xs mt-1 font-bold ml-auto">
              {totalAmountCurrency}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentTarget = target?.total ?? 0;
  const maxTarget: number = target?.amount ?? 0;

  let percent = (currentTarget / maxTarget) * 100;
  const currentCurrency = nFormatter(currentTarget);
  const totalAmountCurrency = nFormatter(Math.abs(maxTarget));
  const isExceeds = currentTarget > maxTarget;

  const renderCurrentPerTotalBar = () => {
    if (isExceeds) {
      percent = (maxTarget / currentTarget) * 100;
    }
    const percentLength = percent ? `${percent}%` : '0%';
    const styleTotal = isExceeds ? '' : 'opacity-30';
    const currentColor = deptBgClass;
    let totalColor = deptBgClass;

    if (!isActive) {
      totalColor = inactiveColor;
    }
    if (isExceeds) {
      totalColor = SystemAlertColor;
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
            <div
              className="flex text-Gray-3 text-2xs mt-1 font-bold ml-auto"
              style={{ color: SystemAlertColor }}
            >
              {currentCurrency}
            </div>
            <div className="flex text-Gray-6 text-2xs mt-1 font-bold">{`/${totalAmountCurrency}`}</div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-row">
        <div className="flex flex-col" style={{ width: percentLength }}>
          <div className="flex mt-1 w-full h-1" style={{ backgroundColor: currentColor }} />
          <div className="flex text-Gray-3 text-2xs mt-1 font-bold ml-auto">{currentCurrency}</div>
        </div>
        <div className="flex flex-col flex-1">
          <div
            className={classNames('flex mt-1 w-full h-1', styleTotal)}
            style={{ backgroundColor: totalColor }}
          />
          <div className="flex text-Gray-6 text-2xs mt-1 font-bold ml-auto">
            {totalAmountCurrency}
          </div>
        </div>
      </div>
    );
  };

  const renderAlertText = () => {
    if (!isExceeds) return null;
    const exceedNumber = maxTarget - currentTarget;
    const exceedNumberCurrency = nFormatter(Math.round(exceedNumber * 100) / 100);
    return (
      <div
        className="flex text-system-alert font-bold font-regular group-hover:hidden ml-auto"
        style={{ fontSize: '10px' }}
      >
        {`Exceeds target by ${exceedNumberCurrency}`}
      </div>
    );
  };

  return (
    <div className="group flex px-6 py-2 h-16 bg-white hover:bg-Gray-12 flex-col">
      <div className="flex flex-row items-center">
        <div className="flex text-Gray-6 font-regular text-sm">{target?.name}</div>
        {renderAlertText()}
        {renderEditButton()}
      </div>
      {renderCurrentPerTotalBar()}
    </div>
  );
};

export default TargetRow;
