/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useCallback, useEffect, useRef } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { TargetPropType } from '@api/types';
import { classNames } from '@common/utils';
import { getColorByPropertyType } from '@main/utils';
import AddTargetTagInput from '@main/atoms/AddTargetTagInput';
import { SearchResult } from '@main/types';
import { useSearch } from '@main/hooks/search.hook';
import { AlertRed } from '@assets';
import useRoveFocus from '@main/hooks/focus.hook';
import PropertyDropdownItem from '@main/atoms/PropertyDropdownItem';
import { useDebounce } from '@common/hooks';

export enum DropdownEdge {
  LEFT = 'left-0',
  RIGHT = '-right-32',
}

const DEBOUNCE_WAIT = 500;

interface PropertiesDropdownProps {
  className?: string;
  classPopover?: string;
  showError?: boolean;
  closeError?: () => void;
  placeholder?: string;
  IconComponent: React.FC<React.SVGAttributes<SVGElement>>;
  title: string;
  type: TargetPropType;
  dropdownEdge?: DropdownEdge;
  defaultItems?: SearchResult[];
  onChangeItems?: (items: SearchResult[]) => void;
}

const PropertiesDropdown: React.VFC<PropertiesDropdownProps> = ({
  className = '',
  classPopover = '',
  showError = false,
  closeError = () => undefined,
  placeholder = '',
  IconComponent,
  title,
  type,
  dropdownEdge = DropdownEdge.LEFT,
  onChangeItems,
  defaultItems,
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const [items, setItems] = useState<SearchResult[]>(defaultItems ?? []);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { results } = useSearch({
    keyword,
    searchCate: type === TargetPropType.CATEGORY,
    searchDept: type === TargetPropType.DEPARTMENT,
    searchVend: type === TargetPropType.VENDOR,
    ignoreEmptyKeyword: false,
  });

  const [focus, setFocus] = useRoveFocus(results?.length + 1);

  useEffect(() => {
    if (showError) {
      buttonRef?.current?.click();
    }
  }, [showError]);

  useEffect(() => {
    if (typeof onChangeItems === 'function') {
      onChangeItems(items);
    }
  }, [items, onChangeItems]);

  const onSearchKeyword = useCallback(
    (value: string) => {
      setKeyword(value);
      if (showError) {
        closeError();
      }
    },
    [closeError, showError],
  );

  const debounceSearchRequest = useDebounce(onSearchKeyword, DEBOUNCE_WAIT, [onSearchKeyword]);

  const colorByType = getColorByPropertyType(type);

  const renderErrorProperty = () => {
    if (!showError) return null;
    return (
      <div className="flex flex-row items-center px-2 space-x-1 mt-2">
        <AlertRed width={15} height={15} className="w-4 h-4" viewBox="0 0 15 15" />
        <p className="text-xs text-Gray-6">Targets need at least one property</p>
      </div>
    );
  };
  const renderItemSelected = (itemSelected: SearchResult) => {
    return (
      <button
        type="button"
        key={`renderItemSelected-${itemSelected.id}`}
        className="flex flex-row h-[30px] items-center mb-1 space-x-1 px-2 py-1 rounded-sm"
        style={{ backgroundColor: colorByType }}
      >
        <IconComponent
          className="w-5 h-5 fill-current path-no-filled text-white object-scale-down"
          width={20}
          height={20}
          viewBox="0 0 20 20"
        />
        <p className="text-white text-left text-3xs font-semibold truncate max-w-[100px]">
          {itemSelected?.title}
        </p>
        <button
          key={`renderItemSelected-close-${itemSelected.id}`}
          type="button"
          className="text-xs text-white font-bold ml-2"
          onClick={(event) => {
            event.stopPropagation();
            setItems((pre) => pre.filter((item: SearchResult) => item.id !== itemSelected.id));
          }}
        >
          &times;
        </button>
      </button>
    );
  };
  const renderButton = () => {
    if (items.length === 0) {
      return (
        <button
          type="button"
          className="flex flex-row h-[30px] items-center space-x-1 px-2 py-1 rounded-sm"
          style={{ backgroundColor: colorByType }}
        >
          <IconComponent
            className="w-5 h-5 fill-current path-no-filled text-white object-scale-down"
            width={20}
            height={20}
            viewBox="0 0 20 20"
          />
          <p className="text-white text-left text-3xs font-semibold truncate max-w-[86px]">
            {title}
          </p>
          <button
            type="button"
            className="text-xs text-white font-bold ml-2"
            onClick={() => undefined}
          >
            &times;
          </button>
        </button>
      );
    }
    return (
      <div className="flex flex-col items-start hide-scrollbar max-h-[120px] overflow-y-scroll">
        {items?.map(renderItemSelected)}
      </div>
    );
  };

  return (
    <div className={classNames(className)}>
      <Popover as="div" className="flex-shrink-0 relative">
        {({ open }) => (
          <>
            <Popover.Button ref={buttonRef} className={classNames('', open ? '' : '')}>
              {renderButton()}
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
                    'flex w-[384px] h-[240px] flex-col py-4 px-6 absolute z-50 mt-2 shadow-propertyDropdown border border-Gray-11 rounded-sm bg-white',
                    dropdownEdge,
                    classPopover,
                  )}
                >
                  <AddTargetTagInput
                    focus={focus === 0}
                    placeholder={placeholder}
                    autoFocus
                    setFocus={setFocus}
                    onTextChange={debounceSearchRequest}
                  />
                  {renderErrorProperty()}
                  <div className="flex flex-col mt-2 w-full max-h-[200px] overflow-y-scroll hide-scrollbar">
                    {results?.map((result, index) => (
                      <PropertyDropdownItem
                        key={`renderSearchResult-${result?.id}`}
                        result={result}
                        focus={focus === index + 1}
                        onClickHandler={() => {
                          setFocus(index);
                          const isIncluded = items.includes(result);
                          if (!isIncluded) {
                            setItems((pre) => [...pre, result]);
                          }
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

export default PropertiesDropdown;