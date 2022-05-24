/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useState, useRef, KeyboardEventHandler, useEffect } from 'react';
import { classNames, formatCurrency, replaceAll } from '@common/utils';

interface MonthTargetInputProps {
  month: number;
  isInRange?: boolean;
  className?: string;
  onChange: (amount?: number) => void;
  onSelect: () => void;
  onUnselect: () => void;
  defaultAmount?: number;
}

const MonthTargetInput: React.VFC<MonthTargetInputProps> = ({
  isInRange = false,
  className = '',
  onChange,
  onSelect,
  onUnselect,
  defaultAmount,
}) => {
  const amountInputRef = useRef<HTMLInputElement>(null);
  const [amount, setAmount] = useState<string>(
    defaultAmount !== undefined ? formatCurrency(defaultAmount, '0,0', '0') : '',
  );
  const [isFocus, setIsFocus] = useState<boolean>(false);

  useEffect(() => {
    if (defaultAmount !== undefined) {
      onSelect();
    }
  }, [defaultAmount]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setAmount(`${formatCurrency(newValue, '0,0', '')}`);
  };
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (['Enter'].includes(event.key)) {
      event.preventDefault();
      amountInputRef.current?.blur();
    }
  };

  const onFocus = () => {
    setIsFocus(true);
    onSelect();
  };

  const onBlur = () => {
    setIsFocus(false);
    if (amount.length > 0) {
      const amountInt = parseInt(replaceAll(amount, ',', ''), 10);
      onChange(amountInt);
    } else if (amount.length === 0) {
      onUnselect();
      onChange();
    }
  };

  return (
    <div
      className={classNames(
        'w-24 h-7 flex px-1 justify-center items-center border-2 border-Gray-12 hover:bg-Gray-12',
        isInRange ? 'bg-Gray-12' : '',
        className,
      )}
    >
      <input
        ref={amountInputRef}
        className={classNames(
          'flex text-xs text-right flex-1 w-5 bg-transparent outline-none text-Gray-3 placeholder-Gray-6',
        )}
        placeholder={isFocus ? '$0' : ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={amount.length > 0 ? `${amount}` : ''}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default MonthTargetInput;
