/* eslint-disable react-hooks/exhaustive-deps */
import MainLayout from '@/common/templates/MainLayout';
import { usePrimaryTarget } from '@/main/hooks/primaryTarget.hook';
import TeamPrimaryTarget from '@/main/organisms/TeamPrimaryTarget';
import * as Sentry from '@sentry/react';
import React from 'react';

const DepartmentsPage: React.FC = () => {
  const { data: target, mutate } = usePrimaryTarget();

  return (
    <MainLayout mainClass="md:col-span-9 lg:col-span-9 xl:col-span-9 max-w-7xl">
      <h1 className="sr-only">Department list</h1>
      {!!target && <TeamPrimaryTarget data={target} onDeleteSuccess={mutate} />}
    </MainLayout>
  );
};

export default Sentry.withProfiler(DepartmentsPage, { name: 'DepartmentsPage' });
