import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { classicNameResolver } from 'typescript';
import Dashboard from './components/routes/Dashboard';
import {
  DASHBOARD
} from './constants/routes';
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
  container: {
    maxWidth: 1440,

  }
})


function App() {
  const classes = useStyles();

  return (

      <Router>
        <div className={classes.container}>
        <Switch>
          <Route path={DASHBOARD} exact>
            <Dashboard />
          </Route>
        </Switch>
        </div>
      </Router>
     

  );
}

export default App;
