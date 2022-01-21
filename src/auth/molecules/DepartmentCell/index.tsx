import React from 'react';

import { classNames } from '@common/utils';
import { DepartmentSection } from '@main/hooks/department.hook';

import { useSubscription } from '@main/hooks/subscription.hook';

import { ReactComponent as BasicsTickSmall } from '@assets/icons/solid/basics-tick-small.svg';
import { ReactComponent as BasicsAddSmall } from '@assets/icons/solid/basics-add-small.svg';
import Loading from '@common/atoms/Loading';
import { toast } from 'react-toastify';
import { useIdentity } from '@identity/hooks';

interface DepartmentCellProps {
  className?: string;
  dept: DepartmentSection;
  onFollowedTeam?: (team: DepartmentSection) => void;
  onUnfollowedTeam?: (team: DepartmentSection) => void;
}

const DepartmentCell: React.VFC<DepartmentCellProps> = ({
  className = '',
  dept,
  onFollowedTeam = () => undefined,
  onUnfollowedTeam = () => undefined,
}) => {
  const identity = useIdentity();
  const { subscribe, unsubscribe, isFollowLoading, isUnfollowLoading, isFollowing } =
    useSubscription({
      onFollowSuccess: () => onFollowedTeam(dept),
      onUnfollowSuccess: () => onUnfollowedTeam(dept),
    });

  const isFollowed = isFollowing('departments', dept);

  const bgColor = isFollowed ? 'bg-Accent-2' : 'bg-white';
  const textColor = isFollowed ? 'text-white' : 'text-Gray-3';

  const onClickFollowDepartment = () => {
    if (isFollowed) {
      if (isUnfollowLoading) {
        toast.warn('Please wait a minute!');
        return;
      }
      unsubscribe('departments', dept);
    } else {
      if (isFollowLoading) {
        toast.warn('Please wait a minute!');
        return;
      }
      subscribe('departments', dept);
    }
  };
  const renderIcon = () => {
    if (isFollowLoading || isUnfollowLoading) {
      return (
        <div className="w-5 h-5 flex justify-center items-center">
          <Loading width={12} height={12} color={isFollowed ? 'white' : 'primary'} />
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

  const isUserDepartment = identity?.depId === dept?.id;
  const hoverStyle = isFollowed ? 'hover:bg-Gray-2' : 'hover:bg-Accent-3';
  const renderFollowButton = () => {
    if (isUserDepartment) return null;
    return (
      <button
        type="button"
        onClick={onClickFollowDepartment}
        className={classNames(
          'flex flex-row items-center px-3 py-2 space-x-1.5 rounded-full border border-transparent',
          bgColor,
          hoverStyle,
        )}
      >
        {renderIcon()}
        <p className={classNames('text-sm', textColor)}>{isFollowed ? 'Following' : 'Follow'}</p>
      </button>
    );
  };

  const paddingVertical = isUserDepartment ? 'py-6' : 'py-4';
  return (
    <div
      key={dept?.id}
      className={classNames(
        'flex flex-row items-center justify-between border-Gray-11 border-b',
        paddingVertical,
        className,
      )}
    >
      <p className="text-sm font-medium text-Gray-3">{dept?.name}</p>
      {renderFollowButton()}
    </div>
  );
};

export default DepartmentCell;
