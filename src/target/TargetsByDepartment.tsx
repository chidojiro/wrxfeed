import { InfiniteLoader } from '@/common/components';
import { useInfiniteData } from '@/common/hooks';
import { PaginationParams } from '@/rest/types';
import { TargetApis } from '@/target/apis';
import { TeamTargetSection } from '@/target/TeamTargetSection';

export const TargetsByDepartment = () => {
  const { data: targets, loadMore } = useInfiniteData((paginationParams: PaginationParams) =>
    TargetApis.getList({ ...paginationParams, forYou: 1 }),
  );

  return (
    <div>
      <ul className="flex flex-1 flex-col mb-2">
        {targets.map((target) => (
          <TeamTargetSection
            key={target.id}
            departmentName={target.department?.name as string}
            departmentId={target.department?.id as number}
          />
        ))}
      </ul>
      <InfiniteLoader mode="ON_SIGHT" itemsPerLoad={5} onLoad={loadMore} />
    </div>
  );
};
