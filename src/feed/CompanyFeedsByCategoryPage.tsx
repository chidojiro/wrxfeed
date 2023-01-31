import { ChevronLeftIcon } from '@/assets';
import { useCategory } from '@/category/useCategory';
import { MainLayout } from '@/layout/MainLayout';
import { useMixPanelUserProfile } from '@/mixpanel/useMixPanelUserProfile';
import { useProfile } from '@/profile/useProfile';
import mixpanel from 'mixpanel-browser';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Feeds } from './Feeds';

export const CompanyFeedsByCategoryPage = () => {
  const params = useParams() as Record<string, string>;

  const { profile } = useProfile();

  useEffect(() => {
    mixpanel.track('Company Feed View', {
      user_id: profile?.id,
      email: profile?.email,
      company: profile?.company?.id,
    });
    useMixPanelUserProfile(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryId = +params.categoryId;

  const { data: category } = useCategory(categoryId);

  return (
    <MainLayout>
      {!!category && (
        <div className="flex items-center space-x-4 pb-8">
          <Link to="/feeds/company">
            <ChevronLeftIcon className="cursor-pointer" />
          </Link>
          <h1 className="text-Gray-1 text-xl font-bold">{category.name}</h1>
        </div>
      )}
      <Feeds categoryId={categoryId} />
    </MainLayout>
  );
};
