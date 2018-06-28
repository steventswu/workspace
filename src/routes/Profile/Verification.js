import React from 'react';
import { Form, Input, Upload, Button, Icon, message } from 'antd';
import { connect } from 'dva';
import * as R from 'ramda';

import styles from './Verification.less';

const formItemLayout = {
  wrapperCol: {
    span: 6,
  },
};

@Form.create()
@connect(({ user, profile }) => ({
  user,
  profile,
}))
export default class Verificatoin extends React.Component {
  state = {
    fileList: [],
    locked: false,
  };
  handleFormSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return err;
      } else {
        const formData = new FormData();
        const passFile = values.passportImage.file;
        const formValues = R.merge(values, {
          memberId: this.props.user.id,
          passportImage: passFile,
        });
        Object.keys(values).forEach(key => {
          if (values[key].file) {
            return formData.append(key, values[key].file);
          }
          formData.append(key, values[key]);
        });
        formData.append('memberId', this.props.user.id);
        this.setState({ locked: true });
        message.info(`Your ID verifaction information has been submitted for verfication.`);
        this.props.dispatch({ type: 'profile/validateIdentify', payload: formData, formValues });
      }
    });
  };

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const props = {
      accept: 'image/jpg,image/jpeg,image/png',
      onRemove: file => {
        // Will have to change to our API in the future
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return { fileList: newFileList };
        });
      },
      beforeUpload: file => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };
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
            {getFieldDecorator('passportNumber', {
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
          <Form.Item
            {...formItemLayout}
            label="Passport Photo"
            extra="Please make sure all document details are clearly readable. Document number and name are clearly visible"
          >
            {getFieldDecorator('passportImage', {
              rules: [{ required: true, message: 'Upload passport photo' }],
            })(
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Select File
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
