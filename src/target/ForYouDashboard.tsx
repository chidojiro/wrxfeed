import { InfiniteLoader } from '@/common/components';
import { DEFAULT_ITEMS_PER_INFINITE_LOAD } from '@/common/constants';
import { useHandler } from '@/common/hooks';
import React from 'react';
import { TargetApis } from './apis';
import { TargetCard } from './TargetCard';
import { GetTargetsParams, Target } from './types';

const ITEMS_PER_INFINITE_LOAD = DEFAULT_ITEMS_PER_INFINITE_LOAD;

type ForYouDashboardProps = {
  //
};

export const ForYouDashboard = ({}: ForYouDashboardProps) => {
  const [loadedTargets, setLoadedTargets] = React.useState<Target[]>([]);

  const { handle: getMoreTargets } = useHandler((params: GetTargetsParams) =>
    TargetApis.getList({ ...params }),
  );

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {loadedTargets.map((target) => (
          <TargetCard
            className="h-[330px] col-span-2 lg:col-span-1"
            key={target.id}
            data={target}
          />
        ))}
      </div>
      <InfiniteLoader<Target[]>
        className="mx-auto"
        onLoad={(page) =>
          getMoreTargets({
            forYou: 1,
            limit: 10,
            offset: (page - 1) * ITEMS_PER_INFINITE_LOAD,
          })
        }
        until={(data) => data.length < ITEMS_PER_INFINITE_LOAD}
        onSuccess={(data) => setLoadedTargets((prev) => [...prev, ...data])}
      />
    </div>
  );
};
