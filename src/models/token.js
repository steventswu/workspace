import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '../services/api';
import Metamask from '../services/Metamask';

export default {
  namespace: 'token',

  state: {
    step: {
      cap: 'CAP01',
      receiverAccount: 'test@example.com',
      walletAddress: '',
      amount: '500',
      check1: false,
      check2: false,
      check3: false,
    },
  },

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/app/token/3'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *openMetamask({ payload }, { call, put }) {
      const transactionHash = yield call(Metamask.openMetamask, payload);
      yield put({
        type: 'saveStepFormData',
        payload: {
          transactionHash,
        },
      });
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
