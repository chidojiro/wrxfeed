import React, { FunctionComponent, SVGAttributes } from 'react';
import { TargetArrowFilled, TrendDown, TrendUp, WarningFilled } from '@/assets';
import { useDashboard } from '@/main/hooks/dashboard.hook';
import { classNames } from '@/common/utils';

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
  const { summaries } = useDashboard();

  const summariesList: SummaryInfoType[] = [
    {
      id: 'number-Targets',
      title: 'Targets',
      icon: TargetArrowFilled,
      value: summaries.total.toFixed(0),
    },
    {
      id: 'number-On-Track',
      title: 'On Track',
      icon: TrendUp,
      value: `${summaries.onTrack}%`,
    },
    {
      id: 'number-At-Risk',
      title: 'At Risk',
      icon: TrendDown,
      value: `${summaries.atRisk}%`,
    },
    {
      id: 'number-Exceeded',
      title: 'Exceeded',
      icon: WarningFilled,
      value: `${summaries.exceeded}%`,
    },
  ];
  return (
    <div
      className={classNames(
        'flex flex-row flex-grow flex-wrap justify-between w-full max-w-[500px] dashboard:max-w-[1016px] mr-4 dashboard:mr-8',
        className,
      )}
    >
      {summariesList.map((item: SummaryInfoType) => {
        const { icon: IconInfo } = item;
        return (
          <div
            key={`summaries-${item.id}`}
            className="h-24 w-[236px] flex flex-row my-3 dashboard:my-0 items-center px-4 space-x-4.5 rounded-card bg-white shadow-shadowCard"
          >
            <div className="w-14 h-14 rounded-full bg-Gray-12 flex justify-center items-center">
              {IconInfo && (
                <IconInfo
                  className="w-7 h-7 fill-current path-no-filled text-Gray-3 opacity-100 overflow-visible"
                  aria-hidden="false"
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
