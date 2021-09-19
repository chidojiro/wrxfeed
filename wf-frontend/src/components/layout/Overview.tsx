import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
  container: {
    // display: 'flex',
  },
  heading: {

  },
  transactionHeading: {

  },
  lineItem: {

  }
});

function Overview(){
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
      <h2>Overview</h2>
      </div>
      <div className={classes.transactionHeading}>
        <h3>Company transactions</h3>
      </div>
      <div className={classes.lineItem}>


      </div>

    </div>

  );
}

export default Overview;