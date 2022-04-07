import React, { ChangeEvent, useState } from 'react';
import { classNames, formatCurrency } from '@common/utils';

interface MonthTargetInputProps {
  month: number;
  isInRange?: boolean;
  className?: string;
}

const MonthTargetInput: React.VFC<MonthTargetInputProps> = ({
  isInRange = false,
  className = '',
}) => {
  const [amount, setAmount] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setAmount(`$${formatCurrency(newValue, '0,0', '0')}`);
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
        className={classNames(
          'flex text-xs text-right flex-1 w-5 bg-transparent outline-none text-Gray-3 placeholder-Gray-6',
        )}
        placeholder={isFocus ? '$0' : ''}
        onChange={handleChange}
        value={amount}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </div>
  );
};

export default MonthTargetInput;
