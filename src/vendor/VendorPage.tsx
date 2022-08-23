import { MainLayout } from '@/layout/MainLayout';
import { useParams } from 'react-router-dom';
import { useVendor } from './useVendor';

export const VendorPage = () => {
  const { vendorId: vendorIdParam } = useParams() as Record<string, string>;
  const vendorId = +vendorIdParam;

  const { data: vendor, isValidating } = useVendor(vendorId);

  return <MainLayout></MainLayout>;
};
