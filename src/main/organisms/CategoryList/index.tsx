import React, { useEffect } from 'react';
import { Category } from '@/main/entity';
import ListLoading from '@/main/atoms/ListLoading';
import DirectoryItem from '@/main/molecules/DirectoryItem';

import mixpanel from 'mixpanel-browser';
import { useIdentity } from '@/identity/hooks';
import InfiniteScroller from '@/common/atoms/InfiniteScroller';

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
  const identity = useIdentity();

  useEffect(() => {
    mixpanel.track('Category Directory View', {
      user_id: identity?.id,
      email: identity?.email,
      company: identity?.company?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              itemType="categories"
            />
          </li>
        ))}
      </ul>
    </InfiniteScroller>
  );
};

export default CategoryList;
