import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select } from 'antd';
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
    const { form: { getFieldDecorator }, data, currentUser } = this.props;
    return (
      <div className={styles.wrapper}>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="CAP">
            {getFieldDecorator('cap', {
              initialValue: CONTRACT[data.cap].key,
              rules: [{ required: true, type: 'string', message: 'Choose CAP' }],
            })(
              <Select placeholder="Select CAP">
                {CONTRACTS.map(value => (
                  <Option key={value.key} value={value.key}>
                    {CONTRACT[value.key].label}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          {Web3.isDisabled && (
            <Form.Item {...formItemLayout} label="Your Wallet Address">
              {getFieldDecorator('walletAddress', {
                initialValue: currentUser.walletAddress,
                rules: [
                  {
                    required: true,
                    type: 'string',
                    pattern: /^(0x)?[0-9A-Za-z]{40}$/,
                    message: 'Enter correct wallet address to continue',
                  },
                ],
              })(<Input placeholder="EX:0xeccdbbcbf7e7c030f75311163ed96711e8fdbe0f" />)}
            </Form.Item>
          )}
          <Form.Item {...formItemLayout} label="Amount">
            {getFieldDecorator('amount', {
              initialValue: data.amount,
              rules: [
                {
                  required: true,
                  message: 'Enter amount',
                },
              ],
            })(<Input placeholder="EX:100000000000" />)}
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
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
