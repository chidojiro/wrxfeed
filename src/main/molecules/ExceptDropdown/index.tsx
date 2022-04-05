import { classNames } from '@common/utils';
import React, { Fragment, useState, useCallback } from 'react';
import { Popover, Transition } from '@headlessui/react';
import AddTargetTagInput from '@main/atoms/AddTargetTagInput';
import { IntersectIcon } from '@assets';
import { getIconByResultType, getPropTypeDisplayName } from '@main/utils';
import { SearchResult } from '@main/types';
import { useSearch } from '@main/hooks/search.hook';

interface ExceptDropdownProps {
  className?: string;
  classPopover?: string;
  title: string;
  onItemAdd: (item: SearchResult) => void;
}

const ExceptDropdown: React.VFC<ExceptDropdownProps> = ({
  className = '',
  classPopover = '',
  title,
  onItemAdd,
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const { results } = useSearch({
    keyword,
  });
  const onSearchKeyword = useCallback(
    (value: string) => {
      setKeyword(value);
    },
    [setKeyword],
  );
  const renderSearchResult = (result: SearchResult) => {
    const IconByType = getIconByResultType(result?.type);
    return (
      <button
        onClick={() => {
          onItemAdd(result);
        }}
        key={result?.id}
        type="button"
        className="hover:bg-Gray-12 px-7 py-2.5 h-10 flex flex-row items-center text-xs group w-full"
      >
        <div className="flex w-5 h-5 justify-center items-center">
          <IconByType
            className="w-5 h-5 object-scale-down"
            style={{ width: 20, height: 20 }}
            viewBox="2 2 20 20"
          />
        </div>
        <p className="text-Gray-1 ml-2 truncate">{result?.title}</p>
        <p className="text-Gray-6 ml-2 invisible group-hover:visible">
          {`- ${getPropTypeDisplayName(result?.type)}`}
        </p>
      </button>
    );
  };
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
                  <AddTargetTagInput placeholder={title} onTextChange={onSearchKeyword} />
                  <div className="flex flex-col mt-2 w-full max-h-[200px] overflow-y-scroll hide-scrollbar">
                    {results?.map(renderSearchResult)}
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
