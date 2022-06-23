import { classNames } from '@/common/utils';
import React, { Fragment, useState, useCallback } from 'react';
import { Popover, Transition } from '@headlessui/react';
import AddTargetTagInput from '@/main/atoms/AddTargetTagInput';
import { IntersectIcon } from '@/assets';
import { SearchResult } from '@/main/types';
import { useSearch } from '@/main/hooks/search.hook';
import useRoveFocus from '@/main/hooks/focus.hook';
import PropertyDropdownItem from '@/main/atoms/PropertyDropdownItem';

interface ExceptDropdownProps {
  className?: string;
  classPopover?: string;
  placeholder?: string;
  selected: SearchResult[];
  title: string;
  onItemAdd: (item: SearchResult) => void;
}

const ExceptDropdown: React.VFC<ExceptDropdownProps> = ({
  className = '',
  classPopover = '',
  placeholder = 'Except',
  selected,
  title,
  onItemAdd,
}) => {
  const [keyword, setKeyword] = useState<string>('');

  const { results } = useSearch({
    keyword,
    except: selected,
  });

  const [focus, setFocus] = useRoveFocus(results?.length + 1);

  const onSearchKeyword = useCallback(
    (value: string) => {
      setKeyword(value);
    },
    [setKeyword],
  );

  return (
    <div className={classNames(className)}>
      <Popover as="div" className="flex-shrink-0 relative">
        {({ open }) => (
          <>
            <Popover.Button className={classNames('', open ? '' : '')}>
              <button
                type="button"
                className="w-[30px] h-[30px] hover:bg-Gray-12 flex justify-center items-center rounded-sm border border-Gray-11"
              >
                <IntersectIcon className="w-4 h-4" width={16} height={16} />
              </button>
            </Popover.Button>
            <Popover.Panel className="absolute z-50">
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div
                  className={classNames(
                    'flex w-[384px] h-[207px] flex-col py-4 px-6 space-y-2 absolute z-50 mt-2 -right-8 shadow-propertyDropdown border border-Gray-11 rounded-sm bg-white',
                    classPopover,
                  )}
                >
                  <p className="text-primary font-semibold text-xs">{title}</p>
                  <AddTargetTagInput
                    focus={focus === 0}
                    placeholder={placeholder}
                    autoFocus
                    setFocus={setFocus}
                    onTextChange={onSearchKeyword}
                  />
                  <div className="flex flex-col mt-2 w-full max-h-[200px] overflow-y-scroll hide-scrollbar">
                    {results?.map((result, index) => (
                      <PropertyDropdownItem
                        key={`renderSearchResult-${result?.id}`}
                        result={result}
                        focus={focus === index + 1}
                        onClickHandler={() => {
                          onItemAdd(result);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Transition>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default ExceptDropdown;
