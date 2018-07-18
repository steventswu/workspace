import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { identityKey } from 'src/services/api';
import IdForm from 'components/IdForm';

import { VERIFIED, PENDING, UNVERIFIED } from 'src/utils/status';

const ROUTE = {
  ROOT: '/profile',
  HOME: '/profile/home',
  WALLET_VERIFICATION: '/profile/wallet',
  REDEEM: '/profile/redeem',
  VERIFICATION: '/profile/verification',
};
@connect(({ user, profile }) => ({
  currentUser: user,
  profile,
}))
export default class IdentityVerification extends React.PureComponent {
  handleOnClick = values => {
    const formData = new FormData();
    const passFile = values.passportImage;
    const formValues = {
      ...values,
      memberId: this.props.currentUser.id,
      passportImage: passFile,
    };
    Object.keys(values).forEach(key => {
      if (values[key].file) {
        return formData.append(key, values[key].file);
      }
      formData.append(key, values[key]);
    });
    localStorage.setItem(identityKey, JSON.stringify(values));
    formData.append('memberId', this.props.currentUser.id);
    this.props.dispatch({
      type: 'profile/validateIdentify',
      payload: { formData, formValues },
    });
    setTimeout(() => {
      this.props.dispatch({
        type: 'user/fetchCurrent',
      });
      this.props.dispatch(routerRedux.push(ROUTE.VERIFICATION));
    }, 1000);
  };
  render() {
    const { profile } = this.props;
    const { currentUser } = this.props;
    const { currentUser: { isIdentityVerified } } = this.props;
    const unverified = isIdentityVerified === UNVERIFIED;
    const pending = isIdentityVerified === PENDING;
    const verified = isIdentityVerified === VERIFIED;
    return (
      <div>
        <IdForm
          profile={profile}
          currentUser={currentUser}
          isIdentityVerified={isIdentityVerified}
          unverified={unverified}
          pending={pending}
          verified={verified}
          onClickVerify={this.handleOnClick}
        />
      </div>
    );
  }
}
