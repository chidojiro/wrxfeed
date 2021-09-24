import React from 'react';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Chip from '../../../common/atoms/Chip';
import { formatCurrency } from '../../../common/utils';

export interface RevenueProps {
  income: number;
  outcome: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    backgroundColor: (props: RevenueProps) =>
      props.income > props.outcome ? theme.palette.success.main : theme.palette.error.main,
  },
  incomeText: {
    color: theme.palette.success.main,
  },
  outcomeText: {
    color: theme.palette.error.main,
  },
  popover: {
    padding: theme.spacing(1),
  },
}));

const Revenue: React.VFC<RevenueProps> = (props) => {
  const { income, outcome } = props;
  const classes = useStyles(props);
  const label = formatCurrency(Math.abs(income - outcome));
  const it = formatCurrency(income);
  const ot = formatCurrency(outcome);
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'revenue-popover' : undefined;
  const handleClick: React.MouseEventHandler = React.useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Chip label={label} className={classes.chip} onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography variant="body2" className={classes.popover}>
          <span className={classes.incomeText}>{it}</span>
          &nbsp;/&nbsp;
          <span className={classes.outcomeText}>{ot}</span>
        </Typography>
      </Popover>
    </>
  );
};

export default Revenue;
