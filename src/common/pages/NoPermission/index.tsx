import React from 'react';
import { Link } from 'react-router-dom';

const NoPermission: React.VFC = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-primary sm:text-5xl">403</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-Gray-2 tracking-tight sm:text-5xl">
                No Permission
              </h1>
              <p className="mt-1 text-base text-Gray-6">
                You do not have permission to access this resource.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-Gray-3 hover:bg-Gray-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-6"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NoPermission;
