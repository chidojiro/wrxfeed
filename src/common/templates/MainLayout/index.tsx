import React from 'react';
import { GroupTab, LeftTab } from '@common/types';
import { FeedIcon, DirectoryIcon } from '@assets/index';
import { ChatAltIcon, PlusSmIcon } from '@heroicons/react/solid';
import { FireIcon, HomeIcon, TrendingUpIcon, UserGroupIcon } from '@heroicons/react/outline';
import { classNames } from '@main/utils';
import LeftStaticSideBar from './LeftStaticSideBar';
import HeaderBar from './HeaderBar';

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Popular', href: '#', icon: FireIcon, current: false },
  { name: 'Communities', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Trending', href: '#', icon: TrendingUpIcon, current: false },
];

const communities = [
  { name: 'Movies', href: '#' },
  { name: 'Food', href: '#' },
  { name: 'Sports', href: '#' },
  { name: 'Animals', href: '#' },
  { name: 'Science', href: '#' },
  { name: 'Dinosaurs', href: '#' },
  { name: 'Talents', href: '#' },
  { name: 'Gaming', href: '#' },
];

export type Tab = {
  name: string;
  onClick: () => void;
  current: boolean;
};

const tabs: Tab[] = [
  { name: 'Recent', onClick: () => undefined, current: true },
  { name: 'Most Liked', onClick: () => undefined, current: false },
  { name: 'Most Answers', onClick: () => undefined, current: false },
];

const whoToFollow = [
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
];
const trendingPosts = [
  {
    id: 1,
    user: {
      name: 'Floyd Miles',
      imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    body: 'What books do you have on your bookshelf just to look smarter than you actually are?',
    comments: 291,
  },
  // More posts...
];

// const SIDEBAR_WIDTH = 212;

export interface MainLayoutProps {
  title: string;
  boxStyle?: React.CSSProperties;
}

const groupTabs: GroupTab[] = [
  {
    name: 'Feed',
    icon: FeedIcon,
    tabs: [
      { name: 'Company', href: '#', icon: null },
      { name: 'For you', href: '#', icon: null },
    ],
  },
  {
    name: 'Directory',
    icon: DirectoryIcon,
    tabs: [
      { name: 'Departments', href: '#', icon: null },
      { name: 'Categories', href: '#', icon: null },
      { name: 'Vendors', href: '#', icon: null },
    ],
  },
];

const MainLayout: React.FC<MainLayoutProps> = ({ title, children, boxStyle }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState<LeftTab>(groupTabs[0].tabs[0]);

  const RightBar = () => {
    return (
      <aside className="hidden xl:block xl:col-span-4">
        <div className="sticky top-4 space-y-4">
          <section aria-labelledby="who-to-follow-heading">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 id="who-to-follow-heading" className="text-base font-medium text-gray-900">
                  Who to follow
                </h2>
                <div className="mt-6 flow-root">
                  <div role="list" className="-my-4 divide-y divide-gray-200">
                    {whoToFollow.map((user) => (
                      <li key={user.handle} className="flex items-center py-4 space-x-3">
                        <div className="flex-shrink-0">
                          <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            <a href={user.href}>{user.name}</a>
                          </p>
                          <p className="text-sm text-gray-500">
                            <a href={user.href}>{`@${user.handle}`}</a>
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-rose-700 hover:bg-rose-100"
                          >
                            <PlusSmIcon
                              className="-ml-1 mr-0.5 h-5 w-5 text-rose-400"
                              aria-hidden="true"
                            />
                            <span>Follow</span>
                          </button>
                        </div>
                      </li>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <div className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    View all
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section aria-labelledby="trending-heading">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 id="trending-heading" className="text-base font-medium text-gray-900">
                  Trending
                </h2>
                <div className="mt-6 flow-root">
                  <div role="list" className="-my-4 divide-y divide-gray-200">
                    {trendingPosts.map((post) => (
                      <li key={post.id} className="flex py-4 space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={post.user.imageUrl}
                            alt={post.user.name}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-800">{post.body}</p>
                          <div className="mt-2 flex">
                            <span className="inline-flex items-center text-sm">
                              <button
                                type="button"
                                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                              >
                                <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
                                <span className="font-medium text-gray-900">{post.comments}</span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <div className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    View all
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </aside>
    );
  };

  const LeftSideBar = () => {
    return (
      <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
        <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
          <div className="pb-8 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames([
                  item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50',
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md',
                ])}
                aria-current={item.current ? 'page' : undefined}
              >
                <item.icon
                  className={classNames([
                    item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                  ])}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
              </a>
            ))}
          </div>
          <div className="pt-10">
            <p
              className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
              id="communities-headline"
            >
              My communities
            </p>
            <div className="mt-3 space-y-2" aria-labelledby="communities-headline">
              {communities.map((community) => (
                <a
                  key={community.name}
                  href={community.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                >
                  <span className="truncate">{community.name}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-200">
      <HeaderBar title={title} />
      <div className="flex flex-1">
        <LeftStaticSideBar
          groupTabs={groupTabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="flex flex-1 h-full pl-4" style={boxStyle}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
