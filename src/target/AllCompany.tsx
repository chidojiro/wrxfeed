import { Divider, ListLoader } from '@/common/components';
import { useFetcher } from '@/common/hooks';
import { DepartmentApis } from '@/team/apis';
import React from 'react';
import { AllCompanySummary } from './AllCompanySummary';
import { AllCompanyTarget } from './AllCompanyTarget';
import { TargetCards } from './TargetCards';

export const AllCompany = () => {
  const {
    data: recentlyViewedTargets = [],
    isValidating,
    mutate,
  } = useFetcher(['recentlyViewedTargets'], () => DepartmentApis.getRecentlyViewedSummaries());

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        <AllCompanyTarget className="col-span-3 lg:col-span-2" />
        <AllCompanySummary className="col-span-3 lg:col-span-1" />
      </div>
      <Divider className="mt-8 mb-4" />
      <p className="text-sm text-Gray-3 font-semibold">Recently Viewed</p>
      <ListLoader loading={isValidating}>
        <TargetCards
          targets={recentlyViewedTargets}
          onUpdateSuccess={() => mutate()}
          onDeleteSuccess={() => mutate()}
        />
      </ListLoader>
    </div>
  );
};
