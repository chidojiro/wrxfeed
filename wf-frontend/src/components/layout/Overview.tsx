import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
  container: {
    // display: 'flex',
    width: '80%',
  },
  heading: {

  },
  transactionHeading: {

  },
  lineItem: {


  },
  lineItemTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineItemInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  lineItemDate: {
    paddingLeft: 18,
  },
  lineItemAmount: {

  },
  lineItemDetail: {
    
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
        <div className={classes.lineItemTitle}>
          <div className={classes.lineItemInfo}>
        <h4>Prfessional Services</h4>
        <text className={classes.lineItemDate}>9/14/2021</text>
        </div>
        <div className={classes.lineItemAmount}>
        <h4>-$10,326.80</h4>
        </div>
        </div>
        <div className={classes.lineItemDetail}>
          <text>Law offices of Lock Miller Schnell</text>
        </div>


      </div>

    </div>

  );
}

export default Overview;