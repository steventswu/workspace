import React from 'react';
import { Form, Input, Button, List, Icon } from 'antd';
import { compose } from 'redux';
import { connect } from 'dva';
import * as profile from 'src/selectors/profile';

import styles from './WalletVerification.less';

const mapStateToProps = ({ user, loading }) => ({
  isLoading: loading.effects['user/fetchCurrent'],
  walletList: profile.getWalletList(user.walletAddressMap),
});

const enhancer = compose(Form.create(), connect(mapStateToProps));

const WalletVerification = enhancer(
  ({
    walletList,
    isLoading,
    form: { getFieldDecorator, validateFields, resetFields },
    dispatch,
  }) => (
    <React.Fragment>
      <h1>Wallet Verification</h1>
      <p>
        To link a new ethereum address, enter the address below. You can link up to 3 addresses.
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
                  dispatch({ type: 'profile/validateWallet', payload: values });
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
                onClick={() => dispatch({ type: 'user/fetchCurrent' })}
              >
                <Icon type={profile.getIconType(item.isVerified)} style={{ marginRight: 5 }} />
                {profile.getButtonStatus(item.isVerified)}
              </Button>
            </List.Item>
          )}
          loading={isLoading}
        />
      </div>
    </React.Fragment>
  )
);

WalletVerification.displayName = 'WalletVerification';

export default WalletVerification;
