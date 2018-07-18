import React from 'react';
import { Redirect } from 'dva/router';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n';

import HomePage from './home/HomePage';

const checkQueryString = qs => typeof qs === 'string' && qs.includes('oauth_token');

export default () =>
  checkQueryString(window.location.search) ? (
    <Redirect to={{ pathname: '/user/login', search: window.location.search }} />
  ) : (
    <I18nextProvider i18n={i18n}>
      <HomePage />
    </I18nextProvider>
  );
