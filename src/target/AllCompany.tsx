import { Divider, ListLoader } from '@/common/components';
import { useFetcher } from '@/common/hooks';
import { DepartmentApis } from '@/team/apis';
import React from 'react';
import { AllCompanySummary } from './AllCompanySummary';
import { AllCompanyTarget } from './AllCompanyTarget';
import { TargetCard } from './TargetCard';

export const AllCompany = () => {
  const { data: recentlyViewedTargets = [], isValidating } = useFetcher(
    ['recentlyViewedTargets'],
    () => DepartmentApis.getRecentlyViewedSummaries(),
  );

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        <AllCompanyTarget className="col-span-3 lg:col-span-2" />
        <AllCompanySummary className="col-span-3 lg:col-span-1" />
      </div>
      <Divider className="mt-8 mb-4" />
      <p className="text-sm text-Gray-3 font-semibold">Recently Viewed</p>
      <ListLoader loading={isValidating}>
        <div className="mt-5 gap-4 grid grid-cols-1 lg:grid-cols-2">
          {recentlyViewedTargets.map((target) => (
            <TargetCard key={target.id} data={target as any} className="h-[330px]" />
          ))}
        </div>
      </ListLoader>
    </div>
  );
};
