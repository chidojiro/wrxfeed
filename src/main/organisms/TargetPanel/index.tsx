import { BasicsDownSmall, BasicsEditCircle } from '@assets/';
import React from 'react';

export interface TargetPanelProps {
  title?: string;
}

export type Target = {
  id: number;
  title: string;
  color: string;
};

const targets: Target[] = [
  {
    id: 0,
    title: 'Global Operations',
    color: '#13b9b9',
  },
  {
    id: 1,
    title: 'Supply Chain & Logistics',
    color: '#0891b2',
  },
  {
    id: 2,
    title: 'Government Sales',
    color: '#f3aa20',
  },
  {
    id: 3,
    title: 'Legal',
    color: '#2451bf',
  },
  {
    id: 3,
    title: 'Vehicle',
    color: '#df6622',
  },
];

const TargetPanel: React.VFC<TargetPanelProps> = () => {
  const renderEditButton = () => {
    const onClickEdit = () => {};
    return (
      <button
        type="button"
        onClick={onClickEdit}
        className="flex flex-row ml-auto opacity-0 group-hover:opacity-100"
      >
        <BasicsEditCircle />
        <div className="flex text-xs text-Gray-3 font-semibold ml-1">Edit</div>
      </button>
    );
  };

  const renderTargetBox = (item: Target) => {
    return (
      <div className="group flex px-6 py-2 h-16 bg-white hover:bg-Gray-12 flex-col">
        <div className="flex flex-row items-center">
          <div className="flex text-Gray-3 font-medium text-sm font-regular">{item.title}</div>
          {renderEditButton()}
        </div>
        <div className="flex mt-1 w-full h-1" style={{ backgroundColor: item.color }} />
      </div>
    );
  };

  const renderBottomDownIcon = () => {
    return (
      <div className="flex flex-row h-4 items-center">
        <div className="flex flex-1 h-px bg-Gray-11 mr-1" />
        <BasicsDownSmall />
        <div className="flex flex-1 h-px bg-Gray-11 ml-1" />
      </div>
    );
  };

  // min-h-[80vh]
  return (
    <div className="flex flex-1 pt-12">
      <div className="flex flex-col w-72 bg-white pt-6 pb-2 max-h-106">
        <div className="flex text-Gray-2 text-lg font-semibold px-6">Monthly Targets</div>
        <div className="flex mt-2 flex-col bg-red-500">{targets.map(renderTargetBox)}</div>
        {renderBottomDownIcon()}
      </div>
    </div>
  );
};

export default TargetPanel;
