import { classNames } from '@common/utils';
import React from 'react';

import { Category } from '@main/entity';
import { CategoryIcon } from '@assets/index';

interface TopCategoriesProps {
  className?: string;
  categories?: Category[];
}

const TopCategories: React.VFC<TopCategoriesProps> = ({
  className = '',
  categories = [1, 2, 3, 4, 5, 6],
}) => {
  const renderTopCategoryItem = () => {
    return (
      <div className="flex flex-row items-center px-6 py-4 border-b border-t border-t-white border-b-Gray-11 hover:border-Accent-4 bg-white hover:shadow-topCategoryHover hover:z-10">
        <p className="text-Gray-3 text-xs font-semibold">Core Vehicle In Market Labor</p>
        <p className="mx-1 text-Gray-6 text-sm">·</p>
        <p className="text-Gray-6 text-xs font-normal">January</p>
        <p className="text-Gray-3 text-xs font-semibold ml-auto">$14,500.00</p>
      </div>
    );
  };
  return (
    <div
      className={classNames(
        'flex flex-col bg-white shadow-md rounded-lg overflow-hidden pb-6 mb-6',
        className,
      )}
    >
      <div className="flex flex-row items-center px-6 py-2.5 space-x-2 border-b border-Gray-11">
        <div className="flex w-6 h-6 justify-center items-center">
          <CategoryIcon
            className="w-4 h-4 fill-current path-no-filled text-Gray-3 opacity-100"
            aria-hidden="true"
            width={16}
            height={16}
          />
        </div>
        <p className="text-Gray-3 text-base font-semibold">Top Categories</p>
      </div>
      {categories.map(renderTopCategoryItem)}
    </div>
  );
};

export default TopCategories;
