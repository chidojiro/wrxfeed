import { TargetArrowFilled } from '@/assets';
import { ReactComponent as BasicsAddSmall } from '@/assets/icons/outline/basics-add-small.svg';
import { Button, OverlayLoader } from '@/common/components';
import { AddTargetModal } from '@/target/AddTargetModal';
import { useTargets } from '@/target/useTargets';
import { useDisclosure } from '@dwarvesf/react-hooks';
import clsx from 'clsx';
import { Link, useHistory } from 'react-router-dom';

type TeamTargetSummaryProps = {
  departmentId: number;
};

export const TeamTargetSummary = ({ departmentId }: TeamTargetSummaryProps) => {
  const history = useHistory();

  const addTargetModalDisclosure = useDisclosure();

  const { data: targets = [], isValidating } = useTargets({ dep: departmentId });

  return (
    <>
      <OverlayLoader loading={isValidating}>
        <div className="shadow-card rounded-card bg-white flex p-6">
          <div className="flex items-center">
            <Link to="/dashboard/all-company" className="border-r border-solid pr-5 flex gap-3">
              <div
                className={clsx(
                  'rounded-full bg-Gray-12 w-14 h-14 flex items-center justify-center',
                )}
              >
                <TargetArrowFilled />
              </div>
              <div>
                <p className="text-Gray-6">Targets</p>
                <p className="text-2xl font-semibold">{targets.length}</p>
              </div>
            </Link>

            <Button
              className="pl-4 text-center hidden md:block"
              onClick={addTargetModalDisclosure.onOpen}
            >
              <div className="text-center justify-center flex items-center gap-2 mx-auto">
                <p className="text-md font-semibold">Create a target</p>
                <div className="rounded bg-Accent-2 !m-0 text-white">
                  <BasicsAddSmall className="w-4 h-4" />
                </div>
              </div>
              <p className="text-Gray-6 text-sm">
                Align your teams to common goals. Targets help you track spend with categories and
                vendors.
              </p>
            </Button>
          </div>
        </div>
      </OverlayLoader>
      <AddTargetModal
        open={addTargetModalDisclosure.isOpen}
        onClose={addTargetModalDisclosure.onClose}
        onCancel={addTargetModalDisclosure.onClose}
        departmentId={departmentId}
        onCreateSuccess={(data) => history.push(`/feed/${data.id}?route=TargetFeed`)}
      />
    </>
  );
};
