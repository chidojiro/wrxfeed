import { ReactComponent as BasicsSearchSmall } from '@/assets/icons/outline/basics-search-small.svg';
import { useDebounce } from '@/common/hooks';
import useRoveFocus from '@/main/hooks/focus.hook';
import { useSearch } from '@/misc/useSearch';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const DEBOUNCE_WAIT = 0;

const MembersSearchBar: React.FC = () => {
  const useableViewRef = useRef(null);

  const [keyword, setKeyword] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { results } = useSearch({ keyword });

  const [focus, setRoveFocus] = useRoveFocus(results?.length + 1);

  useEffect(() => {
    if (focus === 0) {
      // Move element into view when it is focused
      if (searchInputRef?.current) {
        searchInputRef?.current.focus();
      }
    }
  }, [focus]);

  const onSearchTeam = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value.toString());
    },
    //call api here
    [setKeyword],
  );
  const debounceSearchRequest = useDebounce(onSearchTeam, DEBOUNCE_WAIT);

  return (
    <>
      <div className="flex items-center w-full lg:max-w-none">
        <>
          <div className="w-full relative" ref={useableViewRef}>
            <div className="sr-only">Search this list</div>
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
                className="block w-full text-Gray-6 focus:border focus:border-gray-300 rounded-sm border border-Gray-11 py-0 h-7 pl-8 pr-8 sm:pr-16 sm:pl-9 text-sm placeholder-Gray-6 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm truncate"
                placeholder="Search this list"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                onChange={debounceSearchRequest}
                onFocus={() => {
                  setRoveFocus(0);
                }}
              />
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default MembersSearchBar;
