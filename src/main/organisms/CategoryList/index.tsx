import React from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Category } from '@main/entity';
import ListLoading from '@main/atoms/ListLoading';
import DirectoryItem from '@main/molecules/DirectoryItem';

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
      className="pb-14 mr-0.5 space-y-10 overflow-hidden"
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-sm">
        <ul className="divide-y divide-gray-200">
          {categories.map((category) => (
            <li key={category.id} className="px-4 py-4 sm:px-6">
              <DirectoryItem item={category} onClick={() => onSelect && onSelect(category)} />
            </li>
          ))}
        </ul>
      </div>
    </InfiniteScroller>
  );
};

export default CategoryList;
