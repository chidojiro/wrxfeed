/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState, KeyboardEventHandler, useEffect } from 'react';

import { EMPTY_VENDOR_DESCRIPTION, VendorDescription } from '@/main/entity';

import { useSetRecoilState } from 'recoil';
import { vendorUpdateState } from '@/main/states/vendorUpdate.state';
import { useUpdateVendor } from '@/main/hooks/updateVendor.hook';
import Modal from '@/common/atoms/Modal';
import clsx from 'clsx';
import { Button } from '@/common/components';

export type UpdateVendorInfoModalProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  itemEditing: VendorDescription;
};

const UpdateVendorInfoModal: React.FC<UpdateVendorInfoModalProps> = ({
  open = false,
  onClose,
  onCancel,
  itemEditing,
}) => {
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  const setVendorUpdate = useSetRecoilState(vendorUpdateState);
  const { isLoading, updateVendorById } = useUpdateVendor({
    onSuccess: (data) => {
      setVendorUpdate(data);
      onClose();
    },
    onError: () => undefined,
  });

  const [vendorDescription, setVendorDescription] =
    useState<VendorDescription>(EMPTY_VENDOR_DESCRIPTION);

  useEffect(() => {
    setVendorDescription(itemEditing);
  }, [itemEditing]);

  const onCloseModal = () => {
    if (typeof onClose === 'function') onClose();
  };

  const onClickCancel = () => {
    onCancel();
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setVendorDescription({
      ...vendorDescription,
      [event.target.name]: value,
    });
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (['Enter'].includes(event.key)) {
      event.preventDefault();
      descriptionInputRef.current?.blur();
    }
  };

  const isReadyToSave = (value: VendorDescription | undefined): boolean => {
    if (!value) {
      return false;
    }

    if (
      (value?.contactEmail && value?.contactEmail?.trim().length > 0) ||
      (value?.contactNumber && value?.contactNumber?.trim().length > 0) ||
      (value?.description && value?.description?.trim().length > 0) ||
      (value?.website && value?.website?.trim().length > 0)
    ) {
      return true;
    }

    return false;
  };

  const onSaveHandler = (id: number, data: VendorDescription) => {
    updateVendorById(id, data);
  };

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center={false}
      contentClass="sm:my-24 overflow-visible"
    >
      <div className="flex flex-col w-[685px] outline-none pt-4">
        <div className="flex flex-col space-y-2 px-10 py-4 w-full">
          <p className="text-primary text-lg font-bold">{itemEditing.vendorName ?? ''}</p>
          <p className="text-primary text-xs font-semibold">Vendor Description</p>
          <div className={clsx('flex flex-col h-[38px] px-2.5 w-auto bg-Gray-12')}>
            <input
              name="description"
              ref={descriptionInputRef}
              className={clsx(
                'text-primary flex-1 bg-transparent placeholder-Gray-6 outline-none border-none text-sm w-auto',
              )}
              onKeyDown={handleKeyDown}
              placeholder="What goods or services does this business provide?"
              onChange={onChangeInput}
              value={vendorDescription?.description}
            />
          </div>
          <p className="text-primary text-xs font-semibold">Website</p>
          <div className={clsx('flex flex-col h-[38px] px-2.5 w-auto bg-Gray-12')}>
            <input
              name="website"
              className={clsx(
                'text-primary flex-1 bg-transparent placeholder-Gray-6 outline-none border-none text-sm w-auto',
              )}
              onKeyDown={handleKeyDown}
              placeholder="company.com"
              onChange={onChangeInput}
              value={vendorDescription?.website}
            />
          </div>
          <p className="text-primary text-xs font-semibold">Email</p>
          <div className={clsx('flex flex-col h-[38px] px-2.5 w-auto bg-Gray-12')}>
            <input
              name="contactEmail"
              className={clsx(
                'text-primary flex-1 bg-transparent placeholder-Gray-6 outline-none border-none text-sm w-auto',
              )}
              onKeyDown={handleKeyDown}
              placeholder="name@company.com"
              onChange={onChangeInput}
              value={vendorDescription?.contactEmail}
            />
          </div>
          <p className="text-primary text-xs font-semibold">Phone</p>
          <div className={clsx('flex flex-col h-[38px] px-2.5 w-auto bg-Gray-12')}>
            <input
              name="contactNumber"
              className={clsx(
                'text-primary flex-1 bg-transparent placeholder-Gray-6 outline-none border-none text-sm w-auto',
              )}
              onKeyDown={handleKeyDown}
              placeholder="(555) 555-5555"
              onChange={onChangeInput}
              value={vendorDescription?.contactNumber}
            />
          </div>
        </div>

        <hr className="divider divider-horizontal w-full" />
        <div className="flex w-full px-12 py-4 justify-end gap-3">
          <Button variant="ghost" colorScheme="gray" onClick={onClickCancel}>
            Cancel
          </Button>
          <Button
            variant="solid"
            colorScheme={isReadyToSave(vendorDescription) ? 'primary' : 'gray'}
            className="hover:bg-primary"
            loading={isLoading}
            onClick={() => {
              if (vendorDescription.vendorId) {
                onSaveHandler(vendorDescription.vendorId, vendorDescription);
              }
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateVendorInfoModal;
