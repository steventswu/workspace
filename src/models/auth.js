import { routerRedux } from 'dva/router';
import * as api from 'src/services/auth';

export default {
  namespace: 'auth',

  state: {},

  effects: {
    *fetchMember(_, { call, put }) {
      try {
        const response = yield call(api.fetchMember);
        yield put({ type: 'user/save', payload: response });
      } catch (e) {
        // console.warn(e.message);
      }
    },
    *verifyEmail({ payload }, { call, put }) {
      const { error } = yield call(api.verifyEmail, payload);
      if (error) {
        yield put(routerRedux.replace('/user/login'));
      }
    },
  },
};
