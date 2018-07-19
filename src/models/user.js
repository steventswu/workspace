import { routerRedux } from 'dva/router';
import * as api from 'src/services/api';
import { UNVERIFIED } from 'src/utils/status';
import { Promise } from 'core-js';

export default {
  namespace: 'user',

  state: {},

  effects: {
    *fetchCurrent(_, { call, put }) {
      try {
        const response = yield call(api.queryCurrent);
        yield put({ type: 'save', payload: response });
      } catch (e) {
        console.warn(e.message);
      }
    },
    *verifyEmail({ payload }, { call, put }) {
      const { error } = yield call(api.postEmailVerification, payload);
      if (error) {
        yield put(routerRedux.replace('/user/login'));
      }
    },
    *updateInfo({ payload: { walletAddress } }, { call, put }) {
      try {
        yield call(api.updateMember, api.UPDATE_MEMBER_TYPE.WALLET_ADDRESS, { walletAddress });
        yield put({
          type: 'saveWalletAddress',
          payload: { walletAddress, isVerified: UNVERIFIED },
        });
        yield call(api.updateMember, api.UPDATE_MEMBER_TYPE.BUY_TERMS_LOG, { walletAddress });
      } catch (e) {
        yield put({ type: 'login/logout' });
      }
    },
    *forgotPassword({ payload }, { call, put }) {
      try {
        yield call(() => Promise.resolve(), payload.email);
        yield put(routerRedux.replace('/user/login'));
      } catch (error) {
        console.error(error);
      }
    },
    *changePassword({ payload }, { call, put }) {
      try {
        yield call(() => Promise.resolve(), payload.password);
        yield put(routerRedux.replace('/user/login'));
      } catch (error) {
        console.error(error);
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
