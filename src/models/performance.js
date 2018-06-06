import { queryPerformance, queryAnalysisData, queryCoinData } from 'src/services/api';

export default {
  namespace: 'performance',

  state: {
    info: {},
    symbol: [],
    analysis: [],
    coin: {},
    // cap2: {
    //   info: {},
    //   symbol: [],
    // },
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
    *fetchAnalysisData(_, { call, put }) {
      try {
        const analysisData = yield call(queryAnalysisData);
        yield put({
          type: 'saveAnalysisData',
          payload: analysisData,
        });
      } catch (e) {
        console.log(e);
      }
    },
    // *fetchPerformance(action, { call, put }) {
    //   try {
    //     const response = yield call(queryPerformance, action.payload);
    //     yield put({
    //       type: 'savePerformance',
    //       payload: {
    //         ...response,
    //         type: action.payload.type
    //       },
    //     });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    *fetchCoinData({ payload }, { call, put }) {
      try {
        const coinData = yield call(queryCoinData, payload);
        yield put({
          type: 'saveCoinData',
          payload: {
            ...payload,
            coinData,
          },
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
    saveAnalysisData(state, action) {
      return {
        ...state,
        analysis: action.payload,
      };
    },
    // savePerformance(state, action) {
    //   return {
    //     ...state,
    //     [action.payload.type]: {
    //       info: action.payload.info,
    //       symbol: action.payload.symbol,
    //     }
    //   };
    // },
    saveCoinData(state, action) {
      return {
        ...state,
        coin: action.payload.coinData,
      };
    },
  },
};
