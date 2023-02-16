import { Form, ListLoader } from '@/common/components';
import { useMountEffect } from '@/common/hooks';
import { FeedApis } from '@/feed/apis';
import { DateRangeFilter, Property } from '@/feed/types';
import { MainLayout } from '@/layout/MainLayout';
import { commentEditorHtmlParser } from '@/main/utils';
import { identifyMixPanelUserProfile } from '@/mixpanel/useMixPanel';
import { useProfile } from '@/profile/useProfile';
import { Entities } from '@/types';
import dayjs from 'dayjs';
import { EditorState } from 'draft-js';
import mixpanel from 'mixpanel-browser';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { InsightApis } from './apis';
import { InsightCard } from './InsightCard';
import { InsightHeader } from './InsightHeader';
import { useInsight } from './useInsight';

export type InsightPageProps = {
  //
};

export const InsightPage = ({}: InsightPageProps) => {
  const { insightId } = useParams() as any;

  const { insight, isInitializingInsight } = useInsight(insightId);

  const isEdit = !!insight;

  const methods = useForm({
    defaultValues: {
      name: '',
      groupBy: 'DEPARTMENT',
      dateRange: 'year-to-date' as DateRangeFilter,
      props: [] as Property[],
      vendors: [] as string[],
      departments: [] as string[],
      categories: [] as string[],
    },
  });
  const {
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const history = useHistory();

  const { profile } = useProfile();

  useMountEffect(() => {
    mixpanel.track('Insight Page View', {
      user_id: profile?.id,
      email: profile?.email,
      company_id: profile?.company?.id,
    });
    identifyMixPanelUserProfile(profile);
  });

  useEffect(() => {
    if (isEdit) {
      const getTagValueFromProps = ({ id, name, type }: Property) => `${type}-${id}-${name}`;
      const { dateRange, groupBy, props, name, from, to } = insight;

      const {
        vendorProps = [],
        categoryProps = [],
        departmentProps = [],
      } = props.reduce(
        (acc, cur) => {
          return {
            vendorProps:
              cur.type === 'VENDOR'
                ? [...acc.vendorProps, getTagValueFromProps(cur)]
                : acc.vendorProps,
            categoryProps:
              cur.type === 'CATEGORY'
                ? [...acc.categoryProps, getTagValueFromProps(cur)]
                : acc.categoryProps,
            departmentProps:
              cur.type === 'DEPARTMENT'
                ? [...acc.departmentProps, getTagValueFromProps(cur)]
                : acc.departmentProps,
          };
        },
        {
          vendorProps: [] as string[],
          categoryProps: [] as string[],
          departmentProps: [] as string[],
        },
      ) ?? {};

      reset({
        dateRange:
          dateRange === 'custom' && from && to ? [new Date(from), new Date(to)] : dateRange,
        groupBy,
        props,
        name,
        vendors: vendorProps,
        categories: categoryProps,
        departments: departmentProps,
      });
    }
  }, [insight, isEdit, reset]);

  const dateRange = watch('dateRange') as DateRangeFilter;
  const groupBy = watch('groupBy') as Entities;
  const props = watch('props') as Property[];

  const handlePost = (data: any) => {
    const contentState = data?.content as EditorState;
    const isDirty = contentState.getCurrentContent().hasText() || !!data?.attachment;

    const parsedContent = commentEditorHtmlParser(contentState.getCurrentContent());

    handleSubmit(async ({ dateRange, ...restFormData }: any) => {
      if (isEdit) {
        await InsightApis.update(insight.id, {
          ...restFormData,
          dateRange: typeof dateRange === 'string' ? dateRange : 'custom',
          from: Array.isArray(dateRange) ? dayjs(dateRange[0]).format('YYYY-MM-DD') : undefined,
          to: Array.isArray(dateRange) ? dayjs(dateRange[1]).format('YYYY-MM-DD') : undefined,
        });
        if (isDirty) {
          await FeedApis.createComment(insight.feedItem.id, {
            content: parsedContent,
            attachment: data?.attachment,
          });
        }
      } else {
        const insight = await InsightApis.create({
          ...restFormData,
          dateRange: typeof dateRange === 'string' ? dateRange : 'custom',
          from: Array.isArray(dateRange) ? dayjs(dateRange[0]).format('YYYY-MM-DD') : undefined,
          to: Array.isArray(dateRange) ? dayjs(dateRange[1]).format('YYYY-MM-DD') : undefined,
        });
        if (isDirty) {
          await FeedApis.createComment(insight.feedItem.id, {
            content: parsedContent,
            attachment: data?.attachment,
          });
        }
        history.push(`/feed/${insight.feedItem.id}`);
      }
    })();
  };

  return (
    <MainLayout>
      <ListLoader loading={isInitializingInsight}>
        <Form methods={methods} className="flex flex-col gap-6">
          <InsightHeader />
          <InsightCard
            errors={errors}
            onPost={handlePost}
            groupBy={groupBy}
            dateRange={dateRange}
            props={props}
            posting={isSubmitting}
            initializing={isInitializingInsight}
          />
        </Form>
      </ListLoader>
    </MainLayout>
  );
};
