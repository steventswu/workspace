import { queryPerformance } from '../services/user';

export default {
  namespace: 'performance',

  state: {
    info: {},
    symbol: [],
  },

  effects: {
    *fetchPerformance(_, { call, put }) {
      try {
        const response = yield call(queryPerformance);
        yield put({
          type: 'savePerformance',
          payload: response,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },

  reducers: {
    savePerformance(state, action) {
      return {
        ...state,
        info: action.payload.info,
        symbol: action.payload.symbol,
      };
    },
  },
};
