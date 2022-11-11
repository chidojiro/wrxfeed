import { Form } from '@/common/components';
import { useFetcher } from '@/common/hooks';
import { FeedApis } from '@/feed/apis';
import { DateRangeFilter, Property } from '@/feed/types';
import { MainLayout } from '@/layout/MainLayout';
import { commentEditorHtmlParser } from '@/main/utils';
import { Entities } from '@/types';
import { EditorState } from 'draft-js';
import React from 'react';
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

  const { insight } = useInsight(insightId);

  const isEdit = !!insight;

  const methods = useForm({
    defaultValues: {
      name: '',
      groupBy: 'DEPARTMENT',
      dateRange: 'year-to-date',
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

  React.useEffect(() => {
    if (isEdit) {
      const getTagValueFromProps = ({ id, name, type }: Property) => `${type}-${id}-${name}`;
      const { dateRange, groupBy, props, name } = insight;

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
        dateRange,
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

    handleSubmit(async (formData: any) => {
      if (isEdit) {
        await InsightApis.update(insight.id, formData);
        if (isDirty) {
          await FeedApis.createComment(insight.feedItem.id, {
            content: parsedContent,
            attachment: data?.attachment,
          });
        }
      } else {
        const insight = await InsightApis.create(formData);
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
      <Form methods={methods} className="flex flex-col gap-6">
        <InsightHeader />
        <InsightCard
          errors={errors}
          onPost={handlePost}
          groupBy={groupBy}
          dateRange={dateRange}
          props={props}
          posting={isSubmitting}
        />
      </Form>
    </MainLayout>
  );
};
