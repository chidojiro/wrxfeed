import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import { Notification, Transaction } from '@/main/entity';
import Loading from '@/common/atoms/Loading';
import TransactionCard from '../TransactionCard';

export interface NotifyDetailsProps {
  style?: string;
  isOpen: boolean;
  onClose: () => void;
  notify: Notification | undefined;
  transaction: Transaction | undefined;
  isLoading?: boolean;
}

const NotifyDetails: React.FC<NotifyDetailsProps> = ({
  style = '',
  isOpen,
  onClose,
  notify,
  transaction,
  isLoading = false,
}) => {
  const closeModal = () => {
    onClose();
  };

  if (!notify) return null;
  if (!transaction) return null;

  const renderTransaction = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full overflow-scroll justify-center items-center">
          <Loading width={100} height={100} />
        </div>
      );
    }
    return (
      <div className="w-full h-full overflow-scroll">
        <TransactionCard transaction={transaction} />
      </div>
    );
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            </Transition.Child>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={clsx(
                  'inline-block w-full max-w-5xl p-8 my-12 overflow-scroll transition-all transform align-middle bg-white shadow-xl rounded-2xl',
                  style,
                )}
              >
                {renderTransaction()}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NotifyDetails;
