import clsx from 'clsx';
import { VendorIcon } from '@/assets';
import { ClassName } from '@/common/types';
import { getColorByText } from '@/main/utils';
import { useVendor } from './useVendor';

export type VendorHeaderProps = ClassName & {
  vendorId: number;
};

export const VendorHeader = ({ className, vendorId }: VendorHeaderProps) => {
  const VendorHeaderColor = getColorByText('', vendorId, true);
  const { data: department } = useVendor(vendorId);

  return (
    <div
      className={clsx(
        'flex flex-row items-center px-6 mt-6 justify-between py-6 max-h-[84px] rounded-card',
        className,
      )}
      style={{ background: VendorHeaderColor }}
    >
      <div className="flex flex-row overflow-hidden items-center space-x-4">
        <div className="flex justify-center flex-shrink-0 items-center w-9 h-9 rounded-full border border-white">
          <VendorIcon
            className="w-5 h-5 fill-current path-no-filled text-white opacity-100"
            aria-hidden="true"
          />
        </div>
        <p className="text-white font-semibold truncate">{department?.name}</p>
      </div>
    </div>
  );
};
