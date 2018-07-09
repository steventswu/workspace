import { notification } from 'antd';

import Web3 from 'src/services/Web3';
import {
  queryProfile,
  updateIdentity,
  updateMember,
  UPDATE_MEMBER_TYPE,
  postWhitelist,
} from 'src/services/api';
import { CONTRACT } from 'src/utils/contract';
import { PENDING } from 'src/utils/status';
import { formatErrorMessage } from 'src/utils/error';
import { routerRedux } from 'dva/router';
import { formatAll } from './profile.helper';

export default {
  namespace: 'profile',

  state: {
    transactions: [],
    portfolio: {},
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

        const walletList = yield select(state =>
          Object.values(state.user.walletAddressMap).map(w => w.walletAddress)
        );

        if (walletList.includes(accountSelected)) {
          return notification.error({ message: 'This address is already added' });
        }

        if (account === accountSelected) {
          yield put({
            type: 'submitWalletValidation',
            payload: { account },
          });
          return yield put({
            type: 'user/saveWalletAddress',
            payload: {
              walletAddress: accountSelected,
              isVerified: PENDING,
            },
          });
        }
        notification.error({ message: 'Wallet address does not match' });
      } catch (error) {
        if (error instanceof TypeError) {
          return notification.error({ message: error.message });
        }
      }
    },
    *submitWalletValidation({ payload }, { call }) {
      yield call(postWhitelist, payload.account);
    },
    *validateIdentify({ payload }, { call, put }) {
      const identity = yield call(updateIdentity, payload.formData);
      if (identity.error) return;
      yield put({
        type: 'saveIdentity',
        payload,
      });
    },
    *redeem({ payload }, { call, put }) {
      try {
        yield call(Web3.init);
        yield call(Web3.validate);
        const account = yield call(Web3.getAccount);

        if (account.toLowerCase() !== payload.address.toLowerCase()) {
          throw new TypeError('Wallet address does not match');
        }

        const txHash = yield call(Web3.redeem, payload);
        yield call(updateMember, UPDATE_MEMBER_TYPE.TRANSACTION, {
          contractName: CONTRACT[payload.cap].key,
          contractAddress: CONTRACT[payload.cap].address,
          transactionType: 'sell',
          transactionHash: txHash,
        });
        notification.info({ message: 'Transaction Success', description: txHash });
        yield put(routerRedux.replace('/profile'));
      } catch (error) {
        if (error instanceof TypeError) {
          return notification.error({ message: error.message });
        }
        if (error.message.includes('ethjs')) {
          window.error = error;
          return notification.error({ message: formatErrorMessage(error.message) });
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
    saveIdentity(state, { payload }) {
      return {
        ...state,
        identity: payload.formValues,
      };
    },
  },
};
