import { queryProfile } from 'src/services/api';
import { formatAll } from './profile.helper';

export default {
  namespace: 'profile',

  state: {
    transactions: [],
    portfolio: [],
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
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
