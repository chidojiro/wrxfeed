/* eslint-disable react/jsx-curly-newline */
import { ReactComponent as BasicsSearchSmall } from '@/assets/icons/outline/basics-search-small.svg';
import { ReactComponent as BasicsXSmall } from '@/assets/icons/outline/basics-x-small.svg';
import { ReactComponent as QuestionCircle } from '@/assets/icons/solid/question-circle.svg';
import Loading from '@/common/atoms/Loading';
import { Button } from '@/common/components';
import { MainGroups } from '@/common/constants';
import { useDebounce } from '@/common/hooks';
import SearchBarResultItem from '@/main/atoms/SearchBarResultItem';
import useRoveFocus from '@/main/hooks/focus.hook';
import { useSearch } from '@/main/hooks/search.hook';
import { SearchResult } from '@/main/types';
import { TargetTypeProp } from '@/target/types';
import { useOnClickOutside } from '@dwarvesf/react-hooks';
import { Transition } from '@headlessui/react';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

const DEBOUNCE_WAIT = 0;

const SearchBar: React.FC = () => {
  const history = useHistory();
  const useableViewRef = useRef(null);

  const [keyword, setKeyword] = useState<string>('');
  const [isFocus, setFocus] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isSearching = keyword?.length > 0;

  const { results, isLoading, onClear } = useSearch({ keyword, searchVend: false });

  const [focus, setRoveFocus] = useRoveFocus(results?.length + 1);

  useEffect(() => {
    if (focus === 0) {
      // Move element into view when it is focused
      if (searchInputRef?.current) {
        searchInputRef?.current.focus();
      }
    }
  }, [focus]);

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
  const debounceSearchRequest = useDebounce(onSearchTeam, DEBOUNCE_WAIT);

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
      case TargetTypeProp.DEPARTMENT:
        history.push({
          pathname: `/departments/${result?.directoryId}`,
          search: `?route=${MainGroups.Following}`,
        });
        break;
      case TargetTypeProp.CATEGORY:
        history.push({
          pathname: `/categories/${result?.directoryId}`,
          search: `?route=${MainGroups.Following}`,
        });
        break;
      case TargetTypeProp.VENDOR:
        history.push({
          pathname: `/vendors/${result?.directoryId}`,
          search: `?route=${MainGroups.Following}`,
        });
        break;
      default:
        break;
    }
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
    return results.map((result, index) => (
      <SearchBarResultItem
        key={`renderSearchResult-${result?.id}`}
        result={result}
        focus={focus === index + 1}
        onClickHandler={() => {
          onPressResultRow(result);
        }}
      />
    ));
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
                <Button
                  onClick={onClickClearSearchInput}
                  className="absolute z-30 inset-y-0 right-2 sm:right-7 flex flex-row items-center group-focus:invisible"
                >
                  <BasicsXSmall
                    width={20}
                    height={20}
                    className="h-5 w-5 fill-current path-no-filled object-fill text-Gray-12"
                    aria-hidden="true"
                  />
                </Button>
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
