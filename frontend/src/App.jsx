import React from 'react';

import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import Cars from './views/backoffice/Cars';
import Guards from './views/backoffice/Guards';
import Providers from './views/backoffice/Providers';
import RegisterCarForm from './views/backoffice/RegisterCarForm';
import Residents from './views/backoffice/Residents';
import Dashboard from './views/Dashboard';
import DisplayEntries from './views/guard/DisplayEntries';
import PlateRecognition from './views/guard/PlateRecognition';
import DisplayResidents from './views/guard/Residents';
import GuardVisitEntries from './views/guard/VisitEntries';
import Login from './views/Login';
import AddVisit from './views/resident/AddVisit';
import ResidentHistory from './views/resident/ResidentHistory';

function Auth({ match }) {
  return (
    <div className="flex flex-col justify-center items-centerw-screen h-screen bg-blue-500">
      <Switch>
        <Route path={`${match.url}/login`}>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

function GuardRoutes({ match }) {
  return (
    <>
      <RouteWrapper exact path={`${match.url}/`} component={PlateRecognition} />
      <RouteWrapper exact path={`${match.url}/display-history`} component={DisplayEntries} />
      <RouteWrapper exact path={`${match.url}/visit-entries`} component={GuardVisitEntries} />
      <RouteWrapper exact path={`${match.url}/display-residents`} component={DisplayResidents} />
    </>
  );
}

function ResidentRoutes({ match }) {
  return (
    <>
      <RouteWrapper exact path={`${match.url}/add-visit`} component={AddVisit} />
      <RouteWrapper exact path={`${match.url}/display-history`} component={ResidentHistory} />
    </>
  );
}

function BackofficeRoutes({ match }) {
  return (
    <>
      <RouteWrapper exact path={`${match.url}/`} component={Dashboard} />
      <RouteWrapper exact path={`${match.url}/display-guards`} component={Guards} />
      <RouteWrapper exact path={`${match.url}/display-residents`} component={Residents} />
      <RouteWrapper exact path={`${match.url}/display-providers`} component={Providers} />
      <RouteWrapper exact path={`${match.url}/display-cars`} component={Cars} />
      <RouteWrapper exact path={`${match.url}/register-car`} component={RegisterCarForm} />
    </>
  );
}

function Main({ match }) {
  return (
    <>
      <Switch>
        <RouteWrapper exact path={`${match.url}/`} component={Dashboard} />
        <Route path={`${match.url}/guardia`} component={GuardRoutes} />
        <Route path={`${match.url}/backoffice`} component={BackofficeRoutes} />
        <Route path={`${match.url}/residente`} component={ResidentRoutes} />
      </Switch>
    </>
  );
}

function RouteWrapper({ component: Component, ...rest }) {
  // source: https://javascript.plainenglish.io/simple-guide-for-layouts-in-react-router-e32b26c12cee
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/app" component={Main} />
        <Redirect to="/auth/login" />
      </Switch>
    </Router>
  );
}
