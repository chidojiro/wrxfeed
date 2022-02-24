import { classNames } from '@common/utils';
import React from 'react';
import { BasicsEditCircle } from '@assets/index';

interface TargetChartViewProps {
  className?: string;
}

export type SymbolNote = {
  id: number | string;
  color: string;
  name: string;
  type?: string;
};

export const targetChartData = [];

const TargetChartView: React.VFC<TargetChartViewProps> = ({ className }) => {
  const onClickEditTarget = () => undefined;

  const symbolNoteData: SymbolNote[] = [
    {
      id: 'FebLine',
      color: '#6565FB',
      name: 'Feb',
      type: '',
    },
    {
      id: 'JanLine',
      color: '#BEC1C7',
      name: 'Jan',
      type: '',
    },
    {
      id: 'DevLine',
      color: '#EFEFF1',
      name: 'Dec',
      type: '',
    },
    {
      id: 'TargetLine',
      color: '#6565FB',
      name: 'Target',
      type: 'divide-dashed',
    },
  ];

  const renderSymbolNote = (item: SymbolNote) => {
    return (
      <div className="flex flex-row items-center space-x-2">
        <div
          className={classNames('flex w-6 h-1', item?.type ?? '')}
          style={{ backgroundColor: item?.color }}
        />
        <p className="text-Gray-3 text-xs font-semibold">{item?.name}</p>
      </div>
    );
  };

  const renderChartSymbolNote = () => {
    return (
      <div className="flex flex-row justify-center mt-2 py-2 px-[50px] space-x-8">
        {symbolNoteData.map(renderSymbolNote)}
      </div>
    );
  };
  const renderChartVisualize = () => {
    return (
      <div className="flex flex-col mt-2 w-full h-[479px]">
        <div className="flex flex-1 justify-center items-center bg-blue-100">
          <p className="text-3xl text-Gray-6">Target Charts</p>
        </div>
        {renderChartSymbolNote()}
      </div>
    );
  };
  const renderEditTargetButton = () => {
    return (
      <button
        type="button"
        className="flex ml-auto flex-row items-center px-3 py-1.5 space-x-2 rounded-sm hover:bg-Gray-12"
        onClick={onClickEditTarget}
      >
        <BasicsEditCircle className="w-4 h-4" />
        <p className="text-xs text-Gray-3 font-normal">Edit</p>
      </button>
    );
  };
  return (
    <div className={classNames('flex flex-col mt-4 w-full px-8', className ?? '')}>
      <div className="flex flex-row space-x-4 w-auto">
        <div className="flex flex-col">
          <p className="text-xs text-Gray-3">Current Spend</p>
          <p className="text-xl text-primary font-bold mt-1">$60,400.76</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-Gray-3">Target</p>
          <p className="text-xl text-primary font-bold mt-1">$75,000</p>
        </div>
        <div className="flex flex-1 justify-end flex-col items-end">{renderEditTargetButton()}</div>
      </div>
      {renderChartVisualize()}
    </div>
  );
};

export default TargetChartView;
