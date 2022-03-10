import { classNames, formatCurrency } from '@common/utils';
import React from 'react';
import { BasicsEditCircle } from '@assets/index';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FeedItem } from '@main/entity';

interface TargetChartViewProps {
  className?: string;
  feedItem: FeedItem;
}

export type SymbolNote = {
  id: number | string;
  color: string;
  name: string;
  type?: string;
};

export const targetChartData = [];

const data = [
  {
    name: 'Feb 4',
    dec: 0,
    jan: 0,
    feb: 0,
  },
  {
    name: 'Feb 8',
    dec: 260,
    jan: 200,
    feb: 300,
  },
  {
    name: 'Feb 12',
    dec: 620,
    jan: 400,
    feb: 600,
  },
  {
    name: 'Feb 16',
    dec: 1670,
    jan: 780,
    feb: 1520,
  },
  {
    name: 'Feb 20',
    dec: 2181,
    jan: 1890,
    feb: 3218,
  },
  {
    name: 'Feb 24',
    dec: 2500,
    jan: 2390,
    feb: 3800,
  },
  {
    name: 'Feb 28',
    dec: 2800,
    jan: 3490,
    feb: 5300,
  },
];

const TargetChartView: React.VFC<TargetChartViewProps> = ({ className, feedItem }) => {
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
        <div className="flex flex-1 justify-center items-center py-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Line name="Dec" type="linear" dataKey="dec" strokeWidth={4} stroke="#E7E8EC" />
              <Line name="Jan" type="linear" dataKey="jan" strokeWidth={4} stroke="#C5C8CD" />
              <Line
                name="Feb"
                type="linear"
                dataKey="feb"
                strokeWidth={4}
                stroke="#6565FB"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
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
    <>
      <div className={classNames('flex flex-col mt-4 w-full px-8', className ?? '')}>
        <div className="flex flex-row space-x-4 w-auto">
          <div className="flex flex-col min-w-[128px]">
            <p className="text-xs text-Gray-3">Current Spend</p>
            <p className="text-xl text-primary font-bold mt-1">
              {`$ ${formatCurrency(feedItem?.total)}`}
            </p>
          </div>
          <div className="flex flex-col min-w-[128px]">
            <p className="text-xs text-Gray-3">Target</p>
            <p className="text-xl text-primary font-bold mt-1">$75,000</p>
          </div>
          <div className="flex flex-1 justify-end flex-col items-end">
            {renderEditTargetButton()}
          </div>
        </div>
        {renderChartVisualize()}
      </div>
      <div className="flex flex-col py-4 mt-4">
        <div className="bg-Gray-11 h-px w-full" />
      </div>
    </>
  );
};

export default TargetChartView;
