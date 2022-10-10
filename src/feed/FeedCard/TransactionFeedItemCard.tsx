import { MoreVerticalIcon } from '@/assets';
import { Divider, StatusTag } from '@/common/components';
import PopoverMenu from '@/main/atoms/PopoverMenu';
import { Menu } from '@headlessui/react';
import { CommentBox } from './CommentBox';

export const TransactionFeedItemCard = () => {
  return (
    <article className="bg-white flex flex-col filter shadow-md rounded-card overflow-hidden">
      <div className="flex flex-row">
        <div
          className="flex-grow h-3 border-b border-Gray-11"
          style={{
            background:
              'linear-gradient(90.64deg, #60B6C1 0.34%, #61BFC2 20.62%, #60BBC2 40.08%, #4E88A3 65.42%, #5387AA 80.26%, #6C9AB8 98.34%, #7CB1E3 105.67%)',
          }}
        />
      </div>
      <div className="px-8 pt-3 pb-6">
        <div className="flex justify-between">
          <div>
            <p className="text-base font-bold text-primary">Neuron Limited</p>
            <p className="text-xs font-normal text-Gray-6">
              Global Operations · Core Vehicle In Market Labor · 02/08/22
            </p>
          </div>
          <div className="flex space-x-3.5">
            <p className="text-lg leading-5 font-semibold text-primary">$3,572.65</p>
            <Menu as="div" className="relative inline-block z-20 text-left mt-0.5">
              <div>
                <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Open options</span>
                  <MoreVerticalIcon
                    className="fill-current text-Gray-3 path-no-filled"
                    aria-hidden="true"
                    viewBox="0 0 15 15"
                  />
                </Menu.Button>
              </div>
              <PopoverMenu>a</PopoverMenu>
            </Menu>
          </div>
        </div>
      </div>
      <div className="px-9 py-6 border-t border-b border-Gray-11">
        <div className="flex justify-between">
          <p className=" font-normal text-xs text-Gray-6">
            Impounds & Fines paid for incorrectly parked vehicles - Aug
          </p>
          <StatusTag className="h-5 text-xs font-medium text-yellow-3" colorScheme={'yellow'}>
            Pending
          </StatusTag>
        </div>
      </div>
      <div className="py-6 px-12">
        <CommentBox showAttach={false} showSend={false} showEmoji={false} />
      </div>
    </article>
  );
};
