import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Alert } from 'antd';
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
  componentDidMount() {
    this.loadAccount();
  }

  state = { error: false };

  handleFormSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err || this.state.error) return;
      this.props.dispatch({
        type: Web3.isInstalled ? 'token/submitWeb3Order' : 'token/submitNormalOrder',
        payload: values,
      });
    });
  };

  loadAccount = async () => {
    if (this.state.error) {
      this.setState({ error: false });
    }
    try {
      Web3.init();
      const account = await Web3.getAccount();
      this.setState({ account });
    } catch (error) {
      this.setState({ error: error.message || true });
    }
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
          <Form.Item {...formItemLayout} label={t('wallet.label')}>
            {Web3.isDisabled ? (
              getFieldDecorator('walletAddress', {
                initialValue: currentUser.walletAddress,
                rules: [
                  {
                    required: true,
                    type: 'string',
                    pattern: /^(0x)?[0-9A-Za-z]{40}$/,
                    message: t('wallet.format'),
                  },
                ],
              })(<Input placeholder={t('wallet.placeholder')} />)
            ) : this.state.error ? (
              <Alert
                type="error"
                message={this.state.error}
                closeText="Reload"
                afterClose={this.loadAccount}
              />
            ) : (
              <span className="ant-form-text">{this.state.account || '...'}</span>
            )}
          </Form.Item>
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
            <Button
              type="primary"
              disabled={Boolean(this.state.error)}
              onClick={this.handleFormSubmit}
            >
              {t('common:next')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
