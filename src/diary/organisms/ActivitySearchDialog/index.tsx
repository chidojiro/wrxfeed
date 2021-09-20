import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import FilterListIcon from '@mui/icons-material/FilterList';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DatePicker } from '../../../common/atoms/DatePicker';
import TimeRangeSelect from '../../atoms/TimeRangeSelect';
import { TimeRange, ActivityFilterModel } from '../../types';
import ActionButtons from '../../../common/atoms/ActionButtons';
import ActivityTagSelect from '../../containers/ActivityTagSelect';

export interface ActivitySearchDialogViewProps {
  values: ActivityFilterModel;
  onSubmit: SubmitHandler<ActivityFilterModel>;
}

const ActivitySearchDialog: React.VFC<ActivitySearchDialogViewProps> = ({ values, onSubmit }) => {
  const [open, setOpen] = React.useState(false);
  const { control, handleSubmit, watch, reset } = useForm<ActivityFilterModel>({
    defaultValues: values,
  });
  const timeRange = watch('timeRange');
  const handleOpenDialog = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleCloseDialog = React.useCallback(() => {
    setOpen(false);
  }, []);
  const handleFormSubmit: SubmitHandler<ActivityFilterModel> = React.useCallback(
    (data) => {
      onSubmit(data);
      setOpen(false);
    },
    [onSubmit],
  );
  const handleReset = React.useCallback(() => {
    reset();
  }, [reset]);

  return (
    <>
      <IconButton color="default" size="small" onClick={handleOpenDialog}>
        <FilterListIcon />
      </IconButton>
      <Dialog open={open} onClose={handleCloseDialog} keepMounted>
        <DialogTitle>Search activities</DialogTitle>
        <DialogContent>
          <form id="activitySearchForm" onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Controller
                  name="text"
                  control={control}
                  render={({ field }) => <TextField label="Text" {...field} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field: { onChange, ...rest } }) => (
                    <ActivityTagSelect label="Tags" onChange={(e, v) => onChange(v)} {...rest} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="timeRange"
                  control={control}
                  render={({ field }) => <TimeRangeSelect label="Time range" {...field} />}
                />
              </Grid>
              {timeRange === TimeRange.Custom && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="from"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          label="From"
                          {...field}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="to"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          label="To"
                          {...field}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <ActionButtons>
            <Button size="small" variant="contained" onClick={handleReset}>
              Reset
            </Button>
            <Button
              type="submit"
              form="activitySearchForm"
              size="small"
              variant="contained"
              onClick={handleCloseDialog}
              color="primary"
            >
              Search
            </Button>
          </ActionButtons>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActivitySearchDialog;
