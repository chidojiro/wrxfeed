import { ReactComponent as MessageTextAltIcon } from '@/assets/icons/solid/message-text-alt.svg';
import clsx from 'clsx';
import { Button, Spinner } from '@/common/components';

export type ViewAllCommentsButtonProps = {
  className?: string;
  title?: string;
  loading?: boolean;
  onClick: () => void;
};

export const ViewAllCommentsButton = ({
  className,
  loading,
  title = 'View all comments',
  onClick,
}: ViewAllCommentsButtonProps) => {
  return (
    <Button
      role="none"
      className={clsx('flex space-x-1 cursor-pointer items-center text-Accent-2', className)}
      onClick={onClick}
    >
      <MessageTextAltIcon
        className="fill-current path-no-filled"
        width={17}
        height={17}
        viewBox="0 -2 16 18"
      />
      <p className="text-sm font-semibold">{title}</p>
      {loading && <Spinner className="!w-4 !h-4" />}
    </Button>
  );
};
