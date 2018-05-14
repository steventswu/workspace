import { routerRedux } from 'dva/router';
import { postMember } from '../services/api';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      yield call(postMember, {
        email: payload.email,
        password: btoa(payload.password),
      });
      yield put({
        type: 'registerHandle',
        payload: { status: 'ok' },
      });
      yield put(
        routerRedux.push({ pathname: '/user/register-result', state: { email: payload.email } })
      );
    },
  },

  reducers: {
    registerHandle(_, { payload }) {
      return {
        status: payload.status,
      };
    },
  },
};
