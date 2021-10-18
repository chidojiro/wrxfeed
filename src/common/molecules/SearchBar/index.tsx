import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';

const SearchBar: React.VFC = () => {
  return (
    <div className="flex items-center w-full px-6 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
      <div className="w-full">
        <div className="sr-only">Search</div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            placeholder="Search"
            type="search"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
