import React from 'react';
import { Form, Input, Upload, Button, Icon, message } from 'antd';
import { connect } from 'dva';
import styles from './Verification.less';

const formItemLayout = {
  wrapperCol: {
    span: 6,
  },
};

const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/', // Will have to change to our API in the future
  headers: {
    Authorization: 'Bearer ',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file);
    }
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
  state = { locked: false };
  componentDidMount() {
    this.props.dispatch({ type: 'profile/fetch' });
  }
  handleFormSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return err;
      } else {
        console.log(values);
        this.setState({ locked: true });
        message.info(`Your ID verifaction information has been submitted for verfication.`);
        this.props.dispatch({
          type: 'verification',
          payload: values,
        });
      }
    });
  };

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <React.Fragment>
        <h1>Identity Verification</h1>
        <Form layout="vertical" className={styles.form} hideRequiredMark>
          <Form.Item {...formItemLayout} label="Nationality">
            {getFieldDecorator('nationality', {
              rules: [{ required: true, type: 'string', message: 'Enter nationality' }],
            })(<Input placeholder="Enter nationality" disabled={this.state.locked} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Passport Number">
            {getFieldDecorator('passport', {
              rules: [
                {
                  required: true,
                  type: 'string',
                  message: 'Enter passport number',
                },
              ],
            })(<Input placeholder="Enter passport number" disabled={this.state.locked} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="First Name">
            {getFieldDecorator('firstName', {
              rules: [{ required: true, type: 'string', message: 'Enter first name' }],
            })(<Input placeholder="Enter first name" disabled={this.state.locked} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Last Name">
            {getFieldDecorator('lastName', {
              rules: [{ required: true, type: 'string', message: 'Enter last name' }],
            })(<Input placeholder="Enter last name" disabled={this.state.locked} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Passport Photo">
            {getFieldDecorator('photo', {
              rules: [{ required: true, message: 'Upload passport photo' }],
            })(
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout}>
            <Button type="primary" onClick={this.handleFormSubmit}>
              Verify
            </Button>
          </Form.Item>
        </Form>
        {this.state.locked && (
          <h3>
            We have received your application. The process might take 3 - 5 working days. The
            confirmation mail will be sent upon the successful completion.
          </h3>
        )}
      </React.Fragment>
    );
  }
}
