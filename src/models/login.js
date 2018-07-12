import { routerRedux } from 'dva/router';
import {
  getAuthInfo,
  sessionKey,
  identityKey,
  validateFacebookToken,
  validateEmailPermission,
} from 'src/services/api';
import Google from 'src/services/Google';
import Twitter from 'src/services/Twitter';
import { setAuthority } from 'src/utils/authority';
import { reloadAuthorized } from 'src/utils/Authorized';

const redirectPath = '/';

const loginHandler = data => {
  setAuthority('user');
  localStorage.setItem(sessionKey, JSON.stringify(data));
  reloadAuthorized();
};

export default {
  namespace: 'login',

  state: { status: false },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(getAuthInfo, 'normal', {
        email: payload.email,
        password: btoa(payload.password),
      });
      if (response.error) {
        return yield put({
          type: 'changeLoginStatus',
          payload: { status: 'error', message: 'Account or password is incorrect' },
        });
      }
      yield put({
        type: 'changeLoginStatus',
        payload: { status: 'ok' },
      });
      loginHandler(response);
      yield put(routerRedux.push(redirectPath));
    },
    *logout(_, { put }) {
      try {
        localStorage.removeItem(sessionKey);
        localStorage.removeItem(identityKey);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: false },
        });
        yield put({ type: 'user/destroy' });
        setAuthority('guest');
        reloadAuthorized();
        yield put(routerRedux.push(redirectPath));
      }
    },
    *googleRedirect(_, { call }) {
      yield call(Google.signIn);
    },
    *google(_, { call, put }) {
      try {
        const info = yield call(Google.getAccessToken);
        const result = yield call(getAuthInfo, 'google', info);
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'ok' },
        });
        loginHandler(result);
        yield put(routerRedux.replace(redirectPath));
      } catch (error) {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'error', error: error.message },
        });
      }
    },
    *facebook({ payload }, { call, put }) {
      try {
        yield call(validateEmailPermission, payload.access_token);
        const info = yield call(validateFacebookToken, payload.access_token);
        const result = yield call(getAuthInfo, 'facebook', info);
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'ok' },
        });
        loginHandler(result);
        yield put(routerRedux.replace(redirectPath));
      } catch (e) {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'fbError', message: e.message },
        });
      }
    },
    *twitterRedirect(_, { call }) {
      const authUrl = yield call(Twitter.getRequestToken, window.location.href);
      window.location = authUrl;
    },
    *twitter({ payload }, { call, put }) {
      try {
        const info = yield call(Twitter.getAccessToken, payload);
        const result = yield call(getAuthInfo, 'twitter', info);
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'ok' },
        });
        loginHandler(result);
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
    changeLoginStatus(_, { payload }) {
      return payload;
    },
  },
};
