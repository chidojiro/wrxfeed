import { BasicsXSmall } from '@/assets';
import { Button, Spinner, Tooltip } from '@/common/components';
import { Department } from '@/main/entity';
import { useUnsubscribe } from '@/subscription/useUnsubscribe';

export type UnfollowButtonProps = {
  department: Department;
};

export const UnfollowButton = ({ department }: UnfollowButtonProps) => {
  const { unsubscribe, isUnsubscribing } = useUnsubscribe();

  return (
    <Tooltip
      trigger={
        <Button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            unsubscribe('departments', department);
          }}
          className="w-4 h-4"
        >
          {isUnsubscribing ? <Spinner /> : <BasicsXSmall className="group-hover:block hidden" />}
        </Button>
      }
    >
      <p className="text-2xs">Unfollow</p>
    </Tooltip>
  );
};
