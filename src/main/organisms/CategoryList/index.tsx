import InfiniteScroller from '@/common/atoms/InfiniteScroller';
import { useMountEffect } from '@/common/hooks';
import ListLoading from '@/main/atoms/ListLoading';
import { Category } from '@/main/entity';
import DirectoryItem from '@/main/molecules/DirectoryItem';
import { identifyMixPanelUserProfile } from '@/mixpanel/useMixPanel';
import { useProfile } from '@/profile/useProfile';
import mixpanel from 'mixpanel-browser';
import React from 'react';

interface CategoryListProps {
  categories: Category[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  onSelect?: (cat: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  isLoading,
  onLoadMore,
  onSelect,
}) => {
  const { profile } = useProfile();

  useMountEffect(() => {
    mixpanel.track('Category Directory View', {
      user_id: profile?.id,
      email: profile?.email,
      company_id: profile?.company?.id,
    });
    identifyMixPanelUserProfile(profile);
  });

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
