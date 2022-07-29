import Modal from '@/common/atoms/Modal';
import { Button, Form } from '@/common/components';
import { withMountOnOpen } from '@/common/hocs';
import { VendorApis } from '@/vendor/apis';
import { Vendor } from '@/vendor/types';
import clsx from 'clsx';
import { omitBy } from 'lodash-es';
import React from 'react';
import { useForm } from 'react-hook-form';

export type UpdateVendorInfoModalProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: typeof VendorApis.update;
  vendor?: Vendor;
};

export const UpdateVendorInfoModal = withMountOnOpen(
  ({ open = false, onClose, onCancel, onConfirm, vendor }: UpdateVendorInfoModalProps) => {
    const methods = useForm();
    const {
      formState: { isValid, isSubmitting },
      reset,
    } = methods;

    React.useEffect(() => {
      reset(vendor);
    }, [reset, vendor]);

    return (
      <Modal open={open} onClose={onClose} contentClass="sm:my-24 overflow-visible">
        <Form
          methods={methods}
          onSubmit={async (data) => {
            await onConfirm(
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              vendor!.id,
              omitBy(data, (v) => !v),
            );
            onClose();
          }}
          className="flex flex-col w-[685px] outline-none pt-4"
        >
          <div className="flex flex-col space-y-2 px-10 py-4 w-full">
            <p className="text-primary text-lg font-bold">{vendor?.name ?? ''}</p>
            <p className="text-primary text-xs font-semibold">Vendor Description</p>
            <div className={clsx('flex flex-col h-[38px] w-auto bg-Gray-12')}>
              <Form.Input
                name="description"
                placeholder="What goods or services does this business provide?"
                rules={{ required: true }}
              />
            </div>
            <p className="text-primary text-xs font-semibold">Website</p>
            <div className={clsx('flex flex-col h-[38px] w-auto bg-Gray-12')}>
              <Form.Input name="website" placeholder="company.com" />
            </div>
            <p className="text-primary text-xs font-semibold">Email</p>
            <div className={clsx('flex flex-col h-[38px] w-auto bg-Gray-12')}>
              <Form.Input name="contactEmail" placeholder="name@company.com" />
            </div>
            <p className="text-primary text-xs font-semibold">Phone</p>
            <div className={clsx('flex flex-col h-[38px] w-auto bg-Gray-12')}>
              <Form.Input name="contactNumber" placeholder="(555) 555-5555" />
            </div>
          </div>

          <hr className="divider divider-horizontal w-full" />
          <div className="flex w-full px-12 py-4 justify-end gap-3">
            <Button variant="ghost" colorScheme="gray" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="solid" type="submit" disabled={!isValid} loading={isSubmitting}>
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>
    );
  },
);
