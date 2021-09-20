import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DateTimePicker } from '../../../common/atoms/DatePicker';
import { ActivityFormModel } from '../../types';
import Textarea from '../../../common/atoms/Textarea';
import ActionButtons from '../../../common/atoms/ActionButtons';
import { useNavUtils } from '../../../common/hooks';
import LoadingButton from '../../../common/atoms/LoadingButton';
import ActivityTagSelect from '../../containers/ActivityTagSelect';
import { emptyStringOrNumber } from '../../../common/utils';
import { useFormErrorHandler } from '../../../error';

const schema = yup.object({
  content: yup.string().required('This field is required'),
  income: yup.lazy(emptyStringOrNumber),
  outcome: yup.lazy(emptyStringOrNumber),
  time: yup.date(),
  tags: yup.array().of(yup.string()),
});

export interface ActivityFormProps {
  defaultValues: ActivityFormModel;
  onSubmit: SubmitHandler<ActivityFormModel>;
}

const ActivityForm: React.VFC<ActivityFormProps> = ({ defaultValues, onSubmit }) => {
  const { getLinkProps } = useNavUtils();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<ActivityFormModel>({
    defaultValues,
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });
  const handleFormError = useFormErrorHandler<ActivityFormModel>();
  const handleFormSubmit: SubmitHandler<ActivityFormModel> = React.useCallback(
    async (data) => {
      try {
        await onSubmit(data);
      } catch (error) {
        handleFormError(error, setError, 'Please correct your inputs');
      }
    },
    [onSubmit, handleFormError, setError],
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                label="Content"
                required
                error={!!errors.content}
                helperText={errors.content?.message}
                InputProps={{
                  inputComponent: Textarea,
                }}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="tags"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <ActivityTagSelect label="Tags" onChange={(e, v) => onChange(v)} freeSolo {...rest} />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                label="Time"
                // error={!!errors.time}
                // helperText={errors.time?.message}
                {...field}
                renderInput={(params) => <TextField {...params} />}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="income"
            control={control}
            render={({ field }) => (
              <TextField
                label="Income"
                type="number"
                error={!!errors.income}
                helperText={errors.income?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="outcome"
            control={control}
            render={({ field }) => (
              <TextField
                label="Outcome"
                type="number"
                error={!!errors.outcome}
                helperText={errors.outcome?.message}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
      <ActionButtons>
        <Button variant="contained" {...getLinkProps()}>
          Cancel
        </Button>
        <LoadingButton loading={isSubmitting} type="submit" variant="contained" color="primary">
          Submit
        </LoadingButton>
      </ActionButtons>
    </form>
  );
};

export default ActivityForm;
