import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useTarget } from '@main/hooks';

import { TargetFilter, TargetProp } from '@api/types';
import { SearchResult } from '@main/types';
import { Target } from '@main/entity';
import { classNames } from '@common/utils';

import Loading from '@common/atoms/Loading';
import { TargetRow } from '@main/molecules';
import AddTargetModal from '@main/organisms/AddTargetModal';
import { ReactComponent as BasicsAddSmall } from '@assets/icons/outline/basics-add-small.svg';
import { BasicsDownSmall } from '@assets';

export interface TargetPanelProps {
  title?: string;
}

const GET_TARGETS_LIMIT = 30;

const initFilter = {
  offset: 0,
  limit: GET_TARGETS_LIMIT,
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  timestamp: Date.now(),
};

const TargetPanel: React.VFC<TargetPanelProps> = () => {
  const [filter, setFilter] = useState<TargetFilter>(initFilter);
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const [showAddTarget, setShowAddTarget] = useState<boolean>(false);
  const [itemEditing, setItemEditing] = useState<Target | null>(null);

  const onPostTargetSuccess = () => {
    toast.success('Successfully added target!');
    setShowAddTarget(false);
    setFilter({
      ...initFilter,
      timestamp: Date.now(),
    });
  };
  const onPostTargetError = () => undefined;
  const onPutTargetSuccess = () => {
    toast.success('Successfully updated target!');
    setShowAddTarget(false);
    setFilter({
      ...initFilter,
      timestamp: Date.now(),
    });
  };
  const onPutError = () => {};
  const onDeleteTargetSuccess = () => {
    toast.success('Successfully deleted target!');
    setShowAddTarget(false);
    setFilter({
      ...initFilter,
      timestamp: Date.now(),
    });
  };
  const onDeleteError = () => {};

  const {
    targets,
    isGetTargets,
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
  );

  const handleClickExpand = () => {
    if (isGetTargets) return;
    setExpanded(!isExpanded);
  };

  const onClickNewTarget = () => setShowAddTarget(true);

  const renderExpandedIcon = () => {
    if (targets.length < 5) return null;
    const expandStyle = isExpanded ? { transform: 'rotate(180deg)' } : {};
    return (
      <div className="flex flex-row h-4 items-center">
        <div className="flex flex-1 h-px bg-Gray-11 mr-1" />
        <button type="button" onClick={handleClickExpand}>
          <BasicsDownSmall className="flex" style={expandStyle} />
        </button>
        <div className="flex flex-1 h-px bg-Gray-11 ml-1" />
      </div>
    );
  };

  const onClickEdit = (target: Target) => {
    setItemEditing(target);
    setShowAddTarget(true);
  };

  const onCreateTarget = (amountInput: number | null, tags: SearchResult[]) => {
    const props: TargetProp[] = tags.map((tag: SearchResult) => {
      return {
        id: tag?.directoryId,
        type: tag?.type,
        name: tag?.title ?? '',
      };
    });
    postTarget({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      amount: amountInput,
      props,
    });
  };
  const onDeleteTarget = (targetId: number, amountInput: number, tags: SearchResult[]) => {
    const props: TargetProp[] = tags.map((tag: SearchResult) => {
      return {
        id: tag?.directoryId,
        type: tag?.type,
        name: tag?.title ?? '',
      };
    });
    deleteTarget(targetId, {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      amount: amountInput,
      props,
    });
  };
  const onSaveTarget = (targetId: number, amountInput: number, tags: SearchResult[]) => {
    const props: TargetProp[] = tags.map((tag: SearchResult) => {
      return {
        id: tag?.directoryId,
        type: tag?.type,
        name: tag?.title ?? '',
      };
    });
    putTarget(targetId, {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      amount: amountInput,
      props,
    });
  };

  const renderTargets = () => {
    if (isGetTargets && targets?.length === 0) {
      return (
        <div className="flex h-32 w-full justify-center items-center">
          <Loading width={15} height={15} />
        </div>
      );
    }
    if (targets.length === 0) {
      return (
        <div className="flex h-32 w-full justify-center items-center">
          <div className="flex text-gray-400 text-sm font-medium mx-4 text-center">
            {'There are currently no active targets! \n 🎯'}
          </div>
        </div>
      );
    }
    return (
      <ul className="flex flex-col">
        {targets.map((item: Target, index: number) => (
          <TargetRow
            key={`target-${item?.id}-${item?.month}`}
            target={item}
            index={index}
            onClickEdit={() => onClickEdit(item)}
          />
        ))}
      </ul>
    );
  };

  const renderListTargets = () => {
    const overflow = isExpanded ? 'overflow-scroll hide-scrollbar' : 'overflow-hidden';
    return <ul className={classNames('flex mt-2 flex-col', overflow)}>{renderTargets()}</ul>;
  };

  const heightExpand = isExpanded ? 'max-h-[85vh]' : 'max-h-[450px]';
  return (
    <div className={classNames('flex flex-1 pt-12 w-[330px]', heightExpand)}>
      <div className="flex flex-col w-full bg-white pt-6 pb-2 max-h-106 drop-shadow-md overflow-auto">
        <div className="flex flex-row items-center justify-between px-6">
          <div className="text-Gray-2 text-base font-semibold">Monthly Targets</div>
          <button
            type="button"
            className="flex flex-row items-center px-2 py-1.5 rounded-sm hover:bg-Gray-12"
            onClick={onClickNewTarget}
          >
            <BasicsAddSmall className="w-4 h-4 mr-0.5" />
            <p className="text-xs text-Gray-3 font-normal">New</p>
          </button>
        </div>
        {renderListTargets()}
        {renderExpandedIcon()}
      </div>
      <AddTargetModal
        open={showAddTarget}
        onClose={() => setShowAddTarget(false)}
        onCancel={() => setShowAddTarget(false)}
        onCreate={onCreateTarget}
        onSave={onSaveTarget}
        onDelete={onDeleteTarget}
        itemEditing={itemEditing}
        isCreatingOrSaving={isPostTarget || isPutTarget}
        isDeleting={isDeleteTarget}
      />
    </div>
  );
};

export default TargetPanel;
