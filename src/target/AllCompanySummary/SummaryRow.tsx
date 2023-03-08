import { CommentGroup } from '@/feed/CommentGroup';
import { getDisplayUsdAmount } from '@/main/utils';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
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
      return 'bg-Accent-8';
  }
};

export const SummaryRow = ({ data: { comments, id, name, spends, target } }: SummaryRowProps) => {
  const targetSpends = target?.periods?.reduce((acc, cur) => acc + (cur.amount ?? 0), 0);

  return (
    <Link
      to={`/departments/${id}`}
      className="grid grid-cols-12 items-center w-full py-0.5 px-2 border-b border-Gray-28 text-xs text-center list-row-hover"
    >
      <div className="col-span-5 flex items-center gap-2 text-Gray-3 text-left">
        <div
          className={clsx(
            'rounded-full h-9 w-1 flex-shrink-0',
            targetSpends ? getStatusColor(target?.trackingStatus) : 'bg-Accent-8',
          )}
        ></div>
        <p className="line-clamp-2">{name}</p>
      </div>
      <div className="col-span-2 text-Gray-6 px-1">{getDisplayUsdAmount(spends)}</div>
      <div className="col-span-2 text-Gray-6 px-1">{getDisplayUsdAmount(targetSpends)}</div>
      <div className="col-span-3 relative px-1">
        {comments?.length ? (
          <Link className="flex items-center" to={`/feed/${target?.feedItem?.id}`}>
            <CommentGroup comments={comments} />
          </Link>
        ) : (
          '--'
        )}
      </div>
    </Link>
  );
};
