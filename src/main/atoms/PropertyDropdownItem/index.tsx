import { SearchResult } from '@/main/types';
import { getIconByResultType, getPropTypeDisplayName } from '@/main/utils';
import React, { useEffect, useRef, VFC } from 'react';

interface PropertyDropdownItemProps {
  result: SearchResult;
  focus: boolean;
  onClickHandler: () => void;
}

const PropertyDropdownItem: VFC<PropertyDropdownItemProps> = ({
  result,
  focus,
  onClickHandler,
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (focus) {
      // Move element into view when it is focused
      if (ref && ref?.current) {
        ref?.current.focus();
      }
    }
  }, [focus]);

  const IconByType = getIconByResultType(result?.type);
  return (
    <button
      ref={ref}
      onClick={onClickHandler}
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
