import { CommentIcon } from '@/assets';
import { Avatar, Button } from '@/common/components';
import { useHandler } from '@/common/hooks';
import { getDisplayUsdAmount } from '@/main/utils';
import { DepartmentApis } from '@/team/apis';
import clsx from 'clsx';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Comment, DepartmentSummary, TargetStatusType } from '../types';

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

const AvatarGroup = ({ comments }: { comments: Comment[] }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <Avatar
          className={clsx(` absolute left-0 border-2 border-white`, {
            'z-10 ml-3': index === 1,
            'z-20 ml-6': index === 2,
            'z-30 ml-9': index === 3,
          })}
          key={comment.user.id}
          src={comment.user.avatar as string}
          fullName={comment.user.fullName as string}
        />
      ))}
    </>
  );
};

export const SummaryRow = ({ data: { comments, id, name, spends, target } }: SummaryRowProps) => {
  const history = useHistory();

  const { handle: viewDepartmentSummary } = useHandler((departmentId: number) =>
    DepartmentApis.viewSummary(departmentId),
  );

  const handleClick = async () => {
    await viewDepartmentSummary(id);
    history.push({
      pathname: `/departments/${id}`,
    });
  };

  const targetSpends = target?.periods?.reduce((acc, cur) => acc + (cur.amount ?? 0), 0);

  return (
    <Button
      onClick={handleClick}
      className="grid grid-cols-12 items-center w-full py-0.5 px-2 border-b border-Gray-28 text-xs text-center list-row-hover"
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
      <div className="col-span-2 text-Gray-6">{getDisplayUsdAmount(spends)}</div>
      <div className="col-span-2 text-Gray-6">{getDisplayUsdAmount(targetSpends)}</div>
      <div className="col-span-3 relative">
        {Array.isArray(comments) && comments.length !== 0 ? (
          <Link
            className="flex items-center justify-start"
            to={`/feed/${target?.id}?route=TargetFeed`}
          >
            <AvatarGroup comments={comments} />
            <div
              className={clsx('z-50 absolute', {
                'left-9 xl:right-6': comments.length === 3,
                'left-6 xl:right-9': comments.length === 2,
                'left-3 xl:right-12': comments.length === 1,
              })}
            >
              <CommentIcon className="text-Gray-7 h-5 w-5" />
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-Gray-3 text-2xs">
                {comments.length}
              </div>
            </div>
          </Link>
        ) : (
          '--'
        )}
      </div>
    </Button>
  );
};
