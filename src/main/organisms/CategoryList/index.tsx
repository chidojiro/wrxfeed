import React from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Category } from '@main/entity';
import ListLoading from '@main/atoms/ListLoading';
import DirectoryItem from '@main/molecules/DirectoryItem';
import { useSubscription } from '@main/hooks/subscription.hook';

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
  const { subscribe, unsubscribe, isFollowing } = useSubscription();

  return (
    <InfiniteScroller
      className="pb-14 mr-0.5 space-y-10 overflow-hidden"
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <ul className="flex flex-col space-y-6 px-0.5">
        {categories.map((category) => (
          <li key={category.id} className="">
            <DirectoryItem
              item={category}
              onClick={() => onSelect && onSelect(category)}
              isFollowing={isFollowing('categories', category)}
              onFollow={() => subscribe('categories', category)}
              onUnfollow={() => unsubscribe('categories', category)}
            />
          </li>
        ))}
      </ul>
    </InfiniteScroller>
  );
};

export default CategoryList;
