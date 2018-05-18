import { routerRedux } from 'dva/router';
import { query as queryUsers, queryCurrent, verifyEmail } from '../services/user';
import { sessionKey } from './login';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      try {
        const info = JSON.parse(localStorage.getItem(sessionKey));
        const response = yield call(queryCurrent, info);
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });
      } catch (e) {
        yield put({ type: 'login/logout' });
      }
    },
    *verify({ payload }, { call, put }) {
      const { error } = yield call(verifyEmail, payload);
      if (error) {
        yield put(routerRedux.replace('/user/login'));
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
