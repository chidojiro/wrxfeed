import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ReactComponent as MoreVertical } from '@assets/icons/outline/more-vertical.svg';
import { ReactComponent as BasicsXSmall } from '@assets/icons/outline/basics-x-small.svg';

export interface SlideOverProps {
  className: string;
}

const SlideOver: React.VFC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const rows = [
    {
      key: 'Date',
      value: 'Oct 2, 2021',
    },
    {
      key: 'Original Amount',
      value: '€ 123.75',
    },
    {
      key: 'Converted Amount',
      value: '$ 120.75',
    },
    {
      key: 'Last Modified',
      value: '10/2/2021 at 3:52PM PST',
    },
    {
      key: 'Subsidiary',
      value: 'Bird Rides Germany GmbH',
    },
    {
      key: 'Vendor',
      value: 'AIT Worldwide Logistics',
    },
    {
      key: 'Created by',
      value: 'Jeremy Madriaga',
    },
    {
      key: 'Approver',
      value: 'Austin Marshburn',
    },
  ];

  const onClickMore = () => undefined;
  const onClickCloseSlideOver = () => {
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden z-20" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md flex flex-col pt-navbar">
                <div className="flex flex-1 flex-row">
                  <button
                    type="button"
                    onClick={onClickCloseSlideOver}
                    className="flex w-5 h-5 mt-4 mr-5"
                  >
                    <BasicsXSmall className="w-5 h-5" width={20} height={20} />
                  </button>
                  <div className="h-full flex flex-1 flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="flex flex-1 flex-col p-8">
                      <div className="flex flex-row w-full justify-between">
                        <h1 className="text-base font-semibold text-Gray-3">
                          AIT Worldwide Logistics
                        </h1>
                        <button type="button" onClick={onClickMore}>
                          <MoreVertical
                            className="fill-current text-Gray-6"
                            width={15}
                            height={15}
                          />
                        </button>
                      </div>
                      <div className="flex flex-col mt-6">
                        <p className="text-sm font-semibold text-Gray-3">Description</p>
                        <p className="text-sm font-regular text-Gray-6 mt-2">
                          AWS and other network cost related to supporting the vehicle and app - COS
                          July 2021
                        </p>
                      </div>
                      <div className="flex flex-col mt-6">
                        <p className="text-sm font-semibold text-Gray-3">Information</p>
                        <ul className="mt-2 flex flex-1 flex-col border-t border-t-Gray-28">
                          {rows.map((item) => {
                            return (
                              <div
                                key={item.key}
                                className="flex w-full h-11 flex-row items-center justify-between border-b border-b-Gray-28"
                              >
                                <p className="text-Gray-6 text-sm">{item.key}</p>
                                <p className="text-Gray-3 text-sm font-semibold">{item.value}</p>
                              </div>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideOver;
