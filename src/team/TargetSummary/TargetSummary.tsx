import { TargetArrowFilled } from '@/assets';
import clsx from 'clsx';
import React from 'react';
import { ReactComponent as BasicsAddSmall } from '@/assets/icons/outline/basics-add-small.svg';
import AddTargetModal from '@/main/molecules/AddTargetModal';
import { useDisclosure } from '@dwarvesf/react-hooks';
import { noop } from 'lodash-es';
import { Department } from '@/main/entity';
import { useHandler } from '@/common/hooks';
import { useApi } from '@/api';
import { PostTargetParams } from '@/api/types';
import { useTarget } from '@/main/hooks';

type TargetSummaryProps = {
  department: Department;
};

export const TargetSummary = ({ department }: TargetSummaryProps) => {
  const addTargetModalDisclosure = useDisclosure();

  const api = useApi();

  const { targets, mutate: mutateTargets } = useTarget({
    filter: { dep: department.id, limit: 9999 },
  });

  const { handle: createTarget, isLoading: isCreatingTarget } = useHandler(
    (target: PostTargetParams) => api.postTarget(target),
  );

  const handleTargetCreateConfirm = async (data: PostTargetParams) => {
    await createTarget(data);
    mutateTargets();
  };

  return (
    <div className="shadow-shadowCard rounded-card bg-white flex p-6">
      {addTargetModalDisclosure.isOpen && (
        <AddTargetModal
          open={addTargetModalDisclosure.isOpen}
          onClose={addTargetModalDisclosure.onClose}
          onCancel={addTargetModalDisclosure.onOpen}
          deleteTarget={noop}
          postTarget={handleTargetCreateConfirm}
          putTarget={noop}
          itemEditing={null}
          isCreatingOrSaving={isCreatingTarget}
          department={department}
        />
      )}
      <div className="flex items-center">
        <div className="border-r border-solid pr-5 flex gap-3">
          <div className={clsx('rounded-full bg-Gray-12 p-3 flex items-center justify-center')}>
            <TargetArrowFilled />
          </div>
          <div>
            <p className="text-Gray-6">Targets</p>
            <p className="text-2xl font-semibold">{targets.length}</p>
          </div>
        </div>

        <div className="pl-4 text-center">
          <button
            className="text-center justify-center flex items-center gap-2 mx-auto"
            onClick={addTargetModalDisclosure.onOpen}
          >
            <p className="text-md font-semibold">Create a target</p>
            <button className="rounded bg-Accent-2 !m-0 text-white">
              <BasicsAddSmall className="w-4 h-4" />
            </button>
          </button>
          <p className="text-Gray-6 text-sm">
            Align your teams to common goals. Targets help you track spend with categories and
            vendors.
          </p>
        </div>
      </div>
    </div>
  );
};
