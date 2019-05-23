import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';

const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));
const Chat = lazy(() => import('./pages/Chat'));

const routes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact path="/" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/chat/:id" component={Chat} />
    </Switch>
  </Suspense>
);

export default routes;
