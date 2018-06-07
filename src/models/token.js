import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { STEP } from 'src/routes/Token/routes';
import Metamask from 'src/services/Metamask';
import { CAPP01, CONTRACT } from 'src/utils/contract';
import { updateMember, UPDATE_MEMBER_TYPE } from 'src/services/api';

const initialState = {
  cap: CONTRACT[CAPP01].key,
  walletAddress: '',
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
      if (Metamask.isInstalled) {
        try {
          yield call(Metamask.init);
          yield call(Metamask.validate);
          yield put(routerRedux.replace(STEP[3]));

          const { result } = yield call(Metamask.open, payload);
          notification.success({ message: 'Transaction complete' });
          yield call(updateMember, UPDATE_MEMBER_TYPE.TRANSACTION, {
            contractName: CONTRACT[payload.cap].key,
            contractAddress: CONTRACT[payload.cap].address,
            transactionType: 'buy',
            transactionHash: result,
          });
        } catch (error) {
          if (error instanceof TypeError) {
            return notification.error({ message: error.message });
          }

          const info = { message: 'You cancel or reject the transaction' };

          if (process.env.NODE_ENV !== 'production') {
            const [, description] = error.message.match(/'({.*})'/);
            info.description = JSON.parse(description).value.message;
          }
          return notification.error(info);
        }
      }
      yield put(routerRedux.replace(STEP[3]));

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
