import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select } from 'antd';
import { translate } from 'react-i18next';
import Web3 from 'src/services/Web3';
import { CONTRACTS, CONTRACT } from 'src/utils/contract';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

@Form.create()
@connect(({ user, token }) => ({
  data: token,
  currentUser: user,
}))
@translate(['buy', 'common'])
export default class Step2 extends React.PureComponent {
  handleFormSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.props.dispatch({
        type: Web3.isInstalled ? 'token/submitWeb3Order' : 'token/submitNormalOrder',
        payload: values,
      });
    });
  };

  render() {
    const { form: { getFieldDecorator }, data, currentUser, t } = this.props;
    return (
      <div className={styles.wrapper}>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label={t('common:cap')}>
            {getFieldDecorator('cap', {
              initialValue: CONTRACT[data.cap].key,
              rules: [{ required: true, type: 'string', message: t('cap.required') }],
            })(
              <Select placeholder={t('cap.placeholder')}>
                {CONTRACTS.map(value => (
                  <Option key={value.key} value={value.key}>
                    {CONTRACT[value.key].label}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          {Web3.isDisabled && (
            <Form.Item {...formItemLayout} label={t('wallet.label')}>
              {getFieldDecorator('walletAddress', {
                initialValue: currentUser.walletAddress,
                rules: [
                  {
                    required: true,
                    type: 'string',
                    pattern: /^(0x)?[0-9A-Za-z]{40}$/,
                    message: t('wallet.format'),
                  },
                ],
              })(<Input placeholder={t('wallet.placeholder')} />)}
            </Form.Item>
          )}
          <Form.Item {...formItemLayout} label={t('common:amount')}>
            {getFieldDecorator('amount', {
              initialValue: data.amount,
              rules: [
                {
                  required: true,
                  message: t('amount.required'),
                },
              ],
            })(<Input placeholder={t('amount.placeholder')} />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={this.handleFormSubmit}>
              {t('common:next')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
