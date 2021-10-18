import React from 'react';
import { ChatAltIcon, PlusSmIcon } from '@heroicons/react/solid';

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

export interface TargetPanelProps {
  title?: string;
}

const TargetPanel: React.VFC<TargetPanelProps> = ({ title = 'Who to follow' }) => {
  return (
    <div className="flex flex-1 py-12">
      <div className="flex w-72 bg-white ml-4 px-8 py-4 max-h-106" style={{ maxHeight: '613px' }}>
        <div className="flex text-black text-xl font-medium">Target</div>
      </div>
    </div>
  );

  return (
    <aside className="hidden xl:block xl:col-span-4">
      <div className="sticky top-4 space-y-4">
        <section aria-labelledby="who-to-follow-heading">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 id="who-to-follow-heading" className="text-base font-medium text-gray-900">
                {title}
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

export default TargetPanel;
