import { Form } from '@/common/components';
import { DateRangeFilter, Property } from '@/feed/types';
import { MainLayout } from '@/layout/MainLayout';
import { Entities } from '@/types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
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
      name: 'Mock Name',
      groupBy: 'DEPARTMENT',
      dateRange: '30-days',
      props: [] as Property[],
      vendors: [] as string[],
      departments: [] as string[],
      categories: [] as string[],
    },
  });
  const { watch, handleSubmit, reset } = methods;

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

  return (
    <MainLayout>
      <Form methods={methods} className="flex flex-col gap-6">
        <InsightHeader />
        <InsightCard
          onPost={() => handleSubmit((data: any) => InsightApis.create(data))()}
          groupBy={groupBy}
          dateRange={dateRange}
          props={props}
        />
      </Form>
    </MainLayout>
  );
};
