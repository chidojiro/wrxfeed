import { AddSmallSolid, TeamIcon } from '@/assets';
import { Button } from '@/common/components';
import { EMPTY_ARRAY, MainGroups } from '@/common/constants';
import { getColorByText } from '@/main/utils';
import { useDepartment } from '@/team/useDepartment';
import { useDisclosure } from '@dwarvesf/react-hooks';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AddTargetModal } from './AddTargetModal';
import { TargetCards } from './TargetCards';
import { useTargets } from './useTargets';

export interface TeamTargetSectionProps {
  className?: string;
  departmentId: number;
}

export const TeamTargetSection: React.FC<TeamTargetSectionProps> = ({
  className = '',
  departmentId,
}) => {
  const addTargetModalDisclosure = useDisclosure();
  const history = useHistory();

  const { data: department } = useDepartment(departmentId);
  const { data: targets = EMPTY_ARRAY, mutate: mutateTargets } = useTargets({
    dep: departmentId,
    forYou: 1,
  });

  const teamHeaderColor: string = React.useMemo(
    () => getColorByText(department?.name ?? '', department?.id, true),
    [department?.id, department?.name],
  );

  const onClickTeamName = () => {
    if (isNaN(departmentId)) {
      return;
    }
    history.push({
      pathname: `/departments/${departmentId}`,
      search: `?route=${MainGroups.Following}`,
    });
  };

  return (
    <div className={clsx('flex flex-col', className)} key={`targets-by-team-${department?.id}`}>
      <div
        className="flex flex-row items-center px-6 mt-6 justify-between h-14 max-h-14 rounded-card"
        style={{ background: teamHeaderColor }}
      >
        <div className="flex flex-row items-center space-x-2">
          <TeamIcon
            className="w-4 h-4 fill-current path-no-filled text-white opacity-100"
            aria-hidden="true"
            width={16}
            height={16}
          />
          <Button onClick={onClickTeamName}>
            <p className="text-white font-semibold">{department?.name}</p>
          </Button>
        </div>
        <Button
          onClick={addTargetModalDisclosure.onOpen}
          variant="text"
          colorScheme="white"
          className="text-sm"
          iconLeft={
            <AddSmallSolid
              width={16}
              height={16}
              className="stroke-current path-no-stroke"
              viewBox="0 0 16 16"
            />
          }
        >
          Create Target
        </Button>
      </div>
      <TargetCards
        targets={targets}
        onUpdateSuccess={() => mutateTargets()}
        onDeleteSuccess={() => mutateTargets()}
      />
      <AddTargetModal
        open={addTargetModalDisclosure.isOpen}
        onClose={addTargetModalDisclosure.onClose}
        onCancel={addTargetModalDisclosure.onClose}
        departmentId={departmentId}
        onDeleteSuccess={(id: number) =>
          mutateTargets(targets.filter((target) => target.id !== id))
        }
        onUpdateSuccess={() => mutateTargets()}
        onCreateSuccess={() => mutateTargets()}
        useDefaultApis
      />
    </div>
  );
};
