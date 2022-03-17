import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

import { classNames, formatCurrency } from '@common/utils';
import { BasicsEditCircle } from '@assets';
import { FeedItem } from '@main/entity';

interface TargetChartViewProps {
  className?: string;
  feedItem: FeedItem;
  onEdit: () => void;
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
    dec: 87,
    jan: 69,
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
  },
  {
    name: 'Feb 24',
    dec: 2500,
    jan: 2390,
  },
  {
    name: 'Feb 28',
    dec: 2800,
    jan: 3490,
  },
];

const TargetChartView: React.VFC<TargetChartViewProps> = ({ className, feedItem, onEdit }) => {
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
  const dataLevels = [
    {
      id: 0,
      value: 0,
      title: '0',
    },
    {
      id: 1,
      value: 25000,
      title: '25k',
    },
    {
      id: 2,
      value: 50000,
      title: '50k',
    },
    {
      id: 3,
      value: 75000,
      title: '75k',
      isTarget: true,
    },
    {
      id: 4,
      value: 100000,
      title: '100k',
    },
    {
      id: 5,
      value: 125000,
      title: '125k',
    },
  ];

  const renderTooltipContent = () => {
    const topTransactions = [
      {
        id: 0,
        vendorName: 'Amazon Business EU S.à.r.l',
        amountUsd: 10067.87,
      },
      {
        id: 1,
        vendorName: 'SHI International Corp',
        amountUsd: 7067.87,
      },
      {
        id: 2,
        vendorName: 'Centralpoint',
        amountUsd: 1788.69,
      },
    ];
    return (
      <div className="flex bg-primary px-6 py-2 rounded-sm">
        <div className="flex flex-col space-y-1">
          <div className="flex flex-row items-center space-x-1">
            <p className="text-white text-2xs font-semibold">Feb 16, 2022</p>
            <p className="text-white text-2xs font-normal">(Top 3 transactions)</p>
          </div>
          {topTransactions.map((tran) => {
            return (
              <div
                key={`topTransactions-${tran.id}`}
                className="flex flex-row justify-between items-center space-x-0.5"
              >
                <p className="text-Gray-6 text-2xs min-w-[160px]">{tran.vendorName}</p>
                <p className="text-white text-2xs font-semibold w-18 text-right">
                  {tran.amountUsd}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderChartVisualize = () => {
    return (
      <div className="flex flex-col mt-2 w-full h-[479px]">
        <div className="flex relative flex-col flex-1 py-6">
          <div className="absolute flex w-full h-[396px] justify-between flex-col-reverse">
            {dataLevels.map((level) => {
              const textColor = level?.isTarget ? 'text-Accent-2' : 'text-Gray-6';
              return (
                <div
                  key={`dataLevels-${level?.id}`}
                  className="flex flex-row space-x-4 items-center w-full"
                >
                  <p className={classNames('text-xs font-semibold text-right w-8', textColor)}>
                    {level?.title}
                  </p>
                  <div
                    className={classNames(
                      'flex flex-1 w-auto h-px',
                      level?.isTarget ? 'dashed-line' : 'bg-Gray-11',
                    )}
                  />
                </div>
              );
            })}
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 50,
                bottom: 5,
              }}
            >
              <Tooltip cursor position={{ y: 5 }} content={renderTooltipContent} />
              <Line
                name="Dec"
                type="linear"
                dataKey="dec"
                strokeWidth={4}
                stroke="#E7E8EC"
                dot={false}
              />
              <Line
                name="Jan"
                type="linear"
                dataKey="jan"
                strokeWidth={4}
                stroke="#C5C8CD"
                dot={false}
              />
              <Line
                name="Feb"
                type="linear"
                dataKey="feb"
                strokeWidth={4}
                stroke="#6565FB"
                // activeDot={{ r: 8 }}
                dot={false}
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
        onClick={onEdit}
      >
        <BasicsEditCircle className="w-4 h-4 path-no-filled text-Gray-6 fill-current" />
        <p className="text-xs text-Gray-3 font-normal">Edit</p>
      </button>
    );
  };
  return (
    <div className="flex flex-col space-y-4">
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
      <div className="bg-Gray-11 h-px w-full" />
    </div>
  );
};

export default TargetChartView;
