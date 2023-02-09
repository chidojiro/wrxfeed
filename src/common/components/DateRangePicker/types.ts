export type ViewableDate = {
  date: Date;
  inMonth: 'PREVIOUS_MONTH' | 'CURRENT_MONTH' | 'NEXT_MONTH';
};

export type DateRangePickerValue = [Date, Date];
