import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';

import { useCategory } from '@main/hooks/category.hook';
import { classNames } from '@common/utils';
import { Category } from '@main/entity';
import { CategoryIcon } from '@assets/index';
import { CategoryFilter } from '@api/types';
import Loading from '@common/atoms/Loading';
import { MainGroups } from '@common/constants';
import { decimalLogic, DecimalType } from '@main/utils';

const LIMIT = 6;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

interface TopCategoriesProps {
  className?: string;
  departmentId: number;
}

const TopCategories: React.VFC<TopCategoriesProps> = ({ className = '', departmentId }) => {
  const history = useHistory();
  const [filter] = useState<CategoryFilter>({
    ...INIT_PAGINATION,
    dep: departmentId,
  });
  const { categories = [], isLoading } = useCategory(filter);
  const onSelect = (category: Category) => {
    history.push({
      pathname: `/categories/${category?.id}`,
      search: `?route=${MainGroups.Following}&department=${departmentId}&month=${category?.month}&year=${category?.year}`,
    });
  };
  const renderTopCategoryItem = (category: Category) => {
    return (
      <div
        key={`TopCategories-${category.id}`}
        className="flex flex-row items-center px-6 py-4 border-b border-t border-t-white border-b-Gray-11 hover:border-Accent-4 bg-white hover:shadow-topCategoryHover hover:z-10 hover:cursor-pointer"
        onClick={() => {
          onSelect(category);
        }}
        aria-hidden="true"
      >
        <p className="text-Gray-3 text-xs font-semibold">{category?.name}</p>
        <p className="mx-1 text-Gray-6 text-sm">·</p>
        <p className="text-Gray-6 text-xs font-normal">
          {category?.month
            ? dayjs()
                .month(category?.month - 1)
                .format('MMMM')
            : '...'}
        </p>
        <p className="text-Gray-3 text-xs font-semibold ml-auto">
          {`${decimalLogic(category?.amount ?? 0, DecimalType.SummedNumbers)}`}
        </p>
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
      {isLoading && (
        <div className="w-5 h-5 flex justify-center items-center self-center mt-6">
          <Loading width={16} height={16} />
        </div>
      )}
      {categories.map(renderTopCategoryItem)}
    </div>
  );
};

export default TopCategories;
