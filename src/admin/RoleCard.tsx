import { XIcon } from '@/assets';
import { Button, Spinner } from '@/common/components';
import { useHandler } from '@/common/hooks';
import { RoleApis } from '@/role/apis';
import { Role } from '@/role/types';
import { useRoles } from '@/role/useRoles';
import clsx from 'clsx';

type RoleCardProps = {
  role: Role;
  onClick?: () => void;
  deletable?: boolean;
};

export const RoleCard = ({
  role: { id, name, description },
  onClick,
  deletable,
}: RoleCardProps) => {
  const { mutateRoles } = useRoles();

  const { handle: deleteRole, isLoading: isDeleting } = useHandler(() => RoleApis.delete(id), {
    onSuccess: () => mutateRoles(),
  });

  return (
    <Button
      onClick={onClick}
      className={clsx(
        'flex items-center justify-between',
        'bg-white border border-solid border-Gray-11 hover:border-Gray-3 rounded-[10px] py-6 pr-6 pl-[26px] text-left shadow-card',
      )}
    >
      <div className="space-y-2">
        <p className="text-sm leading-4 font-semibold tracking-tight text-Gray-3">{name}</p>
        <p className="text-sm leading-4 font-normal text-Gray-6">{description}</p>
      </div>
      {deletable &&
        (!isDeleting ? (
          <Spinner className="!w-4 !h-4" />
        ) : (
          <XIcon
            className="w-4 h-4"
            onClick={(e) => {
              e.stopPropagation();
              deleteRole();
            }}
          />
        ))}
    </Button>
  );
};
