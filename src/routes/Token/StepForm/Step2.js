import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step2 extends React.PureComponent {
  render() {
    const { form, dispatch, data, user } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'token/openMetamask',
            payload: {
              fromAddress: values.walletAddress,
              contractNumber: values.cap,
              amount: values.amount,
            },
          });
          dispatch({
            type: 'user/updateWalletAddress',
            payload: {
              walletAddress: values.walletAddress,
            },
          });
          dispatch(routerRedux.push('/app/token/3'));
        }
      });
    };
    const onChangeCap = cap => {
      dispatch({
        type: 'token/saveStepFormData',
        payload: {
          cap,
        },
      });
    };
    const onChangeAmount = amount => {
      dispatch({
        type: 'token/saveStepFormData',
        payload: {
          amount,
        },
      });
    };
    const onChangeWalletAddress = e => {
      dispatch({
        type: 'user/saveWalletAddress',
        payload: {
          walletAddress: e.target.value,
        },
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="CAP">
            {getFieldDecorator('cap', {
              initialValue: data.cap,
              rules: [{ required: true, type: 'string', message: 'Choose CAP' }],
            })(
              <Select placeholder="CAP 01" onChange={onChangeCap}>
                <Option value="CAP01">CAP01</Option>
                <Option value="CAP02">CAP02</Option>
                <Option value="CAP03">CAP03</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Your Wallet Address">
            {getFieldDecorator('walletAddress', {
              initialValue: user.currentUser.walletAddress,
              rules: [
                {
                  required: true,
                  type: 'string',
                  pattern: /^(0x)?[0-9A-Za-z]{40}$/,
                  message: 'Enter correct wallet address, please',
                },
              ],
            })(
              <Input
                placeholder="EX:0xeccdbbcbf7e7c030f75311163ed96711e8fdbe0f"
                onChange={onChangeWalletAddress}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Amount">
            {getFieldDecorator('amount', {
              initialValue: data.amount,
              rules: [
                {
                  required: true,
                  message: 'Enter amount',
                },
              ],
            })(<Input placeholder="EX:100000000000" onChange={onChangeAmount} />)}
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
            <Button type="primary" onClick={onValidateForm}>
              Next
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default connect(({ user, token }) => ({
  data: token.step,
  user,
}))(Step2);
