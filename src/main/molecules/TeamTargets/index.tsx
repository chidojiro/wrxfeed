/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useTarget } from '@main/hooks';

import { Department, Target } from '@main/entity';
import { TargetFilter, TargetPropType } from '@api/types';

import AddTargetModal from '@main/molecules/AddTargetModal';
import { ReactComponent as BasicsAddSmall } from '@assets/icons/outline/basics-add-small.svg';
import { classNames } from '@common/utils';
import { SearchResult } from '@main/types';
import Loading from '@common/atoms/Loading';
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
  const [targetView, setTargetView] = useState<ReactNode[]>([]);
  const [havePrimary, setHavePrimary] = useState<boolean>(false);

  const [filter, setFilter] = useState<TargetFilter>({
    ...initFilter,
    dep: depId,
  });

  useEffect(() => {
    // clear old target first
    setTargetView([]);
    setFilter({
      ...filter,
      dep: depId,
    });
  }, [depId]);

  const onClickNewTarget = () => setShowAddTarget(true);
  const onClickEdit = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, target: Target) => {
    event.stopPropagation();
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
    isGetTargets,
  } = useTarget({
    filter,
    cbPost: { onSuccess: onPostTargetSuccess, onError: onPostTargetError },
    cbPut: { onSuccess: onPutTargetSuccess, onError: onPutError },
    cbDelete: { onSuccess: onDeleteTargetSuccess, onError: onDeleteError },
  });

  useEffect(() => {
    const targetViewTemp: ReactNode[] = [];
    const startCount = havePrimary ? 1 : 0;
    for (let i = startCount; i < targets.length; i += 1) {
      const item = targets[i];
      const nextItem = targets[i + 1];
      const left = targets.length - (i + 1);
      if (left > 0) {
        targetViewTemp.push(
          <div
            className="flex flex-col sm:flex-row w-full max-w-full overflow-hidden"
            key={`targetView-${item?.id}`}
          >
            <TeamTargetRow
              className="border-r border-Gray-11 w-1/2"
              target={item}
              onClickEdit={(event) => onClickEdit(event, item)}
            />
            {/* <div className="hidden sm:flex w-px h-auto bg-Gray-11" /> */}
            <TeamTargetRow
              className="w-1/2"
              target={nextItem}
              onClickEdit={(event) => onClickEdit(event, nextItem)}
            />
          </div>,
        );
        i += 1;
      }
      if (left === 0) {
        targetViewTemp.push(
          <div
            className="flex flex-col sm:flex-row w-full max-w-full"
            key={`targetView-${item?.id}`}
          >
            <TeamTargetRow
              className="w-6/12"
              target={item}
              onClickEdit={(event) => onClickEdit(event, item)}
            />
            <div className="hidden sm:flex w-px h-auto bg-Gray-11" />
            <EmptyTarget className="w-6/12" onClickNewTarget={onClickNewTarget} />
          </div>,
        );
      }
    }
    if (targetViewTemp.length === 0) {
      targetViewTemp.push(
        <div key="targetView-EmptyTarget">
          <EmptyTarget onClickNewTarget={onClickNewTarget} />
        </div>,
      );
    }
    setTargetView(targetViewTemp);
    setHavePrimary(targets.length > 0);
  }, [havePrimary, targets]);

  const renderAddNewTargetButton = () => {
    return (
      <button
        type="button"
        className="flex flex-row items-center px-2 py-1.5 rounded-sm hover:bg-Gray-12 ml-auto"
        onClick={onClickNewTarget}
      >
        <BasicsAddSmall className="w-4 h-4 mr-0.5" />
        <p className="text-xs text-Gray-3 font-normal">New</p>
      </button>
    );
  };

  const prePopulatedProps: SearchResult = {
    id: `${TargetPropType.DEPARTMENT.toUpperCase()}-${dept?.id}`,
    title: dept?.name,
    type: TargetPropType.DEPARTMENT,
    directoryId: dept.id,
  };

  return (
    <div className={classNames('flex flex-col mt-px w-full', className)}>
      <div className="flex w-full flex-row px-6 py-3 items-center">
        <p className="text-Gray-3 font-semibold">Team Targets</p>
        {isGetTargets && <Loading width={12} height={12} color="Gray-3 ml-3" />}
        {renderAddNewTargetButton()}
      </div>
      {targets.length > 0 && havePrimary && !isGetTargets && (
        <TeamTargetRow target={targets[0]} onClickEdit={onClickEdit} />
      )}
      {targetView}
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
        department={dept}
      />
    </div>
  );
};

export default TeamTargets;
