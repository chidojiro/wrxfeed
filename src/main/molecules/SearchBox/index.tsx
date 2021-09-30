import React, { ChangeEvent, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import { Paper, PaperProps } from '@mui/material';
import { Gray } from '@theme/colors';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CommentFormModel } from '@main/types';
import SearchInput from '@main/atoms/SearchInput';
import { SearchIcon } from '@assets/index';

const useStyles = makeStyles(() => ({
  container: () => ({
    display: 'flex',
    flexGrow: 1,
    minWidth: '70%',
    backgroundColor: '#F6F7F3',
    borderRadius: 100,
    padding: '12px 6px 12px 8px',
    alignItems: 'flex-end',
    border: '1px solid #F6F7F3',
    // transition: 'all 300ms ease-in-out',
    '&.focus': {
      borderColor: Gray[2],
      backgroundColor: '#fff',
    },
  }),
}));

const Container: React.VFC<PaperProps> = ({ children }) => {
  const classes = useStyles();
  const { focused } = useFormControl() || {};

  return (
    <Paper className={`${classes.container} ${focused && 'focus'}`} elevation={0}>
      {children}
    </Paper>
  );
};

export interface CommentFormProps {
  onSubmit: SubmitHandler<CommentFormModel>;
  placeholder?: string;
  style?: React.CSSProperties;
}

const CommentBox: React.VFC<CommentFormProps> = ({
  onSubmit,
  placeholder = 'Search for teammates',
  style = {},
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitted },
  } = useForm<CommentFormModel>({
    defaultValues: {
      content: '',
    },
  });

  useEffect(() => {
    if (isSubmitted) {
      reset();
    }
  }, [isSubmitted, reset]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    console.log('Check handleSearch', event);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={style}>
      <FormControl sx={{ flexDirection: 'row', marginBottom: 0 }}>
        <Container onSubmit={handleSubmit(onSubmit)}>
          <SearchIcon style={{ alignSelf: 'center', marginLeft: '10px' }} />
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <SearchInput
                {...field}
                onEnterPress={handleSubmit(onSubmit)}
                onSearch={handleSearch}
                placeholder={placeholder}
              />
            )}
          />
        </Container>
      </FormControl>
    </form>
  );
};

export default CommentBox;
