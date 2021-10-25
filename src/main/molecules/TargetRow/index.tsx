import React from 'react';
import { Target } from '@main/entity';
import { BasicsEditCircle, BasicsXSmall } from '@assets';
import { PostTargetParams, PutTargetParams } from '@api/types';
import Loading from '@common/atoms/Loading';
import { classNames, getDepartmentBgColor, nFormatter } from '@main/utils';
// import { formatCurrency } from '@common/utils';

const parseMoneyInput = (value: string, currency = '$') => {
  return `${currency}${value
    .replace(/(?!\.)\D/g, '')
    .replace(/(?<=\..*)\./g, '')
    .replace(/(?<=\.\d\d).*/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

const replaceAll = (str: string, find: string, replace: string): string => {
  return str.replace(new RegExp(find, 'g'), replace);
};

const SystemAlertColor = '#ff5f68';

export interface TargetRowProps {
  target: Target;
  index: number;
  isActive: boolean;
  onPostTarget: (data: PostTargetParams) => void;
  onPutTarget: (id: number, data: PutTargetParams) => void;
  isPutTarget: boolean;
  isPostTarget: boolean;
}

const TargetRow: React.VFC<TargetRowProps> = ({
  target,
  isActive = false,
  onPostTarget,
  onPutTarget,
  isPutTarget,
  isPostTarget,
}) => {
  const [isEdit, setEdit] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!isPutTarget || !isPostTarget) {
      setLoading(false);
      setEdit(false);
    }
  }, [isPutTarget, isPostTarget]);

  const deptBgClass = React.useMemo(
    () => getDepartmentBgColor(target?.department?.name ?? ''),
    [target?.department?.name],
  );

  const handlePostTarget = (amountInput: number) => {
    onPostTarget({
      month: new Date().getMonth() + 1, // Get the month (0-11)
      year: new Date().getFullYear(),
      amount: amountInput,
      departmentId: target?.department?.id,
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
    // setEdit(false);
  };

  // const onMouseLeaveInput = () => {
  //   setEdit(false);
  //   console.log('Check onMouseLeaveInput');
  // };

  const onPointerOutInput = () => {
    // setEdit(false);
    // console.log('Check onPointerOutInput');
  };

  if (isEdit) {
    return (
      <div className="flex flex-row py-3 px-6 mb-4">
        <div className="flex flex-col">
          <div className="flex text-xs text-Gray-6 font-normal">{target?.department?.name}</div>
          {!!loading && <Loading width={15} height={15} className="flex mt-1" />}
          {/* <Loading width={15} height={15} className="flex mt-1" /> */}
        </div>
        <div className="flex ml-auto flex-col">
          <div className="flex w-32 ml-auto text-right text-xs text-Gray-6 font-semibold">
            Edit target amount
          </div>
          <div
            className="flex flex-1 w-24 max-w-lg flex-row items-center mt-1 py-2 border-b border-Gray-11"
            style={{ width: '120px' }}
          >
            <div className="text-xs text-Gray-6">$</div>
            <input
              // type="number"
              onKeyDown={handleKeyDown}
              placeholder="10,000.00"
              className="flex flex-1 mx-2 text-sm outline-none border-none"
              style={{ color: 'rgba 125 132 144, 0.5', width: '76px' }}
              onBlur={onBlurInput}
              // onMouseLeave={onMouseLeaveInput}
              onPointerOut={onPointerOutInput}
              onChange={onChangeInput}
              value={amount}
              // min="0.00"
              // step="0.01"
              // max="1000000000"
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
    const onClickEdit = () => setEdit(!isEdit);
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

  if (!isActive) {
    const inactiveColor = '#d1d5db';
    const currentDemoInactive = 7000;
    const amountDemoInactive = 10000;

    const percent = (currentDemoInactive / amountDemoInactive) * 100;
    const percentLength = `${percent}%`;
    const currentCurrency = `$${Math.round((currentDemoInactive / 1000) * 10) / 10}K`;
    const totalAmountCurrency = `$${Math.round((amountDemoInactive / 1000) * 10) / 10}K(est)`;
    return (
      <div className="group flex px-6 py-2 h-16 bg-white hover:bg-Gray-12 flex-col">
        <div className="flex flex-row items-center">
          <div className="flex text-Gray-4 font-medium text-sm font-regular">
            {target?.department?.name}
          </div>
          {renderEditButton()}
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col" style={{ width: percentLength }}>
            <div className="flex mt-1 w-full h-1" style={{ backgroundColor: inactiveColor }} />
            <div className="flex text-Gray-3 text-xs mt-1 font-bold ml-auto">{currentCurrency}</div>
          </div>
          <div className="flex flex-col flex-1">
            <div
              className="flex mt-1 w-full h-1 opacity-30"
              style={{ backgroundColor: inactiveColor }}
            />
            <div className="flex text-Gray-6 text-xs mt-1 font-bold ml-auto">
              {totalAmountCurrency}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { current: currentTarget = 0, amount: total } = target;

  // Math.round(number * 10) / 10;
  let percent = (currentTarget / total) * 100;
  const currentCurrency = nFormatter(currentTarget);
  const totalAmountCurrency = nFormatter(total);
  const isExceeds = currentTarget > total;

  const renderCurrentPerTotalBar = () => {
    if (isExceeds) {
      percent = (total / currentTarget) * 100;
    }
    const percentLength = `${percent}%`;
    const styleTotal = isExceeds ? '' : 'opacity-30';
    const currentColor = deptBgClass;
    const totalColor = isExceeds ? SystemAlertColor : deptBgClass;

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
              className="flex text-Gray-3 text-xs mt-1 font-bold ml-auto"
              style={{ color: SystemAlertColor }}
            >
              {currentCurrency}
            </div>
            <div className="flex text-Gray-6 text-xs mt-1 font-bold">{`/${totalAmountCurrency}`}</div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-row">
        <div className="flex flex-col" style={{ width: percentLength }}>
          <div className="flex mt-1 w-full h-1" style={{ backgroundColor: currentColor }} />
          <div className="flex text-Gray-3 text-xs mt-1 font-bold ml-auto">{currentCurrency}</div>
        </div>
        <div className="flex flex-col flex-1">
          <div
            className={classNames('flex mt-1 w-full h-1', styleTotal)}
            style={{ backgroundColor: totalColor }}
          />
          <div className="flex text-Gray-6 text-xs mt-1 font-bold ml-auto">
            {totalAmountCurrency}
          </div>
        </div>
      </div>
    );
  };

  const renderAlertText = () => {
    if (!isExceeds) return null;
    const exceedNumber = currentTarget - total;
    const exceedNumberCurrency = nFormatter(exceedNumber);
    return (
      <div
        className="flex text-system-alert font-bold font-regular group-hover:hidden ml-auto"
        style={{ fontSize: '10px' }}
      >
        {`Exceeds target by $${exceedNumberCurrency}`}
      </div>
    );
  };

  return (
    <div className="group flex px-6 py-2 h-16 bg-white hover:bg-Gray-12 flex-col">
      <div className="flex flex-row items-center">
        <div
          className="flex text-Gray-4 font-medium text-xs font-regular"
          style={{ fontSize: '14px' }}
        >
          {target?.department?.name}
        </div>
        {renderAlertText()}
        {renderEditButton()}
      </div>
      {renderCurrentPerTotalBar()}
    </div>
  );
};

export default TargetRow;
