import { CommentIcon } from '@/assets';
import { ConditionalWrapper } from '@/common/components';
import { MainGroups } from '@/common/constants';
import { useHandler } from '@/common/hooks';
import { getDisplayCurrency } from '@/main/utils';
import { DepartmentApis } from '@/team/apis';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { DepartmentSummary, TargetStatusType } from '../types';

type SummaryRowProps = {
  data: DepartmentSummary;
};

const getStatusColor = (status?: TargetStatusType) => {
  switch (status) {
    case TargetStatusType.OnTrack:
      return 'bg-Green-400';
    case TargetStatusType.AtRisk:
      return 'bg-yellow-2';
    case TargetStatusType.Exceeded:
      return 'bg-red-1';
    default:
      return 'bg-transparent';
  }
};

export const SummaryRow = ({
  data: { commentCount, id, name, spends, target },
}: SummaryRowProps) => {
  const history = useHistory();

  const { handle: viewDepartmentSummary } = useHandler((departmentId: number) =>
    DepartmentApis.viewSummary(departmentId),
  );

  const handleClick = async () => {
    if (!target) return;
    await viewDepartmentSummary(id);

    history.push({
      pathname: `/departments/${id}`,
      search: `?route=${MainGroups.Following}`,
    });
  };

  const targetSpends = target?.spendings?.reduce((acc, cur) => acc + cur.total, 0);

  const baseWrapperClassName = clsx(
    'grid grid-cols-10 items-center',
    'w-full py-0.5 px-1',
    'border-b border-Gray-28',
    'text-xs text-center',
  );

  return (
    <ConditionalWrapper
      if={{
        condition: !!targetSpends,
        component: 'button',
        props: {
          onClick: handleClick,
          className: clsx(baseWrapperClassName, 'list-row-hover'),
        },
      }}
      else={{ component: 'div', props: { className: baseWrapperClassName } }}
    >
      <div className="col-span-5 flex items-center gap-2 text-Gray-3 text-left">
        <div
          className={clsx(
            'rounded-full h-9 w-1 flex-shrink-0',
            targetSpends ? getStatusColor(target?.trackingStatus) : 'bg-transparent',
          )}
        ></div>
        <p className="line-clamp-2">{name}</p>
      </div>
      <div className="col-span-2 text-Gray-6">{getDisplayCurrency(spends)}</div>
      <div className="col-span-2 text-Gray-6">{getDisplayCurrency(targetSpends)}</div>
      <div className="col-span-1 relative flex items-center justify-center">
        {!!commentCount && (
          <>
            <CommentIcon className="text-Gray-7" />
            <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 text-Gray-3 text-xs">
              {commentCount}
            </div>
          </>
        )}
      </div>
    </ConditionalWrapper>
  );
};
