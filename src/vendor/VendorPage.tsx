import { ChevronLeftIcon } from '@/assets';
import { ListLoader } from '@/common/components';
import { Feeds } from '@/feed/Feeds';
import { MainLayout } from '@/layout/MainLayout';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useVendor } from './useVendor';

export const VendorPage = () => {
  const history = useHistory();

  const { vendorId: vendorIdParam } = useParams() as Record<string, string>;
  const vendorId = +vendorIdParam;

  const goBack = () => {
    history.push('/vendors');
  };

  const { data: vendor, isValidating } = useVendor(vendorId, { onError: goBack });

  return (
    <MainLayout>
      <h1 className="sr-only">Department list</h1>
      <Link to="/vendors" className="flex flex-1 items-center space-x-4 mb-8">
        <ChevronLeftIcon />
        <h1 className="text-Gray-1 text-xl font-bold">{vendor?.name ?? '...'}</h1>
      </Link>
      <ListLoader loading={isValidating}>
        <Feeds vendorId={vendorId} />
      </ListLoader>
    </MainLayout>
  );
};
