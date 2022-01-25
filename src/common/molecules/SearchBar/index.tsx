import React from 'react';

import { ReactComponent as BasicsSearchSmall } from '@assets/icons/outline/basics-search-small.svg';

const SearchBar: React.VFC = () => {
  return (
    <div className="flex items-center w-full px-6 lg:max-w-none lg:mx-4 xl:px-0">
      <div className="w-full">
        <div className="sr-only">Search for teams, categories, or vendors</div>
        <div className="relative flex flex-row items-center">
          <div className="pointer-events-none absolute inset-y-0 left-1 sm:left-2 flex items-center">
            <BasicsSearchSmall
              width={24}
              height={24}
              className="h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full text-white bg-Gray-3 focus:border focus:border-gray-300 rounded-sm py-0 h-7 pl-8 sm:pl-9 pr-3 text-sm placeholder-Gray-6 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm truncate"
            placeholder="Search for teams, categories, or vendors"
            type="search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
