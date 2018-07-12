import React from 'react';
import { Form, Input, Upload, Button, Icon, Select, message } from 'antd';
import { COUNTRY } from 'src/utils/country';
import { identityKey, getIdentity } from 'src/services/api';
import { connect } from 'dva';

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
        const passFile = values.passportImage;
        const formValues = {
          ...values,
          memberId: this.props.user.id,
          passportImage: passFile,
        };
        Object.keys(values).forEach(key => {
          if (values[key].file) {
            return formData.append(key, values[key].file);
          }
          formData.append(key, values[key]);
        });
        localStorage.setItem(identityKey, JSON.stringify(values));
        formData.append('memberId', this.props.user.id);
        this.setState({ locked: true });
        message.info(`Your ID verifaction information has been submitted for verfication.`);
        this.props.dispatch({
          type: 'profile/validateIdentify',
          payload: { formData, formValues },
        });
        //   this.props.dispatch(routerRedux.replace('/profile'));
      }
    });
  };
  handleSubmittedState = () => {
    if (this.props.user.isIdentityVerified === 'unverified') {
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
          this.setState(({ fileList }) => {
            const newFileList = fileList.slice(-1);
            return { fileList: newFileList };
          });
          return false;
        },
        fileList: this.state.fileList,
      };
      const { nationality, passportNumber, firstName, lastName, passportImage } = getIdentity();
      return (
        <React.Fragment>
          <h1>Identity Verification</h1>
          <Form layout="vertical" className={styles.form} hideRequiredMark>
            <Form.Item {...formItemLayout} label="Nationality">
              {getFieldDecorator('nationality', {
                initialValue: nationality,
                rules: [
                  {
                    required: true,
                    type: 'string',
                    message: 'Choose Nationality',
                    whitespace: true,
                  },
                ],
              })(
                <Select
                  showSearch
                  placeholder="Select Country"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  disabled={this.state.locked}
                >
                  {COUNTRY.map(value => (
                    <Select.Option key={value.country} value={value.country}>
                      {value.country}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Passport Number">
              {getFieldDecorator('passportNumber', {
                initialValue: passportNumber,
                rules: [
                  {
                    required: true,
                    type: 'string',
                    message: 'Enter passport number',
                    whitespace: true,
                  },
                ],
              })(<Input placeholder="Enter passport number" disabled={this.state.locked} />)
              // onKeyUp={localStorage.setItem('passportNumber', this.props.form.getFieldValue('passportNumber'))}
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="First Name">
              {getFieldDecorator('firstName', {
                initialValue: firstName,
                rules: [
                  {
                    required: true,
                    type: 'string',
                    message: 'Enter first name',
                    whitespace: true,
                  },
                ],
              })(<Input placeholder="Enter first name" disabled={this.state.locked} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Last Name">
              {getFieldDecorator('lastName', {
                initialValue: lastName,
                rules: [
                  {
                    required: true,
                    type: 'string',
                    message: 'Enter last name',
                    whitespace: true,
                  },
                ],
              })(<Input placeholder="Enter last name" disabled={this.state.locked} />)}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Passport Photo"
              extra="Supports JPEG, JPG, and PNG"
            >
              {getFieldDecorator('passportImage', {
                initialValue: passportImage,
                rules: [{ required: true, message: 'Upload passport photo' }],
              })(
                <Upload {...props}>
                  <Button disabled={this.state.locked}>
                    <Icon type="upload" /> Select File (25MB)
                  </Button>
                </Upload>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout}>
              <Button type="primary" onClick={this.handleFormSubmit} disabled={this.state.locked}>
                Verify
              </Button>
            </Form.Item>
          </Form>
        </React.Fragment>
      );
    } else if (this.props.user.isIdentityVerified === 'pending') {
      return (
        <h2 className={styles.pending}>
          We have received your application. The process might take 3 - 5 working days. The
          confirmation mail will be sent upon the successful completion.
        </h2>
      );
    }
    return (
      <h2 className={styles.verified}>
        <Icon type="check-circle-o" />
        Your identity verification is completed.
      </h2>
    );
  };

  render() {
    return this.handleSubmittedState();
  }
}
