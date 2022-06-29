/* eslint-disable react-hooks/exhaustive-deps */
import * as Sentry from '@sentry/react';
import React from 'react';
import { useParams } from 'react-router-dom';

import MainLayout from '@/common/templates/MainLayout';
import { usePrimaryTarget } from '@/main/hooks/primaryTarget.hook';
import TopCategories from '@/main/organisms/TopCategories';
import TeamPrimaryTarget from '@/main/organisms/TeamPrimaryTarget';
import TargetSummary from '@/main/organisms/TargetSummary';
import TransactionList from '@/main/organisms/TransactionList';

const DepartmentsPage: React.FC = () => {
  const { data: target, mutate } = usePrimaryTarget();

  const { id: departmentIdParam } = useParams() as Record<string, string>;

  const departmentId = +departmentIdParam;

  if (!target) return null;

  return (
    <MainLayout mainClass="px-2 md:col-span-9 lg:col-span-9 xl:col-span-9 max-w-7xl">
      <h1 className="sr-only">Department list</h1>
      <div className="grid grid-cols-9 gap-6">
        <TeamPrimaryTarget
          className="col-span-9 lg:col-span-5"
          data={target}
          onDeleteSuccess={mutate}
        />
        <div className="col-span-9 lg:col-span-4 flex flex-col gap-6">
          {!!target.department && <TargetSummary department={target.department} />}
          <TopCategories departmentId={departmentId} />
        </div>
      </div>
      <TransactionList departmentId={departmentId} className="mt-6" />
    </MainLayout>
  );
};

export default Sentry.withProfiler(DepartmentsPage, { name: 'DepartmentsPage' });
