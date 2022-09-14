import { ReactComponent as BasicsSearchSmall } from '@/assets/icons/outline/basics-search-small.svg';
import React, { useRef } from 'react';

export type SearchInputProps = {
  placeholder?: string;
  onChange?: () => void;
};

export const SearchInput = ({ placeholder, onChange }: SearchInputProps) => {
  const useableViewRef = useRef(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="flex items-center w-full lg:max-w-none">
        <>
          <div className="w-full relative" ref={useableViewRef}>
            <div className="sr-only">{placeholder}</div>
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
                placeholder={placeholder}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                onChange={onChange}
              />
            </div>
          </div>
        </>
      </div>
    </>
  );
};
