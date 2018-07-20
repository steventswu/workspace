import React from 'react';
import { Collapse, Button, Form, Input, List, Icon } from 'antd';
import { connect } from 'dva';
import { translate } from 'react-i18next';
import { routerRedux } from 'dva/router';
import { identityKey } from 'src/services/api';
import { VERIFIED, PENDING, UNVERIFIED } from 'src/utils/status';
import * as userProfile from 'src/selectors/profile';
import IdForm from 'components/IdForm';

import styles from './UserProfile.less';

const ROUTE = {
  WALLET_VERIFICATION: '/profile/wallet',
  VERIFICATION: '/profile/verification',
};
@Form.create()
@connect(({ user, profile, loading }) => ({
  currentUser: user,
  email: user.email,
  profile,
  loading: loading.effects['profile/fetch'],
  isLoading: loading.effects['user/fectchCurrent'],
  walletList: userProfile.getWalletList(user.walletAddressMap),
}))
@translate(['profile', 'common'])
export default class UserProfile extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'profile/fetch' });
  }

  handleButtonClick = () => {
    this.props.dispatch(routerRedux.push('/user/change-password'));
  };

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
    const { t, email, isLoading, walletList, profile, currentUser } = this.props;
    const { currentUser: { isIdentityVerified } } = this.props;
    const { form: { getFieldDecorator, validateFields, resetFields } } = this.props;
    const unverified = isIdentityVerified === UNVERIFIED;
    const pending = isIdentityVerified === PENDING;
    const verified = isIdentityVerified === VERIFIED;
    return (
      <React.Fragment>
        <Collapse accordion bordered={false} defaultActiveKey={['1']}>
          <Collapse.Panel header={<h1>{t('user_profile')}</h1>} key="1">
            <div className={styles.email}>
              {t('email')}
              <p>{email}</p>
              <Button onClick={this.handleButtonClick}>{t('common:change_password')}</Button>
            </div>
          </Collapse.Panel>
          <Collapse.Panel header={<h1>{t('identity_verification')}</h1>} key="2">
            <div style={{ paddingLeft: 24 }}>
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
          </Collapse.Panel>
          <Collapse.Panel header={<h1>{t('wallet_verification')}</h1>} key="3">
            <p>
              To link a new ethereum address, enter the address below. You can link up to 3
              addresses.
            </p>
            <div style={{ width: 800 }}>
              <Form layout="horizontal" hideRequiredMark className={styles.form}>
                <Form.Item style={{ flex: 1, marginRight: 10 }}>
                  {getFieldDecorator('walletAddress', {
                    rules: [{ required: true, type: 'string', message: 'Enter Wallet Address' }],
                  })(
                    <Input
                      type="text"
                      placeholder="Enter Wallet Address"
                      disabled={walletList.length >= 3}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    disabled={walletList.length >= 3}
                    onClick={() =>
                      validateFields((err, values) => {
                        if (err) return;
                        this.props.dispatch({
                          type: 'profile/validateWallet',
                          payload: values,
                        });
                        resetFields();
                      })
                    }
                  >
                    Link Address
                  </Button>
                </Form.Item>
              </Form>
              <List
                dataSource={walletList}
                renderItem={item => (
                  <List.Item className={styles.listItem}>
                    {item.walletAddress}
                    <Button
                      style={{ width: 120 }}
                      type="dashed"
                      onClick={() => this.props.dispatch({ type: 'user/fetchCurrent' })}
                    >
                      <Icon
                        type={userProfile.getIconType(item.isVerified)}
                        style={{ marginRight: 5 }}
                      />
                      {userProfile.getButtonStatus(item.isVerified)}
                    </Button>
                  </List.Item>
                )}
                loading={isLoading}
              />
            </div>
          </Collapse.Panel>
        </Collapse>
      </React.Fragment>
    );
  }
}
