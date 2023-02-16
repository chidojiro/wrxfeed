import { BasicsXSmall } from '@/assets';
import { Button, Tooltip } from '@/common/components';
import { Insight } from '@/insight/types';
import { Department } from '@/main/entity';
import { useUnsubscribe } from '@/subscription/useUnsubscribe';

export type UnfollowButtonProps = {
  department?: Department;
  insight?: Insight;
};

export const UnfollowButton = ({ department, insight }: UnfollowButtonProps) => {
  const { unsubscribe } = useUnsubscribe();

  return (
    <Tooltip
      trigger={
        <Button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();

            if (department) {
              unsubscribe('departments', department);
            }

            if (insight) {
              unsubscribe('insights', insight);
            }
          }}
          className="w-4 h-4"
        >
          <BasicsXSmall className="group-hover:block hidden" />
        </Button>
      }
    >
      <p className="text-2xs">Unfollow</p>
    </Tooltip>
  );
};
