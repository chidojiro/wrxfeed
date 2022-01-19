import React from 'react';

import { classNames } from '@common/utils';
import { Department } from '@main/entity';

import { useSubscription } from '@main/hooks/subscription.hook';

import { ReactComponent as BasicsTickSmall } from '@assets/icons/solid/basics-tick-small.svg';
import { ReactComponent as BasicsAddSmall } from '@assets/icons/solid/basics-add-small.svg';
import Loading from '@common/atoms/Loading';

interface DepartmentCellProps {
  className?: string;
  isFollowed: boolean;
  dept: Department;
}

const DepartmentCell: React.VFC<DepartmentCellProps> = ({ className = '', dept, isFollowed }) => {
  const { subscribe, unsubscribe, isFollowLoading, isUnfollowLoading } = useSubscription();

  const bgColor = isFollowed ? 'bg-Accent-2' : 'bg-white';
  const textColor = isFollowed ? 'text-white' : 'text-Gray-3';

  const onClickFollowDepartment = () => {
    if (isFollowed) {
      unsubscribe('departments', dept);
    } else {
      subscribe('departments', dept);
    }
  };
  const renderIcon = () => {
    if (isFollowLoading || isUnfollowLoading) {
      return (
        <div className="w-5 h-5 flex justify-center items-center">
          <Loading width={12} height={12} />
        </div>
      );
    }
    if (isFollowed) {
      return (
        <BasicsTickSmall
          width={20}
          height={20}
          className="w-5 h-5 stroke-current path-no-stroke text-white object-cover"
        />
      );
    }
    return <BasicsAddSmall width={20} height={20} className="w-5 h-5 stroke-current" />;
  };
  return (
    <div
      key={dept?.id}
      className={classNames(
        'flex flex-row items-center justify-between py-4 border-Gray-11 border-b',
        className,
      )}
    >
      <p className="text-sm font-medium text-Gray-3">{dept?.name}</p>
      <button
        type="button"
        onClick={onClickFollowDepartment}
        className={classNames(
          'flex flex-row items-center px-3 py-2 space-x-1.5 rounded-full border border-transparent hover:bg-Accent-3',
          bgColor,
        )}
      >
        {renderIcon()}
        <p className={classNames('text-sm', textColor)}>{isFollowed ? 'Following' : 'Follow'}</p>
      </button>
    </div>
  );
};

export default DepartmentCell;
