/* eslint-disable react/jsx-curly-newline */
import React, { Fragment, useState, useCallback, useEffect, useRef } from 'react';
import { Transition } from '@headlessui/react';
import { useDebounce } from '@common/hooks';

import { ReactComponent as BasicsSearchSmall } from '@assets/icons/outline/basics-search-small.svg';
import { ReactComponent as BasicsXSmall } from '@assets/icons/outline/basics-x-small.svg';
import { classNames } from '@common/utils';
import { ReactComponent as VendorBank } from '@assets/icons/outline/vendor-bank.svg';
import { ReactComponent as ArrowRight2 } from '@assets/icons/outline/arrow-right-2.svg';

export enum SearchResultType {
  Teams = 'Teams',
  Vendor = 'Vendor',
}

export type SearchResult = {
  id: number;
  title: string;
  type: SearchResultType;
};

const DEBOUNCE_WAIT = 500;

const SearchBar: React.VFC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (keyword.length > 0) {
      setResults([
        {
          id: 0,
          title: 'Concur Technologies',
          type: SearchResultType.Vendor,
        },
        {
          id: 1,
          title: 'Consumer Products',
          type: SearchResultType.Teams,
        },
      ]);
    } else {
      setResults([]);
    }
  }, [keyword]);

  const onSearchTeam = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value.toString());
    },
    [setKeyword],
  );
  const debounceSearchRequest = useDebounce(onSearchTeam, DEBOUNCE_WAIT, [onSearchTeam]);

  const onClickClearSearchInput = () => {
    if (!searchInputRef || !searchInputRef.current) return;
    searchInputRef.current.value = '';
    searchInputRef.current.focus();
  };

  const renderResultRow = (result: SearchResult) => {
    return (
      <div
        key={result?.id}
        className={classNames(
          'relative group py-2 px-6 flex flex-row items-center hover:bg-Gray-12',
        )}
      >
        <VendorBank className="w-6 h-6" />
        <div className="flex flex-1 items-center ml-2">
          <p className="text-Gray-3 text-sm">{result?.title}</p>
          <p className="text-Gray-6 text-sm ml-2">- Vendor</p>
        </div>
        <div className="">
          <ArrowRight2 className="h-4 w-4 text-Accent-1 invisible group-hover:visible" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center w-full px-6 lg:max-w-none lg:mx-4 xl:px-0">
      <>
        <div className="w-full relative">
          <div className="sr-only">Search for teams, categories, or vendors</div>
          <div className="relative flex flex-row items-center">
            <div className="absolute inset-y-0 left-1 sm:left-2 flex items-center">
              <BasicsSearchSmall
                width={24}
                height={24}
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              ref={searchInputRef}
              id="search"
              name="search"
              className="block w-full text-white bg-Gray-3 focus:border focus:border-gray-300 rounded-sm py-0 h-7 pl-8 pr-8 sm:pr-16 sm:pl-9 text-sm placeholder-Gray-6 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm truncate"
              placeholder="Search for teams, categories, or vendors"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              onChange={debounceSearchRequest}
            />
            <button
              type="button"
              onClick={onClickClearSearchInput}
              className="absolute z-30 inset-y-0 right-2 sm:right-7 flex flex-row items-center"
            >
              <BasicsXSmall
                width={20}
                height={20}
                className="h-5 w-5 fill-current path-no-filled stroke-current path-no-stroke object-fill text-Gray-12"
                aria-hidden="true"
              />
            </button>
          </div>
          <Transition
            show={results.length > 0}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute mt-2 w-full px-4 bg-white shadow-lg rounded-sm border border-Gray-11 py-6 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {results.map(renderResultRow)}
            </div>
          </Transition>
        </div>
      </>
    </div>
  );
};

export default SearchBar;
