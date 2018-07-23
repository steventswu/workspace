import { notification } from 'antd';

import Web3 from 'src/services/Web3';
import * as api from 'src/services/members';
import { CONTRACT } from 'src/utils/contract';
import { PENDING } from 'src/utils/status';
import { formatErrorMessage } from 'src/utils/error';
import { getWalletList } from 'src/selectors/profile';
import { routerRedux } from 'dva/router';
import i18n from 'src/i18n';
import * as format from './profile.helper';

export default {
  namespace: 'profile',

  state: {
    transactions: [],
    portfolio: [],
    identity: {},
  },

  effects: {
    *fetchProfile(_, { call, put }) {
      try {
        const response = yield call(api.fetchProfile);
        if (response.error) return;
        yield put({
          type: 'show',
          payload: format.all(response),
        });
      } catch (error) {
        yield put(routerRedux.replace('/'));
      }
    },
    *fetchPortfolio(_, { call, put }) {
      try {
        const response = yield call(api.fetchPortfolio);
        if (response.error) return;
        yield put({
          type: 'show',
          payload: format.portfolio(response),
        });
      } catch (error) {
        yield put(routerRedux.replace('/'));
      }
    },
    *fetchTransactions(_, { call, put }) {
      try {
        const response = yield call(api.fetchTransactions);
        if (response.error) return;
        yield put({
          type: 'show',
          payload: format.transactions(response),
        });
      } catch (error) {
        yield put(routerRedux.replace('/'));
      }
    },
    *validateWallet({ payload }, { call, put, select }) {
      try {
        yield call(Web3.init);
        yield call(Web3.validate);
        const account = yield call(Web3.getAccount);
        const accountSelected = payload.walletAddress.toLowerCase();

        const walletList = yield select(state =>
          getWalletList(state.user.walletAddressMap).map(w => w.walletAddress)
        );

        if (walletList.includes(accountSelected)) {
          return notification.error({ message: i18n.t('message:message.wallet_already_exists') });
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
        notification.error({ message: i18n.t('message:message.wallet_not_match') });
      } catch (error) {
        if (error instanceof TypeError) {
          return notification.error({ message: error.message });
        }
      }
    },
    *submitWalletValidation({ payload }, { call }) {
      yield call(api.addWhitelist, payload.account);
    },
    *validateIdentify({ payload }, { call, put }) {
      const identity = yield call(api.updateIdentity, payload.formData);
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
          throw new TypeError(i18n.t('message:message.wallet_already_exists'));
        }

        const txHash = yield call(Web3.redeem, payload);
        yield call(api.updateMemberTransactions, {
          contractName: CONTRACT[payload.cap].key,
          contractAddress: CONTRACT[payload.cap].address,
          transactionType: 'sell',
          transactionHash: txHash,
        });
        notification.info({ message: i18n.t('message:transaction_complete'), description: txHash });
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
