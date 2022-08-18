import { InfiniteLoader } from '@/common/components';
import { useInfiniteData } from '@/common/hooks';
import { PaginationParams } from '@/rest/types';
import { TargetApis } from '@/target/apis';
import { TeamTargetSection } from '@/target/TeamTargetSection';
import { groupBy } from 'lodash-es';

export const TargetsByDepartment = () => {
  const { data: targets, loadMore } = useInfiniteData((paginationParams: PaginationParams) =>
    TargetApis.getList({ ...paginationParams, forYou: 1 }),
  );

  const departmentIds = Array.from(
    new Set(targets.map(({ department: { id } = {} }) => id).filter((id): id is number => !!id)),
  );

  return (
    <div>
      <ul className="flex flex-1 flex-col mb-2">
        {departmentIds.map((departmentId) => (
          <TeamTargetSection departmentId={departmentId} key={departmentId} />
        ))}
      </ul>
      <InfiniteLoader mode="ON_SIGHT" itemsPerLoad={5} onLoad={loadMore} />
    </div>
  );
};
