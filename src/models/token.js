import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { STEP } from 'src/routes/Token/routes';
import Web3 from 'src/services/Web3';
import { CAPP01, CONTRACT } from 'src/utils/contract';
import { updateMember, UPDATE_MEMBER_TYPE } from 'src/services/api';
import i18n from 'src/i18n';

const initialCheckedState = {
  1: false,
  2: false,
};

const initialState = {
  cap: CONTRACT[CAPP01].key,
  walletAddress: '',
  amount: 1,
  checked: initialCheckedState,
};

export default {
  namespace: 'token',

  state: initialState,

  effects: {
    *submitNormalOrder({ payload }, { put }) {
      yield put(routerRedux.replace(STEP[3]));

      yield put({ type: 'saveFormData', payload });
      yield put({ type: 'user/updateInfo', payload });
    },
    *submitWeb3Order({ payload }, { call, put }) {
      try {
        yield call(Web3.validate);
        const walletAddress = yield call(Web3.getAccount);
        yield put(routerRedux.replace(STEP[3]));

        const result = yield call(Web3.buy, { ...payload, account: walletAddress });
        notification.success({ message: i18n.t('message:transaction_complete') });
        yield call(updateMember, UPDATE_MEMBER_TYPE.TRANSACTION, {
          contractName: CONTRACT[payload.cap].key,
          contractAddress: CONTRACT[payload.cap].address,
          transactionType: 'buy',
          transactionHash: result,
        });
        yield put({ type: 'user/updateInfo', payload: { walletAddress } });
        return;
      } catch (error) {
        if (error instanceof TypeError) {
          return notification.error({ message: error.message });
        }

        const info = { message: i18n.t('message:transaction_reject') };

        if (process.env.NODE_ENV !== 'production') {
          const [, description] = error.message.match(/'({.*})'/);
          info.description = JSON.parse(description).value.message;
        }
        return notification.error(info);
      }
    },
  },

  reducers: {
    saveFormData(state, action) {
      return { ...state, ...action.payload };
    },
    saveBuyTermData(state, { payload }) {
      return { ...state, checked: payload };
    },
    resetBuyTerm(state) {
      return { ...state, checked: initialCheckedState };
    },
    destroy() {
      return initialState;
    },
  },
};
