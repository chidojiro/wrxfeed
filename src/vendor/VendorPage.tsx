import { OverlayLoader } from '@/common/components';
import { MainLayout } from '@/layout/MainLayout';
import { getDisplayUsdAmount } from '@/main/utils';
import { SpendingChart } from '@/spending/SpendingChart';
import { sumBy } from 'lodash-es';
import { useParams } from 'react-router-dom';
import { useVendor } from './useVendor';
import { useVendorSpendings } from './useVendorSpendings';

export const VendorPage = () => {
  const { vendorId: vendorIdParam } = useParams() as Record<string, string>;
  const vendorId = +vendorIdParam;

  const { data: vendor, isValidating: isValidatingVendor } = useVendor(vendorId);

  const { vendorSpendings, isValidatingVendorSpendings } = useVendorSpendings(vendorId);

  const { curYearSpends = [], prevYearSpends = [] } = vendorSpendings ?? {};

  const totalSpend = sumBy(curYearSpends, 'total');
  const totalSpendLastYear = sumBy(prevYearSpends, 'total');

  if (!vendorSpendings) return null;
  return (
    <MainLayout mainClass="xl:col-span-9">
      <OverlayLoader loading={isValidatingVendor || isValidatingVendorSpendings}>
        <div className="rounded-card shadow-card px-6 py-4 bg-white">
          <h3 className="text-primary font-bold">{vendor!.name}</h3>
          <div className="flex gap-4 mt-2">
            <div>
              <div className="flex gap-1 items-center text-xs text-Gray-6">
                <div className="w-1.5 h-1.5 rounded bg-Accent-2"></div>
                <span>Spend</span>
              </div>
              <p className="text-primary font-bold font-sm">{getDisplayUsdAmount(totalSpend)}</p>
            </div>
            <div>
              <div className="flex gap-1 items-center text-xs text-Gray-6">
                <div className="w-1.5 h-1.5 rounded bg-Gray-6"></div>
                <span>Last Year</span>
              </div>
              <p className="text-primary font-bold font-sm">
                {getDisplayUsdAmount(totalSpendLastYear)}
              </p>
            </div>
          </div>
          <div className="h-[400px] mt-4">
            <SpendingChart
              prevYearColor="#d1d5db"
              data={{ spendings: [...(prevYearSpends as any), ...(curYearSpends as any)] }}
            />
          </div>
        </div>
      </OverlayLoader>
    </MainLayout>
  );
};
