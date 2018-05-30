import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { STEP } from 'src/routes/Token/routes';
import Metamask from 'src/services/Metamask';

const initialState = {
  cap: 'CAP01',
  walletAddress: '',
  transactionHash: '',
  amount: 1,
  checked: {
    1: false,
    2: false,
    3: false,
  },
};

export default {
  namespace: 'token',

  state: initialState,

  effects: {
    *submitOrder({ payload }, { call, put }) {
      yield put(routerRedux.replace(STEP[3]));

      if (Metamask.isInstalled) {
        try {
          const { result, walletAddress } = yield call(Metamask.open, payload);
          yield put({
            type: 'saveFormData',
            payload: {
              ...payload,
              walletAddress,
              transactionHash: result,
            },
          });
          notification.success({ message: 'Transaction complete' });
        } catch (error) {
          // ignore error
          // console.error(error.message);
          const info = {
            message: 'You cancel or reject the transaction',
          };
          if (process.env.NODE_ENV !== 'production') {
            info.description = error.message;
          }
          return notification.error(info);
        }
      }

      yield put({ type: 'saveFormData', payload });
      yield put({ type: 'user/updateInfo' });
    },
  },

  reducers: {
    saveFormData(state, action) {
      return { ...state, ...action.payload };
    },
    saveBuyTermData(state, { payload }) {
      return { ...state, checked: payload };
    },
    destroy() {
      return initialState;
    },
  },
};
