import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
// import { useProfile } from '@auth/containers/ProfileEditForm/hooks';
import { useRecoilValue } from 'recoil';
import { profileState } from '@auth/containers/ProfileEditForm/states';

const user = {
  name: 'Chelsea Hagon',
  email: 'chelseahagon@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const profileInfos = [
  {
    title: 'Name',
    content: 'Steve Schnell',
  },
  {
    title: 'Title',
    content: 'Ceo',
  },
  {
    title: 'Department',
    content: 'Management',
  },
  {
    title: 'Email',
    content: 'steve@gravitylabs.co',
  },
];

export interface UserProfilePopoverProps {
  style?: React.CSSProperties;
}

const UserProfilePopover: React.VFC<UserProfilePopoverProps> = ({ style }) => {
  const profile = useRecoilValue(profileState);
  return (
    <Popover as="div" className="flex-shrink-0 relative ml-5" style={style}>
      <Popover.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
        <img className="h-8 w-8 rounded-full" src={profile?.avatar} alt="Ava" />
      </Popover.Button>
      <Popover.Panel className="absolute z-50">
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div
            style={{ width: '332px', height: '544px' }}
            className="flex flex-col origin-top-right absolute z-10 right-0 mt-4 shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none bg-white"
          >
            <div className="flex flex-row items-center h-16 w-full border-b-2 px-8">
              <p className="flex text-gray-1 font-medium">Profile</p>
            </div>
            <div className="flex flex-1 flex-col">
              <img
                alt="user-avatar"
                className="flex w-36 h-36 rounded-full self-center mt-6"
                src={user.imageUrl}
              />
              <div className="flex flex-1 flex-col px-11 pt-4">
                {profileInfos.map((item) => {
                  return (
                    <div key={`profileInfos${item.title}`} className="flex flex-col mt-2">
                      <div className="flex text-sm text-gray-1 font-medium">{item.title}</div>
                      <div className="flex flex-row items-center px-1 py-4 h-10">
                        <p className="flex text-sm text-Gray-6">{item.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Transition>
      </Popover.Panel>
    </Popover>
  );
};

export default UserProfilePopover;
