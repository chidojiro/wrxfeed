import { ClassName } from '@/common/types';
import clsx from 'clsx';
import React from 'react';

export type MembersTableRowProps = ClassName & {
  data: React.ReactNode[];
  onClick?: () => void;
};

export const MembersTableRow = ({ data, className, onClick }: MembersTableRowProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'flex gap-2 w-[calc(100%-2px)] mx-auto text-left py-3 px-2 items-center',
        { 'list-row-hover cursor-pointer': !!onClick },
        className,
      )}
    >
      <div className="w-4 h-4">{data[0]}</div>
      <div className="grid grid-cols-4 flex-1 gap-2 items-center">
        <div className="col-span-1">{data[1]}</div>
        <div className="col-span-1">{data[2]}</div>
        <div className="col-span-1">{data[3]}</div>
        <div className="col-span-1">{data[4]}</div>
      </div>
    </div>
  );
};
