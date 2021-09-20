import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ActivityFormModel } from '../../types';
import SubLayout from '../../../common/templates/SubLayout';
import ActivityForm from '../../organisms/ActivityForm';
import { useApi } from '../../../api';
import { useNavUtils } from '../../../common/hooks';

const defaultValues: ActivityFormModel = {
  content: '',
  tags: [],
  time: new Date(),
  income: '',
  outcome: '',
};

const AddActivityPage: React.VFC = () => {
  const api = useApi();
  const { redirect } = useNavUtils();
  const handleSubmit: SubmitHandler<ActivityFormModel> = React.useCallback(
    async (data) => {
      await api.addActivity(data);
      redirect('/');
    },
    [api, redirect],
  );

  return (
    <SubLayout title="Add Activity">
      <ActivityForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </SubLayout>
  );
};

export default AddActivityPage;
