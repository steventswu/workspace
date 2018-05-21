import { routerRedux } from 'dva/router';
import { getAuthInfo } from '../services/api';
import Google from '../services/Auth/Google';
import Facebook from '../services/Auth/Facebook';
import Twitter from '../services/Auth/Twitter';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

const redirectPath = '/app';
export const sessionKey = 'tixguru:session';

export default {
  namespace: 'login',

  state: { status: false },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(getAuthInfo, 'normal', {
        email: payload.email,
        password: btoa(payload.password),
      });
      yield put({
        type: 'changeLoginStatus',
        payload: { status: 'ok' },
        meta: response,
      });
      reloadAuthorized();
      yield put(routerRedux.push(redirectPath));
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
        localStorage.removeItem(sessionKey);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push({ pathname: '/user/login' }));
      }
    },
    *google(_, { call, put }) {
      try {
        const info = yield call(Google.getGoogleToken);
        const result = yield call(getAuthInfo, 'google', info);
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'ok' },
          meta: result,
        });
        reloadAuthorized();
        yield put(routerRedux.replace(redirectPath));
      } catch (error) {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'error' },
        });
      }
    },
    *facebook(_, { call, put }) {
      try {
        const info = yield call(Facebook.getFBToken);
        const result = yield call(getAuthInfo, 'facebook', info);
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'ok' },
          meta: result,
        });
        reloadAuthorized();
        yield put(routerRedux.replace(redirectPath));
      } catch (e) {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'error' },
        });
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
          payload: { status: 'ok' },
          meta: result,
        });
        reloadAuthorized();
        // force redirect the whole page to eliminate query strings
        window.location.href = [window.location.origin, redirectPath].join('');
      } catch (e) {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'error' },
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(_, { payload, meta }) {
      setAuthority(payload.currentAuthority || 'user');
      if (meta) {
        localStorage.setItem(
          sessionKey,
          JSON.stringify({
            memberId: meta.memberId,
            jwt: meta.jwt,
          })
        );
      }
      return { status: payload.status };
    },
  },
};
