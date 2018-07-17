import { routerRedux } from 'dva/router';
import {
  getAuthInfo,
  identityKey,
  validateFacebookToken,
  validateEmailPermission,
} from 'src/services/api';
import Google from 'src/services/Google';
import Twitter from 'src/services/Twitter';
import session from 'src/utils/session';
import redirect from 'src/utils/redirect';
import i18n from 'src/i18n';

const redirectPath = () => redirect.get() || '/';

export default {
  namespace: 'login',

  state: { status: false },

  effects: {
    *redirect({ payload, force }, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: { status: 'ok' },
      });
      session.set(payload);
      const path = redirectPath();
      if (force) {
        window.location.href = [window.location.origin, path].join('');
        return;
      }
      yield put(routerRedux.replace(path));
    },
    *login({ payload }, { call, put }) {
      const response = yield call(getAuthInfo, 'normal', {
        email: payload.email,
        password: btoa(payload.password),
      });
      if (response.error) {
        return yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'error',
            message: i18n.t(`error:code.login.${response.status}`),
          },
        });
      }
      yield put({ type: 'redirect', payload: response });
    },
    *logout(_, { put }) {
      try {
        session.destroy();
        localStorage.removeItem(identityKey);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: false },
        });
        yield put({ type: 'user/destroy' });
        yield put(routerRedux.replace('/'));
      }
    },
    *googleRedirect(_, { call }) {
      yield call(Google.signIn);
    },
    *google(_, { call, put }) {
      try {
        const info = yield call(Google.getAccessToken);
        const result = yield call(getAuthInfo, 'google', info);
        yield put({ type: 'redirect', payload: result });
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
        yield put({ type: 'redirect', payload: result });
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
        yield put({ type: 'redirect', payload: result, force: true });
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
