/* eslint-disable jsx-a11y/accessible-emoji */
import React, { ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

import { useTarget } from '@main/hooks';

import { Department, Target } from '@main/entity';
import { TargetFilter, TargetPropType } from '@api/types';

import AddTargetModal from '@main/organisms/AddTargetModal';
import { ReactComponent as BasicsAddSmall } from '@assets/icons/outline/basics-add-small.svg';
import { classNames } from '@common/utils';
import { SearchResult } from '@main/types';
import TeamTargetRow from '../TeamTargetRow';
import EmptyTarget from '../EmptyTarget';

const GET_TARGETS_LIMIT = 6;

const initFilter = {
  offset: 0,
  limit: GET_TARGETS_LIMIT,
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  timestamp: Date.now(),
};

interface TeamTargetsProps {
  className?: string;
  dept: Department;
  depId: number;
}

const TeamTargets: React.VFC<TeamTargetsProps> = ({ className = '', dept, depId }) => {
  const [showAddTarget, setShowAddTarget] = useState<boolean>(false);
  const [itemEditing, setItemEditing] = useState<Target | null>(null);

  const [filter, setFilter] = useState<TargetFilter>({
    ...initFilter,
    dep: depId,
  });

  const onClickNewTarget = () => setShowAddTarget(true);
  const onClickEdit = (target: Target) => {
    setItemEditing(target);
    setShowAddTarget(true);
  };
  const hideAddTargetModal = () => {
    setItemEditing(null);
    setShowAddTarget(false);
  };
  const onPostTargetSuccess = () => {
    toast.success('New target has been added');
    hideAddTargetModal();
    setFilter({
      ...filter,
      timestamp: Date.now(),
    });
  };
  const onPostTargetError = () => undefined;
  const onPutTargetSuccess = () => {
    toast.success('Target has been saved');
    hideAddTargetModal();
    setFilter({
      ...filter,
      timestamp: Date.now(),
    });
  };
  const onPutError = () => {};
  const onDeleteTargetSuccess = () => {
    toast.success('Successfully deleted target!');
    hideAddTargetModal();
    setFilter({
      ...filter,
      timestamp: Date.now(),
    });
  };
  const onDeleteError = () => {};

  const {
    targets,
    postTarget,
    putTarget,
    deleteTarget,
    isPostTarget,
    isPutTarget,
    isDeleteTarget,
  } = useTarget(
    filter,
    { onSuccess: onPostTargetSuccess, onError: onPostTargetError },
    { onSuccess: onPutTargetSuccess, onError: onPutError },
    { onSuccess: onDeleteTargetSuccess, onError: onDeleteError },
    false,
  );

  const renderAddNewTargetButton = () => {
    return (
      <button
        type="button"
        className="flex flex-row items-center px-2 py-1.5 rounded-sm hover:bg-Gray-12"
        onClick={onClickNewTarget}
      >
        <BasicsAddSmall className="w-4 h-4 mr-0.5" />
        <p className="text-xs text-Gray-3 font-normal">New</p>
      </button>
    );
  };

  const renderSmallTargets = (data: Target[]) => {
    const targetView: ReactNode[] = [];
    for (let i = 1; i < data.length; i += 1) {
      const item = data[i];
      const nextItem = data[i + 1];
      const left = data.length - (i + 1);
      if (left > 0) {
        targetView.push(
          <div className="flex flex-col sm:flex-row w-full" key={`targetView-${item?.id}`}>
            <TeamTargetRow target={item} onClickEdit={() => onClickEdit(item)} />
            <div className="hidden sm:flex w-px h-auto bg-Gray-11" />
            <TeamTargetRow target={nextItem} onClickEdit={() => onClickEdit(nextItem)} />
          </div>,
        );
        i += 1;
      }
      if (left === 0) {
        targetView.push(
          <div className="flex flex-col sm:flex-row w-full" key={`targetView-${item?.id}`}>
            <TeamTargetRow className="w-6/12" target={item} onClickEdit={() => onClickEdit(item)} />
            <div className="hidden sm:flex w-px h-auto bg-Gray-11" />
            <EmptyTarget className="w-6/12" onClickNewTarget={onClickNewTarget} />
          </div>,
        );
      }
    }
    if (targetView.length === 0) {
      targetView.push(
        <div key="targetView-EmptyTarget">
          <EmptyTarget onClickNewTarget={onClickNewTarget} />
        </div>,
      );
    }
    return targetView;
  };

  const prePopulatedProps: SearchResult = {
    id: `${TargetPropType.DEPARTMENT.toUpperCase()}-${dept?.id}`,
    title: dept?.name,
    type: TargetPropType.DEPARTMENT,
    directoryId: dept.id,
  };

  return (
    <div className={classNames('flex flex-col mt-px w-full', className)}>
      <div className="flex w-full flex-row px-6 py-3 items-center justify-between">
        <p className="text-Gray-3 font-semibold">Team Targets</p>
        {renderAddNewTargetButton()}
      </div>
      {targets.length > 0 && <TeamTargetRow target={targets[0]} onClickEdit={onClickEdit} />}
      {renderSmallTargets(targets)}
      <AddTargetModal
        open={showAddTarget}
        onClose={() => hideAddTargetModal()}
        onCancel={() => hideAddTargetModal()}
        deleteTarget={deleteTarget}
        postTarget={postTarget}
        putTarget={putTarget}
        itemEditing={itemEditing}
        isCreatingOrSaving={isPostTarget || isPutTarget}
        isDeleting={isDeleteTarget}
        initTags={[prePopulatedProps]}
        depId={depId}
      />
    </div>
  );
};

export default TeamTargets;
