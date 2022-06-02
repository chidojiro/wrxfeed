/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState, KeyboardEventHandler } from 'react';

import { classNames } from '@common/utils';
import { EMPTY_VENDOR_DESCRIPTION, VendorDescription } from '@main/entity';

import Modal from '@common/atoms/Modal';
import Loading from '@common/atoms/Loading';

export type UpdateVendorInfoModalProps = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSave: (id: number, data: VendorDescription) => void;
  itemEditing: VendorDescription;
};

const UpdateVendorInfoModal: React.FC<UpdateVendorInfoModalProps> = ({
  open = false,
  loading = false,
  onClose,
  onCancel,
  onSave,
  itemEditing,
}) => {
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  const [vendorDescription, setVendorDescription] =
    useState<VendorDescription>(EMPTY_VENDOR_DESCRIPTION);

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

    return false;
  };

  const createReadyState = isReadyToSave(vendorDescription) ? 'bg-primary' : 'bg-Gray-6';

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
          <div className={classNames('flex flex-col h-[38px] px-2.5 w-auto bg-Gray-12')}>
            <input
              name="description"
              ref={descriptionInputRef}
              className={classNames(
                'text-primary flex-1 bg-transparent placeholder-Gray-6 outline-none border-none text-sm w-auto',
              )}
              onKeyDown={handleKeyDown}
              placeholder="What goods or services does this business provide?"
              onChange={onChangeInput}
              value={vendorDescription?.description}
            />
          </div>
          <p className="text-primary text-xs font-semibold">Website</p>
          <div className={classNames('flex flex-col h-[38px] px-2.5 w-auto bg-Gray-12')}>
            <input
              name="website"
              className={classNames(
                'text-primary flex-1 bg-transparent placeholder-Gray-6 outline-none border-none text-sm w-auto',
              )}
              onKeyDown={handleKeyDown}
              placeholder="company.com"
              onChange={onChangeInput}
              value={vendorDescription?.website}
            />
          </div>
          <p className="text-primary text-xs font-semibold">Email</p>
          <div className={classNames('flex flex-col h-[38px] px-2.5 w-auto bg-Gray-12')}>
            <input
              name="contactEmail"
              className={classNames(
                'text-primary flex-1 bg-transparent placeholder-Gray-6 outline-none border-none text-sm w-auto',
              )}
              onKeyDown={handleKeyDown}
              placeholder="name@company.com"
              onChange={onChangeInput}
              value={vendorDescription?.contactEmail}
            />
          </div>
          <p className="text-primary text-xs font-semibold">Phone</p>
          <div className={classNames('flex flex-col h-[38px] px-2.5 w-auto bg-Gray-12')}>
            <input
              name="contactNumber"
              className={classNames(
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
        <div className="flex flex-row w-full px-12 py-4">
          <button
            type="button"
            onClick={onClickCancel}
            className="flex px-4 py-2 rounded-sm hover:bg-Gray-12 mr-3 ml-auto"
          >
            <p className="text-Gray-6 text-xs font-semibold">Cancel</p>
          </button>
          <button
            type="button"
            onClick={() => {
              if (itemEditing.vendorId) {
                onSave(itemEditing.vendorId, itemEditing);
              }
            }}
            className={classNames(
              'flex flex-row items-center px-4 py-2 rounded-sm hover:bg-primary',
              createReadyState,
            )}
          >
            <p className="text-white text-xs font-semibold">Save</p>
            {loading && <Loading width={12} height={12} color="white" className="w-4 h-4 ml-2" />}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateVendorInfoModal;
