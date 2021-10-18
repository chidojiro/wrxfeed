import React from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Category } from '@main/entity';
import TransactionLoading from '@main/atoms/TransactionLoading';
import TransactionListEnd from '@main/atoms/TransactionListEnd';

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
  hasMore,
  onSelect,
}) => {
  return (
    <InfiniteScroller
      style={{
        overflow: 'scroll',
        paddingBottom: 52,
        marginRight: 2,
      }}
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<TransactionLoading />}
    >
      <ul className="pb-4 divide-y divide-Gray-8 rounded-sm">
        {categories.map((category) => (
          <li key={category.id} className="flex bg-white">
            <div
              aria-hidden="true"
              className="py-4 cursor-pointer w-full"
              onClick={() => onSelect && onSelect(category)}
              onKeyDown={() => onSelect && onSelect(category)}
            >
              <p className="ml-3 text-sm font-medium text-Gray-1">{category.name}</p>
            </div>
          </li>
        ))}
      </ul>
      {!isLoading && !hasMore && <TransactionListEnd />}
    </InfiniteScroller>
  );
};

export default CategoryList;
