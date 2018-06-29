import { notification } from 'antd';

import Web3 from 'src/services/Web3';
import { queryProfile, updateIdentity } from 'src/services/api';
import { formatAll } from './profile.helper';

export default {
  namespace: 'profile',

  state: {
    transactions: [],
    portfolio: {},
    walletList: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryProfile);
      if (response.error) return;
      yield put({
        type: 'show',
        payload: formatAll(response),
      });
    },
    *validateWallet({ payload }, { call, put, select }) {
      try {
        yield call(Web3.init);
        yield call(Web3.validate);
        const account = yield call(Web3.getAccount);
        const accountSelected = payload.walletAddress.toLowerCase();

        const walletList = yield select(state => state.profile.walletList);

        if (walletList.includes(accountSelected)) {
          return notification.error({ message: 'This address is already added' });
        }

        if (account === accountSelected) {
          return yield put({
            type: 'saveWallet',
            payload: { account },
          });
        }
        notification.error({ message: 'Wallet address does not match' });
      } catch (error) {
        if (error instanceof TypeError) {
          return notification.error({ message: error.message });
        }
      }
    },
    *validateIdentify({ payload }, { call, put }) {
      const identity = yield call(updateIdentity, payload);
      if (identity.error) return;
      yield put({
        type: 'saveIdentity',
        payload,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveWallet(state, { payload }) {
      return {
        ...state,
        walletList: [payload.account, ...state.walletList],
      };
    },
    saveIdentity(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
