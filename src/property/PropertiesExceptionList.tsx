import { Button } from '@/common/components';
import { getColorByPropertyType, getPropIconByType } from '@/main/utils';
import { TargetProps } from '@/target/types';
import clsx from 'clsx';
import React from 'react';

type ExceptionListProps = {
  className?: string;
  items: TargetProps[];
  onTagRemoveClick?: (item: TargetProps) => void;
};

const ExceptionList = ({ className, items = [], onTagRemoveClick }: ExceptionListProps) => {
  if (items.length === 0) return null;

  return (
    <div className={clsx('flex flex-row py-1 space-x-2 px-2', className)}>
      <div className="flex items-center justify-center w-[50px] h-[30px]">
        <p className="text-Gray-6 text-xs">Except </p>
      </div>
      <div className="flex flex-grow flex-wrap items-center focus-within:z-10 overflow-y-scroll">
        {items.map((item) => {
          const IconByType = getPropIconByType(item?.type);
          const colorByType = getColorByPropertyType(item?.type);
          return (
            <Button
              key={`ExceptionList-${item?.id}`}
              className="flex flex-row h-[30px] items-center m-0.5 space-x-1 px-2 py-1 rounded-sm"
              style={{ backgroundColor: colorByType }}
            >
              <IconByType
                className="w-5 h-5 fill-current path-no-filled text-white object-scale-down"
                width={20}
                height={20}
                viewBox="0 0 20 20"
              />
              <p className="text-white text-left text-3xs font-semibold truncate max-w-[160px]">
                {item?.name}
              </p>
              <Button
                className="text-xs text-white font-bold ml-2"
                onClick={() => {
                  onTagRemoveClick?.(item);
                }}
              >
                &times;
              </Button>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ExceptionList;
