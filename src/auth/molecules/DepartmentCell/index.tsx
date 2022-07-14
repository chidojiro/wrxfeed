import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import clsx from 'clsx';
import { Department } from '@/main/entity';

import { useSubscription } from '@/main/hooks/subscription.hook';
import { useIdentity } from '@/identity/hooks';

import Loading from '@/common/atoms/Loading';

import { ReactComponent as BasicsTickSmall } from '@/assets/icons/solid/basics-tick-small.svg';
import { ReactComponent as BasicsAddSmall } from '@/assets/icons/solid/basics-add-small.svg';
import { useApi } from '@/api';

const LIMIT = 9999;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

interface DepartmentCellProps {
  className?: string;
  dept: Department;
  onFollowedTeam?: (teams: Department[]) => void;
  onFollowTeamFail?: (error: unknown) => void;
  onUnfollowedTeam?: (teams: Department[]) => void;
  onUnfollowTeamFail?: (error: unknown) => void;
  onFollow?: (team: Department) => void;
  onUnfollow?: (team: Department) => void;
  enableAction: boolean;
  enableUnfollowUserDept?: boolean;
}

const DepartmentCell: React.FC<DepartmentCellProps> = ({
  className = '',
  dept,
  onFollowedTeam = () => undefined,
  onFollowTeamFail = () => undefined,
  onUnfollowedTeam = () => undefined,
  onUnfollowTeamFail = () => undefined,
  onFollow = () => undefined,
  onUnfollow = () => undefined,
  enableAction,
  enableUnfollowUserDept = true,
}) => {
  const identity = useIdentity();
  const ApiClient = useApi();
  const [childs, setChilds] = useState<Department[]>([]);

  const onFollowSuccess = async () => {
    onFollowedTeam([dept, ...childs]);
  };
  const onUnfollowSuccess = async () => {
    onUnfollowedTeam([dept, ...childs]);
  };

  const { isFollowLoading, isUnfollowLoading, isFollowing, batchSubscribe, batchUnsubscribe } =
    useSubscription({
      onFollowSuccess,
      onFollowError: (error: unknown) => onFollowTeamFail(error),
      onUnfollowSuccess,
      onUnfollowError: (error: unknown) => onUnfollowTeamFail(error),
    });

  const getChilds = useCallback(async () => {
    const deptChild: Department[] = await ApiClient.getDepartments({
      parent: dept.id,
      ...INIT_PAGINATION,
    });
    setChilds(deptChild);
  }, [ApiClient, dept.id]);

  useEffect(() => {
    getChilds();
  }, [getChilds]);

  const isFollowed = isFollowing('departments', dept);

  const bgColor = isFollowed ? 'bg-Accent-2' : 'bg-white';
  const textColor = isFollowed ? 'text-white' : 'text-Gray-3';

  const onClickFollowDepartment = async () => {
    if (!enableAction) {
      toast.warn('Please wait a minute!');
      return;
    }

    // const deptChild: Department[] = await ApiClient.getDepartments({
    //   parent: dept.id,
    //   ...INIT_PAGINATION,
    // });
    // setChilds(deptChild);

    if (isFollowed) {
      if (isUnfollowLoading) {
        toast.warn('Please wait a minute!');
        return;
      }
      batchUnsubscribe({ departments: [dept, ...childs] });
      if (onUnfollow) onUnfollow(dept);
    } else {
      if (isFollowLoading) {
        toast.warn('Please wait a minute!');
        return;
      }
      batchSubscribe({ departments: [dept, ...childs] });
      if (onFollow) onFollow(dept);
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
    if (!enableUnfollowUserDept && isUserDepartment) return null;
    return (
      <button
        type="button"
        onClick={onClickFollowDepartment}
        className={clsx(
          'flex flex-row items-center px-3 py-2 space-x-1.5 rounded-full border border-transparent',
          bgColor,
          hoverStyle,
        )}
      >
        {renderIcon()}
        <p className={clsx('text-sm', textColor)}>{isFollowed ? 'Following' : 'Follow'}</p>
      </button>
    );
  };

  const paddingVertical = isUserDepartment ? 'py-6' : 'py-4';
  return (
    <div
      key={dept?.id}
      className={clsx(
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
