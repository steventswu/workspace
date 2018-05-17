import React from 'react';
import { Link, Redirect } from 'dva/router';

const checkQueryString = qs => typeof qs === 'string' && qs.includes('oauth_token');

const Home = () => (
  <React.Fragment>
    <Link to="/user/login">Login</Link>
    <br />
    <Link to="/app">Dashboard</Link>
  </React.Fragment>
);

export default () =>
  checkQueryString(window.location.search) ? <Redirect to="/user/login" /> : <Home />;
