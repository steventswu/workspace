import { Redirect } from 'dva/router';
import './index.less';
import Home from './home';
import { LOGIN } from '../routes';

const checkQueryString = qs => typeof qs === 'string' && qs.includes('oauth_token');

export default () =>
  checkQueryString(window.location.search) ? (
    <Redirect to={{ pathname: LOGIN, search: window.location.search }} />
  ) : (
    <Home />
  );
