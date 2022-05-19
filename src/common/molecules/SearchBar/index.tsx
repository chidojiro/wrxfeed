/* eslint-disable react/jsx-curly-newline */
import React, { Fragment, useState, useCallback, useRef } from 'react';
import { Transition } from '@headlessui/react';
import { useHistory } from 'react-router-dom';
import { useOnClickOutside } from '@dwarvesf/react-hooks';

import { useDebounce } from '@common/hooks';
import { useSearch } from '@main/hooks/search.hook';
import useRoveFocus from '@main/hooks/focus.hook';

import { SearchResult } from '@main/types';
import { TargetPropType } from '@api/types';
import { MainGroups } from '@common/constants';
import { getIconByResultType, getPropTypeDisplayName } from '@main/utils';
import { classNames } from '@common/utils';

import Loading from '@common/atoms/Loading';

import { ReactComponent as BasicsSearchSmall } from '@assets/icons/outline/basics-search-small.svg';
import { ReactComponent as BasicsXSmall } from '@assets/icons/outline/basics-x-small.svg';
import { ReactComponent as ArrowRight2 } from '@assets/icons/outline/arrow-right-2.svg';
import { ReactComponent as QuestionCircle } from '@assets/icons/solid/question-circle.svg';

const DEBOUNCE_WAIT = 0;

const SearchBar: React.VFC = () => {
  const history = useHistory();
  const useableViewRef = useRef(null);

  const [keyword, setKeyword] = useState<string>('');
  const [isFocus, setFocus] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isSearching = keyword?.length > 0;

  const { results, isLoading, onClear } = useSearch({ keyword });

  const [focus, setRoveFocus] = useRoveFocus(results?.length + 1);

  const onCloseDropDownResultsView = () => {
    onClear();
    setKeyword('');
  };
  useOnClickOutside(useableViewRef, onCloseDropDownResultsView);

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
    onClear();
    setKeyword('');
  };

  const onPressResultRow = (result: SearchResult) => {
    onClear();
    switch (result.type) {
      case TargetPropType.DEPARTMENT:
        history.push({
          pathname: `/departments/${result?.directoryId}`,
          search: `?route=${MainGroups.Directories}`,
        });
        break;
      case TargetPropType.CATEGORY:
        history.push({
          pathname: `/categories/${result?.directoryId}`,
          search: `?route=${MainGroups.Directories}`,
        });
        break;
      case TargetPropType.VENDOR:
        history.push({
          pathname: `/vendors/${result?.directoryId}`,
          search: `?route=${MainGroups.Directories}`,
        });
        break;
      default:
        break;
    }
  };

  const renderResultRow = (result: SearchResult, index: number) => {
    const IconByType = getIconByResultType(result?.type);
    return (
      <button
        onClick={() => {
          onPressResultRow(result);
          setRoveFocus(index + 1);
        }}
        type="button"
        key={result?.id}
        className={classNames(
          'relative group py-2 px-6 w-full flex flex-row items-center hover:bg-Gray-12',
        )}
        tabIndex={focus ? 0 : -1}
      >
        <IconByType className="w-6 h-6" />
        <div className="flex flex-1 items-center ml-2">
          <p className="text-Gray-3 text-sm">{result?.title}</p>
          <p className="text-Gray-6 text-sm ml-2 invisible group-hover:visible">
            {`- ${getPropTypeDisplayName(result?.type)}`}
          </p>
        </div>
        <div className="flex ml-auto">
          <ArrowRight2 className="h-4 w-4 text-Accent-1 invisible group-hover:visible" />
        </div>
      </button>
    );
  };

  const isEmptyResult = isFocus && isSearching && results.length === 0;
  const renderResultsOrEmpty = () => {
    if (isEmptyResult) {
      return (
        <div className="flex mx-6 px-1 my-2 w-full flex-row items-center space-x-3 py-1 h-6">
          {isLoading ? (
            <>
              <Loading width={15} height={15} />
              <p className="text-sm text-Gray-3">Loading...</p>
            </>
          ) : (
            <>
              <QuestionCircle width={15} height={15} />
              <p className="text-sm text-Gray-3">
                No results found.
                <span className="text-Gray-6"> Try searching for a team, category, or vendor.</span>
              </p>
            </>
          )}
        </div>
      );
    }
    return results.map((result, index) => renderResultRow(result, index));
  };

  return (
    <>
      <div className="flex items-center w-full lg:max-w-none">
        <>
          <div className="w-full relative" ref={useableViewRef}>
            <div className="sr-only">Search for teams, categories, or vendors</div>
            <div className="relative flex flex-row items-center group">
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
                onFocus={() => {
                  setFocus(true);
                  setRoveFocus(0);
                }}
                onBlur={() => setFocus(false)}
              />
              {(isFocus || isSearching) && (
                <button
                  type="button"
                  onClick={onClickClearSearchInput}
                  className="absolute z-30 inset-y-0 right-2 sm:right-7 flex flex-row items-center group-focus:invisible"
                >
                  <BasicsXSmall
                    width={20}
                    height={20}
                    className="h-5 w-5 fill-current path-no-filled object-fill text-Gray-12"
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
            <Transition
              show={results.length > 0 || isEmptyResult}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute mt-2 w-full px-4 max-h-[327px] bg-white shadow-lg rounded-sm border border-Gray-11 pt-6 pb-4 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {renderResultsOrEmpty()}
              </div>
            </Transition>
          </div>
        </>
      </div>
    </>
  );
};

export default SearchBar;
