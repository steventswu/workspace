import React from 'react';
import { Collapse, Button, Form, Input, List, Icon } from 'antd';
import { connect } from 'dva';
import { translate } from 'react-i18next';
import { routerRedux } from 'dva/router';
import { identityKey } from 'src/services/api';
import { VERIFIED, PENDING, UNVERIFIED } from 'src/utils/status';
import * as userProfile from 'src/selectors/profile';
import IdForm from 'components/IdForm';

import { CHANGE_PASSWORD } from 'src/routes';
import styles from './profile.less';
@Form.create()
@connect(({ user, profile, loading }) => ({
  currentUser: user,
  email: user.email,
  profile,
  loading: loading.effects['profile/fetch'],
  isLoading: loading.effects['auth/fetchMember'],
  walletList: userProfile.getWalletList(user.walletAddressMap),
}))
@translate(['profile', 'common', 'walletVerification'])
export default class UserProfile extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'profile/fetch' });
  }
  state = { activeKey: '1' };
  handlePanelChange = activeKey => {
    if (!activeKey.length) return;
    this.setState({
      activeKey: activeKey.filter(k => k !== this.setState.activeKey).pop(),
    });
  };
  handleButtonClick = () => {
    this.props.dispatch(routerRedux.push(CHANGE_PASSWORD));
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
        type: 'auth/fetchMember',
      });
    }, 1000);
  };
  render() {
    const { t, email, isLoading, walletList, profile, currentUser } = this.props;
    const { currentUser: { isIdentityVerified } } = this.props;
    const { form: { getFieldDecorator, validateFields, resetFields } } = this.props;
    const unverified = isIdentityVerified === UNVERIFIED;
    const pending = isIdentityVerified === PENDING;
    const verified = isIdentityVerified === VERIFIED;
    const shouldVerified = isIdentityVerified !== VERIFIED;
    return (
      <React.Fragment>
        <div>
          <h1>{t('user_profile')}</h1>
          <Collapse
            activeKey={[this.state.activeKey]}
            onChange={this.handlePanelChange}
            bordered={false}
          >
            <Collapse.Panel header={<h2>{t('personal_details')}</h2>} key="1">
              <div className={styles.email}>
                {t('email')}
                <p>{email}</p>
                <Button onClick={this.handleButtonClick}>{t('common:change_password')}</Button>
              </div>
            </Collapse.Panel>
            <Collapse.Panel header={<h2>{t('identity_verification')}</h2>} key="2">
              <div className={styles.profile}>
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
            <Collapse.Panel header={<h2>{t('wallet_verification')}</h2>} key="3">
              <div className={styles.profile}>
                <p>
                  {shouldVerified
                    ? t('walletVerification:empty_text')
                    : t('walletVerification:description')}
                </p>
                <Form layout="horizontal" hideRequiredMark className={styles.form}>
                  <Form.Item style={{ flex: 1, marginRight: 10 }}>
                    {getFieldDecorator('walletAddress', {
                      rules: [
                        {
                          required: true,
                          type: 'string',
                          message: t('walletVerification:wallet.required'),
                        },
                      ],
                    })(
                      <Input
                        type="text"
                        size="large"
                        placeholder={t('walletVerification:wallet.placeholder')}
                        disabled={walletList.length >= 3 || shouldVerified}
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      size="large"
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
                      {t('walletVerification:wallet.button')}
                    </Button>
                  </Form.Item>
                </Form>
                <List
                  dataSource={walletList}
                  itemLayout="horizontal"
                  renderItem={item => (
                    <List.Item className={styles.listItem}>
                      <List.Item.Meta title={item.walletAddress} />
                      <span className={styles.status}>
                        <Icon
                          type={userProfile.getIconType(item.isVerified)}
                          style={{ marginRight: 5 }}
                        />
                        {userProfile.getButtonStatus(item.isVerified)}
                      </span>
                    </List.Item>
                  )}
                  loading={isLoading}
                />
              </div>
            </Collapse.Panel>
          </Collapse>
        </div>
      </React.Fragment>
    );
  }
}
