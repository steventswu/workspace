import { message } from 'antd';
import { open } from '../services/Metamask';

export default {
  namespace: 'token',

  state: {
    cap: 'CAP01',
    walletAddress: '',
    transactionHash: '',
    amount: 1,
    checked: {
      1: false,
      2: false,
      3: false,
    },
  },

  effects: {
    *updateAcceptTerms({ payload }, { put }) {
      yield put({
        type: 'saveStepFormData',
        payload,
      });
    },
    *openMetamask({ payload }, { call, put }) {
      try {
        const transactionHash = yield call(open, payload);
        yield put({
          type: 'saveTransactionHash',
          payload: {
            transactionHash,
          },
        });
        message.success('Transaction complete');
      } catch (err) {
        // ignore error
        console.error(err.message);
        message.error('You cancel or reject the transaction');
      }
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        checked: payload,
      };
    },
    saveTransactionHash(state, { payload }) {
      return {
        ...state,
        transactionHash: payload.transactionHash,
      };
    },
  },
};
