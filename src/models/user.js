import { routerRedux } from 'dva/router';
import * as api from 'src/services/members';
import { UNVERIFIED } from 'src/utils/status';
import i18n from 'src/i18n';
import session from 'src/utils/session';
import { redirect } from 'src/services/redirect';
import { REGISTER_RESULT, LOGIN } from 'src/routes';

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
          routerRedux.push({
            pathname: REGISTER_RESULT,
            state: { email: payload.email, type: 'register' },
          })
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
        const { error, status } = yield call(api.forgotPassword, payload);
        if (!error) {
          return yield put(
            routerRedux.push({
              pathname: REGISTER_RESULT,
              state: {
                email: payload.email,
                type: 'reset',
                link: { to: LOGIN, route: i18n.t('common:login') },
              },
            })
          );
        }
        yield put({
          type: 'save',
          payload: { errorMessage: i18n.t(`error:code.forgot_password.${status}`) },
        });
      } catch (error) {
        console.error(error);
      }
    },
    *changePassword({ payload }, { call, put }) {
      try {
        const params = {
          oldPassword: btoa(payload.oldPassword),
          newPassword: btoa(payload.newPassword),
        };
        const { error, status } = yield call(api.updateMemberPassword, params);
        if (!error) {
          return yield put({ type: 'redirect', payload: { location: LOGIN } });
        }
        yield put({
          type: 'save',
          payload: { errorMessage: i18n.t(`error:code.change_password.${status}`) },
        });
      } catch (error) {
        console.error(error);
      }
    },
    *redirect({ payload }, { call, put }) {
      yield call(redirect, 5);
      yield put(routerRedux.replace(payload.location));
      session.destroy();
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
    resetErrorMessage(state) {
      const newState = { ...state };
      delete newState.errorMessage;
      return newState;
    },
    destroy() {
      return {};
    },
  },
};
