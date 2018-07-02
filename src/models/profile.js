import { notification } from 'antd';

import Web3 from 'src/services/Web3';
import { queryProfile, updateIdentity, updateMember, UPDATE_MEMBER_TYPE } from 'src/services/api';
import { CONTRACT } from 'src/utils/contract';
import { formatAll } from './profile.helper';

export default {
  namespace: 'profile',

  state: {
    transactions: [],
    portfolio: {},
    walletList: [],
    identity: {},
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
      const identity = yield call(updateIdentity, payload.formData);
      if (identity.error) return;
      yield put({
        type: 'saveIdentity',
        payload,
      });
    },
    *redeem({ payload }, { call }) {
      try {
        yield call(Web3.init);
        yield call(Web3.validate);

        const txHash = yield call(Web3.redeem, payload);
        yield call(updateMember, UPDATE_MEMBER_TYPE.TRANSACTION, {
          contractName: CONTRACT[payload.cap].key,
          contractAddress: CONTRACT[payload.cap].address,
          transactionType: 'sell',
          transactionHash: txHash,
        });
        notification.info({ message: 'Transaction Success', description: txHash });
      } catch (error) {
        console.error(error);
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
    saveIdentity(state, { payload }) {
      return {
        ...state,
        identity: payload.formValues,
      };
    },
  },
};
