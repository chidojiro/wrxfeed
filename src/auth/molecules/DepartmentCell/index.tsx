import { ReactComponent as BasicsAddSmall } from '@/assets/icons/solid/basics-add-small.svg';
import { ReactComponent as BasicsTickSmall } from '@/assets/icons/solid/basics-tick-small.svg';
import Loading from '@/common/atoms/Loading';
import { Button } from '@/common/components';
import { useProfile } from '@/profile/useProfile';
import { Department } from '@/main/entity';
import { DepartmentApis } from '@/team/apis';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSubscription } from '@/subscription/useSubscription';
import { useSubscribe } from '@/subscription/useSubscribe';
import { useUnsubscribe } from '@/subscription/useUnsubscribe';

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
  onFollow = () => undefined,
  onUnfollow = () => undefined,
  enableAction,
  enableUnfollowUserDept = true,
}) => {
  const { profile } = useProfile();
  const [childs, setChilds] = useState<Department[]>([]);

  const { isSubscribed } = useSubscription();
  const { subscribe, isSubscribing } = useSubscribe();
  const { unsubscribe, isUnsubscribing } = useUnsubscribe();

  const getChilds = useCallback(async () => {
    const deptChild: Department[] = await DepartmentApis.getList({
      parent: dept.id,
      ...INIT_PAGINATION,
    });
    setChilds(deptChild);
  }, [dept.id]);

  useEffect(() => {
    getChilds();
  }, [getChilds]);

  const isFollowed = isSubscribed('departments', dept.id);

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
      if (isUnsubscribing) {
        toast.warn('Please wait a minute!');
        return;
      }
      unsubscribe({ departments: [dept, ...childs] });
      if (onUnfollow) onUnfollow(dept);
    } else {
      if (isSubscribing) {
        toast.warn('Please wait a minute!');
        return;
      }
      subscribe({ departments: [dept, ...childs] });
      if (onFollow) onFollow(dept);
    }
  };
  const renderIcon = () => {
    if (isUnsubscribing || isSubscribing) {
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

  const isUserDepartment = profile?.depId === dept?.id;
  const hoverStyle = isFollowed ? 'hover:bg-Gray-2' : 'hover:bg-Accent-3';
  const renderFollowButton = () => {
    if (!enableUnfollowUserDept && isUserDepartment) return null;
    return (
      <Button
        onClick={onClickFollowDepartment}
        className={clsx(
          'flex flex-row items-center px-3 py-2 space-x-1.5 rounded-full border border-transparent',
          bgColor,
          hoverStyle,
        )}
      >
        {renderIcon()}
        <p className={clsx('text-sm', textColor)}>{isFollowed ? 'Following' : 'Follow'}</p>
      </Button>
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
