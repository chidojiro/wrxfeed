import React from 'react';
import { Target } from '@main/entity';
import { BasicsEditCircle, BasicsXSmall } from '@assets';

export interface TargetRowProps {
  target: Target;
  index: number;
  isActive?: boolean;
}

const TargetRow: React.VFC<TargetRowProps> = ({ target, isActive = false }) => {
  const [isEdit, setEdit] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<string>('0');

  const renderEditButton = () => {
    const onClickEdit = () => setEdit(!isEdit);
    return (
      <button
        type="button"
        onClick={onClickEdit}
        className="flex flex-row ml-auto opacity-0 group-hover:opacity-100"
      >
        <BasicsEditCircle />
        <div className="flex text-xs text-Gray-4 font-semibold ml-1">Edit</div>
      </button>
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setEdit(false);
    }
    console.log(`Check amount = ${amount}`);
  };

  const handleClickClearButton = () => {
    setAmount('0');
  };

  if (isEdit) {
    return (
      <div className="flex flex-row py-3 px-6 mb-4">
        <div className="flex justify-between">
          <div className="flex text-xs text-Gray-6 font-normal">{target?.department?.name}</div>
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
              type="number"
              onKeyDown={handleKeyDown}
              placeholder="10,000.00"
              className="flex flex-1 mx-2 text-sm outline-none border-none"
              style={{ color: 'rgba 125 132 144, 0.5', width: '76px' }}
              onBlur={() => {
                setEdit(false);
              }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setAmount(event.target.value);
              }}
            />
            <button type="button" onClick={handleClickClearButton}>
              <BasicsXSmall className="flex w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div className="group flex px-6 py-2 h-16 bg-white hover:bg-Gray-12 flex-col">
        <div className="flex flex-row items-center">
          <div className="flex text-Gray-4 font-medium text-sm font-regular">
            {target?.department?.name}
          </div>
          {renderEditButton()}
        </div>
        <div className="flex mt-1 w-full h-1" style={{ backgroundColor: '#d1d5db' }} />
      </div>
    );
  }

  return (
    <div className="group flex px-6 py-2 h-16 bg-white hover:bg-Gray-12 flex-col">
      <div className="flex flex-row items-center">
        <div className="flex text-Gray-4 font-medium text-sm font-regular">
          {target?.department?.name}
        </div>
        {renderEditButton()}
      </div>
      <div className="flex mt-1 w-full h-1" style={{ backgroundColor: '#13b9b9' }} />
    </div>
  );
};

export default TargetRow;
