import React from 'react';
import {
  DatePicker as MuiDatePicker,
  DateTimePicker as MuiDateTimePicker,
  DatePickerProps,
  DateTimePickerProps,
} from '@mui/lab';

export const DatePicker = React.forwardRef<unknown, DatePickerProps>(function DatePicker(props) {
  return <MuiDatePicker inputFormat="dd/MM/yyyy" {...props} />;
});

export const DateTimePicker = React.forwardRef<unknown, DateTimePickerProps>(
  function DateTimePicker(props) {
    return <MuiDateTimePicker inputFormat="EEE, d LLL, yyyy h:mm aaa" {...props} />;
  },
);
