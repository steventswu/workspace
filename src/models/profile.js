import { notification } from 'antd';

import Web3 from 'src/services/Web3';
import { queryProfile } from 'src/services/api';
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

        const walletList = yield select(state => state.profile.walletList);

        if (walletList.includes(payload.walletAddress)) {
          return notification.error({ message: 'This address is already added' });
        }

        if (account === payload.walletAddress) {
          yield put({
            type: 'saveWallet',
            payload: { account },
          });
          return;
        }
        notification.error({ message: 'Wallet address does not match' });
      } catch (error) {
        if (error instanceof TypeError) {
          return notification.error({ message: error.message });
        }
      }
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
  },
};
