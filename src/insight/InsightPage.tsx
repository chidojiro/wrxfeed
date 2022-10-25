import { Form } from '@/common/components';
import { DateRangeFilter, Property } from '@/feed/types';
import { MainLayout } from '@/layout/MainLayout';
import { Entities } from '@/types';
import { watch } from 'fs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { InsightCard } from './InsightCard';
import { InsightHeader } from './InsightHeader';

export type InsightPageProps = {
  //
};

export const InsightPage = ({}: InsightPageProps) => {
  const methods = useForm({ defaultValues: { groupBy: '', dateRange: '30-days', props: [] } });
  const { watch } = methods;

  const dateRange = watch('dateRange') as DateRangeFilter;
  const groupBy = watch('groupBy') as Entities;
  const props = watch('props') as Property[];
  console.log(props);

  return (
    <MainLayout>
      <Form methods={methods} className="flex flex-col gap-6">
        <InsightHeader />
        <InsightCard groupBy={groupBy} dateRange={dateRange} props={props} />
      </Form>
    </MainLayout>
  );
};
