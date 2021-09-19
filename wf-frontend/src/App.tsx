import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Dashboard from './components/routes/Dashboard';
import {
  DASHBOARD
} from './constants/routes';

function App() {
  return (

      <Router>
        <Switch>
          <Route path={DASHBOARD} exact>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
     

  );
}

export default App;
