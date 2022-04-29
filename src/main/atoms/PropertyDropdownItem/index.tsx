import { SearchResult } from '@main/types';
import { getIconByResultType, getPropTypeDisplayName } from '@main/utils';
import React, { Dispatch, SetStateAction, useEffect, useRef, VFC } from 'react';

interface PropertyDropdownItemProps {
  index: number;
  result: SearchResult;
  focus: boolean;
  setFocus: Dispatch<SetStateAction<number>>;
  items: SearchResult[];
  setItems: Dispatch<SetStateAction<SearchResult[]>>;
}

const PropertyDropdownItem: VFC<PropertyDropdownItemProps> = ({
  index,
  result,
  focus,
  setFocus,
  items,
  setItems,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (focus) {
      // Move element into view when it is focused
      if (ref) {
        ref.current.focus();
      }
    }
  }, [focus]);

  const IconByType = getIconByResultType(result?.type);
  return (
    <button
      ref={ref}
      onClick={() => {
        setFocus(index);
        const isIncluded = items.includes(result);
        if (!isIncluded) {
          setItems((pre) => [...pre, result]);
        }
      }}
      type="button"
      className="hover:bg-Gray-12 px-7 py-2.5 h-10 flex flex-row items-center text-xs group w-full"
      tabIndex={focus ? 0 : -1}
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

export default PropertyDropdownItem;
