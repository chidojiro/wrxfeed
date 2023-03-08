import { Divider, ListLoader } from '@/common/components';
import { useFetcher } from '@/common/hooks';
import { DepartmentApis } from '@/team/apis';
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
      <div className="flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-6">
        <AllCompanyTarget className="w-full lg:w-[636px]" />
        <AllCompanySummary className="w-full lg:w-[378px]" />
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
