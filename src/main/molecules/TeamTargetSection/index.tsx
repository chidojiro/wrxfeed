import { AddSmallSolid, TeamIcon } from '@/assets';
import { classNames } from '@/common/utils';
import { useTarget } from '@/main/hooks';
import AddTargetModal from '@/main/molecules/AddTargetModal';
import TargetWrapList from '@/main/molecules/TargetWrapList';
import { getColorByText } from '@/main/utils';
import { Target, TargetByTeam } from '@/target/types';
import React from 'react';

export interface TeamTargetSectionProps {
  className?: string;
  onRemoveItem?: (id: number) => void;
  targetByTeam: TargetByTeam;
}

const TeamTargetSection: React.VFC<TeamTargetSectionProps> = ({
  className = '',
  targetByTeam,
  onRemoveItem,
}) => {
  const [showAddTarget, setShowAddTarget] = React.useState<boolean>(false);
  const [itemEditing, setItemEditing] = React.useState<Target | null>(null);
  const [itemDeleting, setItemDeleting] = React.useState<Target | null>(null);
  const { deleteTarget, postTarget, putTarget, isPostTarget, isPutTarget, isDeleteTarget } =
    useTarget({
      autoLoad: false,
      cbDelete: {
        onSuccess: (id) => {
          if (id && onRemoveItem) onRemoveItem(id);
        },
        onError: () => null,
      },
    });
  const teamHeaderColor = React.useMemo(
    () => getColorByText(targetByTeam.department.name ?? '', targetByTeam?.department?.id, true),
    [targetByTeam?.department?.id, targetByTeam?.department?.name],
  );
  const onClickCreate = () => setShowAddTarget(true);
  const handleEditTarget = (item: Target) => {
    setItemEditing(item);
    setShowAddTarget(true);
  };
  const handleDeleteTarget = (item: Target) => {
    setItemDeleting(item);
    deleteTarget(item.id);
  };
  return (
    <div
      className={classNames('flex flex-col space-y-2', className)}
      key={`targets-by-team-${targetByTeam?.department?.id}`}
    >
      <div
        className="flex flex-row items-center px-6 mt-6 justify-between h-14 max-h-14 rounded-card max-w-[500px] dashboard:max-w-[1016px] mr-8"
        style={{ background: teamHeaderColor }}
      >
        <div className="flex flex-row items-center space-x-2">
          <TeamIcon
            className="w-4 h-4 fill-current path-no-filled text-white opacity-100"
            aria-hidden="true"
            width={16}
            height={16}
          />
          <p className="text-white font-semibold">{targetByTeam?.department?.name}</p>
        </div>
        <button
          type="button"
          onClick={onClickCreate}
          className="flex flex-row items-center space-x-2 pr-3"
        >
          <AddSmallSolid
            width={16}
            height={16}
            className="stroke-current path-no-stroke text-white"
            viewBox="0 0 16 16"
          />
          <p className="text-white text-sm">Create Target</p>
        </button>
      </div>
      <div className="flex flex-1 flex-row flex-wrap">
        <TargetWrapList
          targets={targetByTeam?.targets}
          onEdit={handleEditTarget}
          onDelete={handleDeleteTarget}
          deletingItemId={itemDeleting?.id}
        />
      </div>
      <AddTargetModal
        open={showAddTarget}
        onClose={() => setShowAddTarget(false)}
        onCancel={() => setShowAddTarget(false)}
        deleteTarget={deleteTarget}
        postTarget={postTarget}
        putTarget={putTarget}
        itemEditing={itemEditing}
        isCreatingOrSaving={isPostTarget || isPutTarget}
        isDeleting={isDeleteTarget}
        department={targetByTeam.department}
      />
    </div>
  );
};

export default TeamTargetSection;
