import React from 'react';
import { Redirect } from 'dva/router';
import Home from './Home';

const checkQueryString = qs => typeof qs === 'string' && qs.includes('oauth_token');

export default () =>
  checkQueryString(window.location.search) ? (
    <Redirect to={{ pathname: '/user/login', search: window.location.search }} />
  ) : (
    <Home />
  );
