import React from 'react';
import { Form, Select, InputNumber, Button } from 'antd';
import { compose } from 'redux';
import { connect } from 'dva';
import { CONTRACTS, CONTRACT } from 'src/utils/contract';

import styles from './Redeem.less';

const enhancer = compose(Form.create(), connect());

export default enhancer(({ form: { getFieldDecorator, validateFields }, dispatch }) => (
  <React.Fragment>
    <h1>Redeem Application</h1>
    <Form layout="vertical" hideRequiredMark className={styles.form}>
      <Form.Item label="CAP">
        {getFieldDecorator('cap', {
          rules: [{ required: true, type: 'string', message: 'Choose CAP' }],
        })(
          <Select placeholder="Select CAP">
            {CONTRACTS.map(value => (
              <Select.Option key={value.key} value={value.key}>
                {CONTRACT[value.key].label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="Wallet Address">
        {getFieldDecorator('walletAddress', {
          rules: [
            {
              required: true,
              type: 'string',
              message: 'Choose wallet address',
            },
          ],
        })(
          <Select placeholder="Select Wallet">
            {['xxx', 'ooo'].map(value => (
              <Select.Option key={value} value={value}>
                {value}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="Amount">
        {getFieldDecorator('amount', {
          rules: [
            {
              required: true,
              message: 'Enter amount',
            },
          ],
        })(<InputNumber min={0.1} step={0.1} />)}
      </Form.Item>
      <Form.Item label="">
        <Button
          type="primary"
          onClick={() =>
            validateFields((err, values) => {
              if (err) return;
              dispatch({ type: 'redeem', payload: values });
            })
          }
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  </React.Fragment>
));
