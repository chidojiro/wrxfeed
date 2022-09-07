import { Button } from '@/common/components';
import { RolesDrawer } from './RolesDrawer';

interface RoleCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const RoleCard = (props: RoleCardProps) => {
  const { title, description, onClick } = props;
  return (
    <Button
      onClick={onClick}
      className="bg-white border border-solid border-Gray-11 hover:border-Gray-3 rounded-[10px] py-6 pr-6 pl-[26px] space-y-2 text-left"
      style={{ boxShadow: '0px 3px 5px rgba(9, 30, 66, 0.05), -1px 6px 8px rgba(6, 25, 56, 0.03)' }}
    >
      <p className="text-sm leading-4 font-semibold tracking-tight text-Gray-3">{title}</p>
      <p className="text-sm leading-4 font-normal text-Gray-6">{description}</p>
    </Button>
  );
};

export const RolesTabContent = () => {
  return (
    <div>
      <RolesDrawer open />
      <div className="flex flex-col space-y-4 w-full sm:min-w-[491px]">
        <RoleCard title="Base User" description="Default permissions for all team members" />
        <RoleCard title="Admin" description="Access to Admin Portal and role creation" />
      </div>
    </div>
  );
};
