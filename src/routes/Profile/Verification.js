import React from 'react';
import { Form, Input, Upload, Button, Icon, message } from 'antd';
import { connect } from 'dva';
import ProfileLayout from 'src/layouts/ProfileLayout';
import styles from './Verification.less';

const formItemLayout = {
  wrapperCol: {
    span: 6,
  },
};

const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

@Form.create()
@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetch'],
}))
export default class Verificatoin extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'profile/fetch' });
  }

  render() {
    const { height } = this.props;
    const { form: { getFieldDecorator } } = this.props;
    return (
      <ProfileLayout height={height}>
        <h1>Identity Verification</h1>
        <Form layout="vertical" className={styles.form} hideRequiredMark>
          <Form.Item {...formItemLayout} label="Nationality">
            {getFieldDecorator('nationality', {
              rules: [
                { required: true, type: 'string', message: 'Please enter your nationality!' },
              ],
            })(<Input placeholder="Taiwan" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Passport Number">
            {getFieldDecorator('passport', {
              rules: [
                {
                  required: true,
                  type: 'string',
                  message: 'Please enter your passport number!',
                },
              ],
            })(<Input placeholder="0000000000" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="First Name">
            {getFieldDecorator('firstName', {
              rules: [{ required: true, type: 'string', message: 'Enter your first name' }],
            })(<Input placeholder="William" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Last Name">
            {getFieldDecorator('lastName', {
              rules: [{ required: true, type: 'string', message: 'Enter your last name' }],
            })(<Input placeholder="Smith" />)}
          </Form.Item>
          <Form.Item {...formItemLayout}>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item {...formItemLayout}>
            <Button type="primary">Verify</Button>
          </Form.Item>
        </Form>
      </ProfileLayout>
    );
  }
}
