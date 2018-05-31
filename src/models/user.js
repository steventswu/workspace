import { routerRedux } from 'dva/router';
import * as api from 'src/services/api';
import { sessionKey } from './login';

export default {
  namespace: 'user',

  state: {},

  effects: {
    *fetchCurrent(_, { call, put }) {
      try {
        const info = JSON.parse(localStorage.getItem(sessionKey));
        if (!info) return;
        const response = yield call(api.queryCurrent, info);
        yield put({ type: 'save', payload: response });
      } catch (e) {
        yield put({ type: 'login/logout' });
      }
    },
    *verifyEmail({ payload }, { call, put }) {
      const { error } = yield call(api.postEmailVerification, payload);
      if (error) {
        yield put(routerRedux.replace('/user/login'));
      }
    },
    *updateInfo(_, { call, put, select }) {
      try {
        const info = JSON.parse(localStorage.getItem(sessionKey));
        const walletAddress = yield select(state => state.token.walletAddress);
        yield call(
          api.postMember,
          { walletAddress, type: api.POST_MEMBER_TYPE.WALLET_ADDRESS },
          info
        );
        yield put({ type: 'saveWalletAddress', payload: { walletAddress } });
        yield call(
          api.postMember,
          { walletAddress, type: api.POST_MEMBER_TYPE.BUY_TERMS_LOG },
          info
        );
      } catch (e) {
        yield put({ type: 'login/logout' });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveWalletAddress(state, action) {
      return {
        ...state,
        walletAddressMap: {
          ...state.walletAddressMap,
          [action.payload.walletAddress]: action.payload,
        },
      };
    },
    destroy() {
      return {};
    },
  },
};
