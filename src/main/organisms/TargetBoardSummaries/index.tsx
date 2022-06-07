import React, { FunctionComponent, SVGAttributes } from 'react';
import { classNames } from '@common/utils';
import { TargetArrowFilled, TrendDown, TrendUp, WarningFilled } from '@assets';

export interface TargetBoardSummariesProps {
  className?: string;
}

export type SummaryInfoType = {
  id: string;
  title: string;
  icon: FunctionComponent<SVGAttributes<SVGElement>> | null;
  value: string;
};

const TargetBoardSummaries: React.VFC<TargetBoardSummariesProps> = ({ className = '' }) => {
  const summaries = [
    {
      id: 'number-Targets',
      title: 'Targets',
      icon: TargetArrowFilled,
      value: '12',
    },
    {
      id: 'number-On-Track',
      title: 'On Track',
      icon: TrendUp,
      value: '75%',
    },
    {
      id: 'number-At-Risk',
      title: 'At Risk',
      icon: TrendDown,
      value: '13%',
    },
    {
      id: 'number-Exceeded',
      title: 'Exceeded',
      icon: WarningFilled,
      value: '7%',
    },
  ];
  return (
    <div
      className={classNames(
        'flex flex-row justify-between space-x-6 max-w-[500px] xl:max-w-[1016px] mr-8',
        className,
      )}
    >
      {summaries.map((item: SummaryInfoType) => {
        const { icon: IconInfo } = item;
        return (
          <div
            key={`summaries-${item.id}`}
            className="h-24 w-[236px] flex flex-row items-center px-4 space-x-4.5 rounded-card bg-white shadow-shadowCard"
          >
            <div className="w-14 h-14 rounded-full bg-Gray-12 flex justify-center items-center">
              {IconInfo && (
                <IconInfo
                  className="w-7 h-7 fill-current path-no-filled text-Gray-3 opacity-100"
                  aria-hidden="true"
                  width={28}
                  height={28}
                />
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-Gray-6">{item.title}</p>
              <p className="text-2xl text-primary font-semibold">{item.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TargetBoardSummaries;
