/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import PopoverMenu from '@main/atoms/PopoverMenu';
import PopoverMenuItem from '@main/atoms/PopoverMenuItem';
import FeedBackModal from '@main/organisms/FeedBackModal';

import { ReactComponent as MoreVertical } from '@assets/icons/outline/more-vertical.svg';
import { ReactComponent as BasicsXSmall } from '@assets/icons/outline/basics-x-small.svg';
import { TransLineItem } from '@main/entity';
// import { useRecoilState } from 'recoil';
// import { lineItemState } from '@main/states/lineItem.state';
import EventEmitter, { EventName } from '@main/EventEmitter';

export interface SelectItemProps {
  item: TransLineItem;
}
export interface SlideOverProps {
  className: string;
}

export type LineInfo = {
  key: string;
  value: string;
};

const SlideOver: React.VFC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [item, setItem] = useState<TransLineItem>();
  const [isOpenFeedbackModal, openFeedbackModal] = useState(false);

  const rows: LineInfo[] = [
    {
      key: 'Date',
      value: 'Oct 2, 2021',
    },
    {
      key: 'Original Amount',
      value: `€ ${item?.amountFx}`,
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

  const handleOpenSlide = (props: SelectItemProps | unknown) => {
    if (props && typeof props === 'object') {
      const lineItemProps = props as SelectItemProps;
      setItem(lineItemProps.item);
      if (!open) {
        setOpen(true);
      }
    }
  };

  useEffect(() => {
    EventEmitter.subscribe(EventName.SHOW_SLIDE_OVER, handleOpenSlide);
    return () => {
      EventEmitter.unsubscribe(EventName.SHOW_SLIDE_OVER, handleOpenSlide);
    };
  }, []);

  const onClickMore = () => undefined;
  const onClickCloseSlideOver = () => {
    setOpen(false);
  };

  const handleShareFeedback = () => {
    openFeedbackModal(true);
  };

  const renderMenuItems = () => {
    const items = [];
    items.push(
      <PopoverMenuItem
        key="issue-with-this-item"
        value="issue-with-this-item"
        label="Issue With This Item"
        onClick={handleShareFeedback}
      />,
    );
    return items;
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
                          <Menu as="div" className="relative inline-block z-10 text-left">
                            <div>
                              <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                <span className="sr-only">Open options</span>
                                <MoreVertical
                                  className="fill-current text-Gray-6"
                                  width={15}
                                  height={15}
                                />
                              </Menu.Button>
                            </div>
                            <PopoverMenu>{renderMenuItems()}</PopoverMenu>
                          </Menu>
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
                          {rows.map((row: LineInfo) => {
                            return (
                              <div
                                key={row.key}
                                className="flex w-full h-11 flex-row items-center justify-between border-b border-b-Gray-28"
                              >
                                <p className="text-Gray-6 text-sm">{row.key}</p>
                                <p className="text-Gray-3 text-sm font-semibold">{row.value}</p>
                              </div>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {item && (
                  <FeedBackModal
                    open={isOpenFeedbackModal}
                    onClose={() => openFeedbackModal(false)}
                    feedId={item?.id}
                  />
                )}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideOver;
