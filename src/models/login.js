import { routerRedux } from 'dva/router';
import { fakeAccountLogin, getAuthInfo } from '../services/api';
import Google from '../services/Auth/Google';
import Facebook from '../services/Auth/Facebook';
import Twitter from '../services/Auth/Twitter';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
    *google(_, { call, put }) {
      try {
        const info = yield call(Google.getGoogleToken);
        const result = yield call(getAuthInfo, 'google', info);
        yield put({
          type: 'changeLoginStatus',
          payload: result,
        });
        reloadAuthorized();
        yield put(routerRedux.replace('/'));
      } catch (error) {
        console.warn(error);
      }
    },
    *facebook(_, { call, put }) {
      try {
        const info = yield call(Facebook.getFBToken);
        const result = yield call(getAuthInfo, 'facebook', info);
        yield put({
          type: 'changeLoginStatus',
          payload: result,
        });
        reloadAuthorized();
        yield put(routerRedux.replace('/'));
      } catch (e) {
        console.warn(e);
      }
    },
    *twitterRedirect(_, { call }) {
      const authUrl = yield call(Twitter.getRequestToken, window.location.origin);
      window.location = authUrl;
    },
    *twitter(_, { call, put }) {
      try {
        const info = yield call(Twitter.getAccessToken, window.location.search);
        const result = yield call(getAuthInfo, 'twitter', info);
        yield put({
          type: 'changeLoginStatus',
          payload: result,
        });
        reloadAuthorized();
        // force redirect the whole page to eliminate query strings
        window.location.href = window.location.origin;
      } catch (e) {
        console.warn(e);
      }
    },
  },

  reducers: {
    changeLoginStatus(_, { payload }) {
      setAuthority(payload.currentAuthority || 'user');
      return {
        memberId: payload.memberId,
        jwt: payload.jwt,
      };
    },
  },
};
