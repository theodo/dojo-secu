import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';

const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));

const routes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact path="/" component={Profile} />
      <Route path="/login" component={Login} />
    </Switch>
  </Suspense>
);

export default routes;
