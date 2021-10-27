import React from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Category } from '@main/entity';
import ListLoading from '@main/atoms/ListLoading';

interface CategoryListProps {
  categories: Category[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  onSelect?: (cat: Category) => void;
}

const CategoryList: React.VFC<CategoryListProps> = ({
  categories,
  isLoading,
  onLoadMore,
  onSelect,
}) => {
  return (
    <InfiniteScroller
      className="pb-14 mr-0.5 space-y-10 overflow-scroll"
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-sm">
        <ul className="divide-y divide-gray-200">
          {categories.map((category) => (
            <li key={category.id} className="px-4 py-4 sm:px-6">
              <div
                aria-hidden="true"
                className="cursor-pointer w-full"
                onClick={() => onSelect && onSelect(category)}
                onKeyDown={() => onSelect && onSelect(category)}
              >
                <p className="ml-3 text-sm font-medium text-Gray-1">{category.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </InfiniteScroller>
  );
};

export default CategoryList;
