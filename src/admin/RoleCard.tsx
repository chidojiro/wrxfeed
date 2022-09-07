import { Button } from '@/common/components';

type RoleCardProps = {
  title: string;
  description: string;
  onClick?: () => void;
};

export const RoleCard = (props: RoleCardProps) => {
  const { title, description, onClick } = props;

  return (
    <Button
      onClick={onClick}
      className="bg-white border border-solid border-Gray-11 hover:border-Gray-3 rounded-[10px] py-6 pr-6 pl-[26px] space-y-2 text-left shadow-card"
    >
      <p className="text-sm leading-4 font-semibold tracking-tight text-Gray-3">{title}</p>
      <p className="text-sm leading-4 font-normal text-Gray-6">{description}</p>
    </Button>
  );
};
