import { ChevronLeftIcon } from '@/assets';
import { useCategory } from '@/category/useCategory';
import { useMountEffect } from '@/common/hooks';
import { MainLayout } from '@/layout/MainLayout';
import { identifyMixPanelUserProfile } from '@/mixpanel/useMixPanel';
import { useProfile } from '@/profile/useProfile';
import mixpanel from 'mixpanel-browser';
import { Link, useParams } from 'react-router-dom';
import { Feeds } from './Feeds';

export const ForYouFeedsByCategoryPage = () => {
  const params = useParams() as Record<string, string>;
  const { profile } = useProfile();

  useMountEffect(() => {
    mixpanel.track('For You Feeds By Category View', {
      user_id: profile?.id,
      email: profile?.email,
      company_id: profile?.company?.id,
    });
    identifyMixPanelUserProfile(profile);
  });

  const categoryId = +params.categoryId;

  const { data: category } = useCategory(categoryId);

  return (
    <MainLayout>
      {!!category && (
        <div className="flex items-center space-x-4 pb-8">
          <Link to="/feeds/for-you">
            <ChevronLeftIcon className="cursor-pointer" />
          </Link>
          <h1 className="text-Gray-1 text-xl font-bold">{category.name}</h1>
        </div>
      )}
      <Feeds categoryId={categoryId} mode="for-you" />
    </MainLayout>
  );
};
