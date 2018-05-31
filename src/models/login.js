import { routerRedux } from 'dva/router';
import { getAuthInfo } from 'src/services/api';
import Google from 'src/services/Google';
import Facebook from 'src/services/Facebook';
import Twitter from 'src/services/Twitter';
import { setAuthority } from 'src/utils/authority';
import { reloadAuthorized } from 'src/utils/Authorized';

const redirectPath = '/';
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
    *logout(_, { put }) {
      try {
        localStorage.removeItem(sessionKey);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        yield put({ type: 'user/destroy' });
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
          meta: result,
        });
        reloadAuthorized();
        yield put(routerRedux.replace(redirectPath));
      } catch (error) {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'error', error: error.message },
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
