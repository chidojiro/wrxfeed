import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import ActivitySearchDialogView from '../../organisms/ActivitySearchDialog';
import { activityFilterState } from '../../states';
import { ActivityFilterModel } from '../../types';

const ActivitySearchDialog: React.VFC = () => {
  const [filter, setFilter] = useRecoilState(activityFilterState);
  const handleSearch: SubmitHandler<ActivityFilterModel> = React.useCallback(
    (data) => {
      setFilter(data);
    },
    [setFilter],
  );
  return <ActivitySearchDialogView values={filter} onSubmit={handleSearch} />;
};

export default ActivitySearchDialog;
