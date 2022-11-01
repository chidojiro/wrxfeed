import { SearchResult } from '@/main/types';
import { getIconByResultType, getPropTypeDisplayName } from '@/main/utils';
import React, { useEffect, useRef } from 'react';
import { ReactComponent as ArrowRight2 } from '@/assets/icons/outline/arrow-right-2.svg';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface SearchBarResultItemProps {
  result: SearchResult;
  focus: boolean;
  href: string;
  onClickHandler: () => void;
}

const SearchBarResultItem: React.FC<SearchBarResultItemProps> = ({
  result,
  focus,
  onClickHandler,
  href,
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (focus) {
      // Move element into view when it is focused
      if (ref?.current) {
        ref?.current.focus();
      }
    }
  }, [focus]);

  const IconByType = getIconByResultType(result?.type);

  return (
    <Link
      to={href}
      key={result?.id}
      className={clsx(
        'relative group py-2 px-6 w-full flex flex-row items-center hover:bg-Gray-12',
      )}
      tabIndex={focus ? 0 : -1}
      onClick={onClickHandler}
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
    </Link>
  );
};

export default SearchBarResultItem;
