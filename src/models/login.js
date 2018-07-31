import { routerRedux } from 'dva/router';
import * as api from 'src/services/auth';
import Google from 'src/services/Google';
import Twitter from 'src/services/Twitter';
import session from 'src/utils/session';
import redirect from 'src/utils/redirect';
import i18n from 'src/i18n';
import { HOME } from 'src/routes';

const redirectPath = () => redirect.get() || HOME;

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
    *email({ payload }, { call, put }) {
      const response = yield call(api.authenticate, 'normal', {
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
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: false },
        });
        yield put({ type: 'user/destroy' });
        yield put(routerRedux.replace(HOME));
      }
    },
    *googleRedirect(_, { call }) {
      yield call(Google.signIn);
    },
    *google(_, { call, put }) {
      try {
        const info = yield call(Google.getAccessToken);
        const result = yield call(api.authenticate, 'google', info);
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
        yield call(api.validateEmailPermission, payload.access_token);
        const info = yield call(api.validateFacebookToken, payload.access_token);
        const result = yield call(api.authenticate, 'facebook', info);
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
        const result = yield call(api.authenticate, 'twitter', info);
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
