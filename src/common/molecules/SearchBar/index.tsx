/* eslint-disable react/jsx-curly-newline */
import React, { Fragment, useState, useCallback, useEffect, useRef } from 'react';
import { Transition } from '@headlessui/react';
import { useHistory } from 'react-router-dom';
import { useOnClickOutside } from '@dwarvesf/react-hooks';

import { useDebounce } from '@common/hooks';

import { classNames } from '@common/utils';

import { ReactComponent as BasicsSearchSmall } from '@assets/icons/outline/basics-search-small.svg';
import { ReactComponent as BasicsXSmall } from '@assets/icons/outline/basics-x-small.svg';
import { ReactComponent as Files } from '@assets/icons/outline/files.svg';
import { ReactComponent as GroupUsers } from '@assets/icons/outline/group-users.svg';
import { ReactComponent as Suitcase } from '@assets/icons/outline/suitcase.svg';
import { ReactComponent as ArrowRight2 } from '@assets/icons/outline/arrow-right-2.svg';
import { MainGroups } from '@common/constants';

export enum SearchResultType {
  Vendor = 'Vendor',
  Teams = 'Teams',
  Categories = 'Categories',
}

export const getIconByResultType = (
  type: SearchResultType,
): React.FC<React.SVGAttributes<SVGElement>> => {
  if (type === SearchResultType.Vendor) return Suitcase;
  if (type === SearchResultType.Teams) return GroupUsers;
  if (type === SearchResultType.Categories) return Files;
  return BasicsSearchSmall;
};

export type SearchResult = {
  id: number;
  title: string;
  type: SearchResultType;
  directoryId: number;
};

const DEBOUNCE_WAIT = 500;

const SearchBar: React.VFC = () => {
  const history = useHistory();
  const useableViewRef = useRef(null);

  const [keyword, setKeyword] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const onCloseDropDownResultsView = () => setResults([]);
  useOnClickOutside(useableViewRef, onCloseDropDownResultsView);

  useEffect(() => {
    if (keyword.length > 0) {
      setResults([
        {
          id: 0,
          title: 'Adecco Personeelsdiensten BV',
          type: SearchResultType.Vendor,
          directoryId: 1362,
        },
        {
          id: 1,
          title: 'AD-Hoc Fines Germany',
          type: SearchResultType.Vendor,
          directoryId: 1333,
        },
        {
          id: 2,
          title: 'CAD-HOC Fines Italy',
          type: SearchResultType.Vendor,
          directoryId: 1347,
        },
        {
          id: 3,
          title: 'Adobe, Inc.',
          type: SearchResultType.Vendor,
          directoryId: 1356,
        },
        {
          id: 4,
          title: 'Community Operations',
          type: SearchResultType.Teams,
          directoryId: 332,
        },
        {
          id: 5,
          title: '3PL Labor',
          type: SearchResultType.Categories,
          directoryId: 333,
        },
        {
          id: 6,
          title: 'AFPA ENTREPRISES',
          type: SearchResultType.Vendor,
          directoryId: 1359,
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
    setResults([]);
  };

  const onPressResultRow = (result: SearchResult) => {
    setResults([]);
    switch (result.type) {
      case SearchResultType.Teams:
        history.push({
          pathname: `/departments/${result?.directoryId}`,
          search: `?route=${MainGroups.Directories}`,
        });
        break;
      case SearchResultType.Categories:
        history.push({
          pathname: `/categories/${result?.directoryId}`,
          search: `?route=${MainGroups.Directories}`,
        });
        break;
      case SearchResultType.Vendor:
        history.push({
          pathname: `/vendors/${result?.directoryId}`,
          search: `?route=${MainGroups.Directories}`,
        });
        break;
      default:
        break;
    }
  };

  const renderResultRow = (result: SearchResult) => {
    const IconByType = getIconByResultType(result.type);
    return (
      <button
        onClick={() => onPressResultRow(result)}
        type="button"
        key={result?.id}
        className={classNames(
          'relative group py-2 px-6 w-full flex flex-row items-center hover:bg-Gray-12',
        )}
      >
        <IconByType className="w-6 h-6" />
        <div className="flex flex-1 items-center ml-2">
          <p className="text-Gray-3 text-sm">{result?.title}</p>
          <p className="text-Gray-6 text-sm ml-2">{`- ${result.type.toString()}`}</p>
        </div>
        <div className="flex ml-auto">
          <ArrowRight2 className="h-4 w-4 text-Accent-1 invisible group-hover:visible" />
        </div>
      </button>
    );
  };

  return (
    <>
      <div className="flex items-center w-full px-6 lg:max-w-none lg:mx-4 xl:px-0">
        <>
          <div className="w-full relative" ref={useableViewRef}>
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
              <div className="absolute mt-2 w-full px-4 bg-white shadow-lg rounded-sm border border-Gray-11 pt-6 pb-4 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {results.map(renderResultRow)}
              </div>
            </Transition>
          </div>
        </>
      </div>
    </>
  );
};

export default SearchBar;
