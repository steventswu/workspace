import { routerRedux } from 'dva/router';
import { patchMember, queryCurrent, verifyEmail } from '../services/user';
import { sessionKey } from './login';

export default {
  namespace: 'user',

  state: {},

  effects: {
    *fetchCurrent(_, { call, put }) {
      try {
        const info = JSON.parse(localStorage.getItem(sessionKey));
        const response = yield call(queryCurrent, info);
        yield put({
          type: 'save',
          payload: response,
        });
      } catch (e) {
        if (e instanceof TypeError) return;
        yield put({ type: 'login/logout' });
      }
    },
    *verify({ payload }, { call, put }) {
      const { error } = yield call(verifyEmail, payload);
      if (error) {
        yield put(routerRedux.replace('/user/login'));
      }
    },
    *updateWalletAddress({ payload }, { call, put }) {
      try {
        const info = JSON.parse(localStorage.getItem(sessionKey));
        yield call(patchMember, payload.walletAddress, info);
        yield put({
          type: 'saveWalletAddress',
          payload,
        });
      } catch (e) {
        yield put({ type: 'login/logout' });
      }
    },
  },

  reducers: {
    save(state, action) {
      return action.payload;
    },
    saveWalletAddress(state, action) {
      return {
        ...state,
        walletAddress: action.payload.walletAddress,
      };
    },
    destroy() {
      return {};
    },
  },
};
