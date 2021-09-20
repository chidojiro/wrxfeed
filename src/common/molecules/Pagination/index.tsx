import React from 'react';
import { Theme } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import MuiPagination, { PaginationProps } from '@mui/material/Pagination';

const Pagination = withStyles((theme: Theme) => ({
  root: {
    '& .MuiPaginationItem-page': {
      backgroundColor: theme.palette.background.paper,
    },
    '& .Mui-selected': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
}))((props: PaginationProps) => (
  <MuiPagination
    siblingCount={0}
    boundaryCount={2}
    variant="outlined"
    shape="rounded"
    size="small"
    {...props}
  />
));

export default Pagination;
