import { routerRedux } from 'dva/router';
import * as api from 'src/services/members';
import { UNVERIFIED } from 'src/utils/status';

export default {
  namespace: 'user',

  state: {},

  effects: {
    *register({ payload }, { call, put }) {
      try {
        yield call(api.createMember, {
          email: payload.email,
          password: btoa(payload.password),
        });
        yield put(
          routerRedux.push({ pathname: '/user/register-result', state: { email: payload.email } })
        );
      } catch (error) {
        console.error(error);
      }
    },
    *updateInfo({ payload: { walletAddress } }, { call, put }) {
      try {
        yield call(api.updateMemberWallet, { walletAddress });
        yield put({
          type: 'saveWalletAddress',
          payload: { walletAddress, isVerified: UNVERIFIED },
        });
        yield call(api.updateMemberLog, { walletAddress });
      } catch (e) {
        yield put({ type: 'login/logout' });
      }
    },
    *forgotPassword({ payload }, { call, put }) {
      try {
        yield call(api.forgotPassword, payload);
        yield put(routerRedux.replace('/user/login'));
      } catch (error) {
        console.error(error);
      }
    },
    *changePassword({ payload }, { call, put }) {
      try {
        yield call(api.updateMemberPassword, payload.password);
        yield put(routerRedux.replace('/user/login'));
      } catch (error) {
        console.error(error);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveWalletAddress(state, action) {
      return {
        ...state,
        walletAddressMap: {
          ...state.walletAddressMap,
          [action.payload.walletAddress]: action.payload,
        },
      };
    },
    destroy() {
      return {};
    },
  },
};
