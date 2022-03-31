import { TargetPropType } from '@api/types';
import { classNames } from '@common/utils';
import { getColorByPropertyType, getIconByResultType, getPropTypeDisplayName } from '@main/utils';
import React, { Fragment, useRef, useState, useCallback, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import AddTargetTagInput from '@main/atoms/AddTargetTagInput';
import { SearchResult } from '@main/types';
import { useSearch } from '@main/hooks/search.hook';
import { useDebounce } from '@common/hooks';
import { AlertRed } from '@assets';

export enum DropdownEdge {
  LEFT = 'left-0',
  RIGHT = '-right-32',
}

interface PropertiesDropdownProps {
  className?: string;
  classPopover?: string;
  IconComponent: React.FC<React.SVGAttributes<SVGElement>>;
  title: string;
  type: TargetPropType;
  dropdownEdge?: DropdownEdge;
  default?: SearchResult[];
}

type AddTargetTagInputHandler = React.ElementRef<typeof AddTargetTagInput>;
const DEBOUNCE_WAIT = 0;

const PropertiesDropdown: React.VFC<PropertiesDropdownProps> = ({
  className = '',
  classPopover = '',
  IconComponent,
  title,
  type,
  dropdownEdge = DropdownEdge.LEFT,
}) => {
  const tagInputRef = useRef<AddTargetTagInputHandler>(null);
  const [keyword, setKeyword] = useState<string>('');
  const { results } = useSearch({ keyword });
  const [showErrorProperty, setShowErrorProperty] = useState<boolean>(false);

  const onSearchKeyword = useCallback(
    (value: string) => {
      setKeyword(value);
    },
    [setKeyword],
  );
  const debounceSearchRequest = useDebounce(onSearchKeyword, DEBOUNCE_WAIT, [onSearchKeyword]);
  const colorByType = getColorByPropertyType(type);

  useEffect(() => {
    setShowErrorProperty(false);
  }, []);

  const renderErrorProperty = () => {
    if (!showErrorProperty) return null;
    return (
      <div className="flex flex-row items-center px-2 space-x-1">
        <AlertRed width={15} height={15} className="w-4 h-4" viewBox="0 0 15 15" />
        <p className="text-xs text-Gray-6">Targets need at least one property</p>
      </div>
    );
  };

  const renderResultProperty = (result: SearchResult) => {
    const IconByType = getIconByResultType(result?.type);
    return (
      <button
        onClick={() => tagInputRef.current?.addItem(result)}
        key={result?.id}
        type="button"
        className="hover:bg-Gray-12 px-7 py-2.5 flex flex-row items-center text-xs group"
      >
        <div className="flex w-5 h-5 justify-center items-center">
          <IconByType
            className="w-5 h-5 object-scale-down"
            style={{ width: 20, height: 20 }}
            viewBox="2 2 20 20"
          />
        </div>
        <p className="text-Gray-1 ml-8 truncate">{result?.title}</p>
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
                className="flex flex-row h-[30px] items-center space-x-1 px-2 py-1 rounded-sm"
                style={{ backgroundColor: colorByType }}
              >
                <IconComponent
                  className="w-5 h-5 fill-current path-no-filled text-white object-scale-down"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                />
                <p className="text-white text-3xs font-semibold">{title}</p>
                <button
                  type="button"
                  className="text-xs text-white font-bold ml-2"
                  onClick={() => undefined}
                >
                  &times;
                </button>
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
                    'flex w-[384px] h-[240px] flex-col py-4 px-6 absolute z-50 mt-2 shadow-propertyDropdown border border-Gray-11 rounded-sm bg-white',
                    dropdownEdge,
                    classPopover,
                  )}
                >
                  <AddTargetTagInput placeholder={title} onTextChange={debounceSearchRequest} />
                  {renderErrorProperty()}
                  <div className="flex flex-col mt-2 w-full max-h-[200px] overflow-y-scroll hide-scrollbar">
                    {results?.map(renderResultProperty)}
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
