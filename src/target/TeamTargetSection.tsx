import { AddSmallSolid, TeamIcon } from '@/assets';
import clsx from 'clsx';
import { getColorByText } from '@/main/utils';
import { useDepartment } from '@/team/useDepartment';
import { useDisclosure } from '@dwarvesf/react-hooks';
import React from 'react';
import { AddTargetModal } from './AddTargetModal';
import { TargetWrapList } from './TargetWrapList';
import { Target } from './types';
import { useTargets } from './useTargets';

export interface TeamTargetSectionProps {
  className?: string;
  departmentId: number;
}

export const TeamTargetSection: React.VFC<TeamTargetSectionProps> = ({
  className = '',
  departmentId,
}) => {
  const [itemEditing, setItemEditing] = React.useState<Target | null>(null);

  const addTargetModalDisclosure = useDisclosure();

  const handleModalClose = () => {
    addTargetModalDisclosure.onClose();
    setItemEditing(null);
  };

  const { data: department } = useDepartment(departmentId);
  const { data: targets = [], mutate: mutateTargets } = useTargets({ dep: departmentId });

  const teamHeaderColor = React.useMemo(
    () => getColorByText(department?.name ?? '', department?.id, true),
    [department?.id, department?.name],
  );

  const handleEditTarget = (item: Target) => {
    setItemEditing(item);
    addTargetModalDisclosure.onOpen();
  };

  return (
    <div
      className={clsx('flex flex-col space-y-2', className)}
      key={`targets-by-team-${department?.id}`}
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
          <p className="text-white font-semibold">{department?.name}</p>
        </div>
        <button
          type="button"
          onClick={addTargetModalDisclosure.onOpen}
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
          targets={targets}
          onEditClick={handleEditTarget}
          onDeleteSuccess={() => mutateTargets()}
        />
      </div>
      <AddTargetModal
        open={addTargetModalDisclosure.isOpen}
        onClose={handleModalClose}
        onCancel={handleModalClose}
        target={itemEditing}
        departmentId={departmentId}
        onDeleteSuccess={(id: number) =>
          mutateTargets(targets.filter((target) => target.id !== id))
        }
        onUpdateSuccess={() => mutateTargets()}
        onCreateSuccess={() => mutateTargets()}
      />
    </div>
  );
};
