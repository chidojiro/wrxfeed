import { Children } from '@/common/types';
import ListLoading from '@/main/atoms/ListLoading';

export type ListLoaderProps = Children & {
  loading?: boolean;
};

export const ListLoader = ({ loading, children }: ListLoaderProps) => {
  if (loading)
    return (
      <div className="flex items-center justify-center w-full p-6">
        <ListLoading />
      </div>
    );

  return <>{children}</>;
};
