import React from 'react';
import { Form, Select, InputNumber, Button } from 'antd';
import { compose } from 'redux';
import { connect } from 'dva';
import { CONTRACTS, CONTRACT } from 'src/utils/contract';
import { getVerifiedWalletList } from 'src/selectors/profile';
import { translate } from 'react-i18next';

import styles from './Redeem.less';

const mapStateToProps = ({ user, loading }) => ({
  walletList: getVerifiedWalletList(user.walletAddressMap),
  shouldLocked: loading.effects['profile/redeem'],
});

const enhancer = compose(Form.create(), connect(mapStateToProps), translate('redeem'));

const Redeem = enhancer(
  ({ walletList, shouldLocked, form: { getFieldDecorator, validateFields }, dispatch, t }) => (
    <React.Fragment>
      <h1>{t('title')}</h1>
      <Form layout="vertical" hideRequiredMark className={styles.form}>
        <Form.Item wrapperCol={{ span: 10 }} label={t('cap.label')}>
          {getFieldDecorator('cap', {
            rules: [{ required: true, type: 'string', message: t('cap.required') }],
          })(
            <Select disabled={shouldLocked} placeholder={t('cap.placeholder')}>
              {CONTRACTS.map(value => (
                <Select.Option key={value.key} value={value.key}>
                  {CONTRACT[value.key].label}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 10 }} label={t('address.label')}>
          {getFieldDecorator('address', {
            rules: [
              {
                required: true,
                type: 'string',
                message: t('address.required'),
              },
            ],
          })(
            <Select disabled={shouldLocked} placeholder={t('address.placeholder')}>
              {walletList.map(value => (
                <Select.Option key={value} value={value}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label={t('amount.label')} wrapperCol={{ span: 10 }}>
          {getFieldDecorator('amount', {
            rules: [
              {
                required: true,
                message: t('amount.required'),
              },
            ],
          })(<InputNumber disabled={shouldLocked} min={0.1} step={0.1} />)}
        </Form.Item>
        <Form.Item label="" wrapperCol={{ span: 10 }}>
          <Button
            type="primary"
            loading={shouldLocked}
            onClick={() =>
              validateFields((err, values) => {
                if (err) return;
                dispatch({ type: 'profile/redeem', payload: values });
              })
            }
          >
            {t('submit')}
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  )
);

Redeem.displayName = 'Redeem';

export default Redeem;
