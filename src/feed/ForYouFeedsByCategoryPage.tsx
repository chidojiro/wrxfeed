import { ChevronLeftIcon } from '@/assets';
import { MainLayout } from '@/layout/MainLayout';
import { useProfile } from '@/profile/useProfile';
import mixpanel from 'mixpanel-browser';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Feeds } from './Feeds';
import { useCategory } from './useCategory';

export const ForYouFeedsByCategoryPage = () => {
  const params = useParams() as Record<string, string>;
  const { profile } = useProfile();

  React.useEffect(() => {
    mixpanel.track('For You Feeds By Category View', {
      user_id: profile?.id,
      email: profile?.email,
      company: profile?.company?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Feeds categoryId={categoryId} forYou={1} />
    </MainLayout>
  );
};
