import React from 'react';
import { Form, Input, Upload, Button, Icon, Select } from 'antd';
import { COUNTRY } from 'src/utils/country';
import { getIdentity } from 'src/services/api';
import { translate } from 'react-i18next';

import { VERIFIED, PENDING, UNVERIFIED } from 'src/utils/status';
import styles from './index.less';

const formItemLayout = {
  wrapperCol: {
    span: 10,
  },
};

const sumbittedFormLayout = {
  wrapperCol: { span: 10 },
};

@Form.create()
@translate('identityVerification')
export default class IdForm extends React.PureComponent {
  state = {
    fileList: [],
    locked: false,
  };

  handleFormSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return err;
      } else {
        this.props.onClickVerify(values);
        this.setState({
          locked: true,
        });
      }
    });
  };

  render() {
    const { nationality, passportNumber, firstName, lastName, passportImage } = getIdentity();
    const { currentUser: { isIdentityVerified } } = this.props;
    const unverified = isIdentityVerified === UNVERIFIED;
    const pending = isIdentityVerified === PENDING;
    const verified = isIdentityVerified === VERIFIED;
    const { form: { getFieldDecorator, isFieldTouched }, t } = this.props;
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
        this.setState(({ fileList }) => ({ fileList: [...fileList, file] }));
        this.setState(({ fileList }) => {
          const newFileList = fileList.slice(-1);
          return { fileList: newFileList };
        });
        return false;
      },
      fileList: this.state.fileList,
    };
    const field = {
      nationality: 'nationality',
      passportNumber: 'passportNumber',
      firstName: 'firstName',
      lastName: 'lastName',
      passportImage: 'passportImage',
    };
    const fields = Object.values(field);
    return (
      <div>
        {unverified && (
          <React.Fragment>
            <Form layout="vertical" className={styles.form} hideRequiredMark>
              <Form.Item {...formItemLayout} label={t('nationality.label')}>
                {getFieldDecorator(field.nationality, {
                  initialValue: nationality,
                  rules: [
                    {
                      required: true,
                      type: 'string',
                      message: t('nationality.required'),
                      whitespace: true,
                    },
                  ],
                })(
                  <Select
                    showSearch
                    size="large"
                    placeholder={t('nationality.placeholder')}
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
              <Form.Item {...formItemLayout} label={t('passport_number.label')}>
                {getFieldDecorator(field.passportNumber, {
                  initialValue: passportNumber,
                  rules: [
                    {
                      required: true,
                      type: 'string',
                      message: t('passport_number.required'),
                      whitespace: true,
                    },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder={t('passport_number.placeholder')}
                    disabled={this.state.locked}
                  />
                )
                // onKeyUp={localStorage.setItem('passportNumber', this.props.form.getFieldValue('passportNumber'))}
                }
              </Form.Item>
              <Form.Item {...formItemLayout} label={t('first_name.label')}>
                {getFieldDecorator(field.firstName, {
                  initialValue: firstName,
                  rules: [
                    {
                      required: true,
                      type: 'string',
                      message: t('first_name.required'),
                      whitespace: true,
                    },
                  ],
                })(
                  <Input size="large" placeholder={t('first_name.placeholder')} disabled={this.state.locked} />
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label={t('last_name.label')}>
                {getFieldDecorator(field.lastName, {
                  initialValue: lastName,
                  rules: [
                    {
                      required: true,
                      type: 'string',
                      message: t('last_name.required'),
                      whitespace: true,
                    },
                  ],
                })(<Input size="large" placeholder={t('last_name.placeholder')} disabled={this.state.locked} />)}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={t('passport_photo.label')}
                extra={t('passport_photo.description')}
              >
                {getFieldDecorator(field.passportImage, {
                  initialValue: passportImage,
                  rules: [{ required: true, message: t('passport_photo.required') }],
                })(
                  <Upload {...props}>
                    <Button size="large" style={{ borderRadius: '4px' }} disabled={this.state.locked}>
                      <Icon type="upload" />
                      {t('passport_photo.button')}
                    </Button>
                  </Upload>
                )}
              </Form.Item>
              <Form.Item {...formItemLayout}>
                <Button
                  size="large"
                  type="primary"
                  onClick={this.handleFormSubmit}
                  disabled={fields.some(f => !isFieldTouched(f))}
                >
                  {t('verify')}
                </Button>
              </Form.Item>
            </Form>
          </React.Fragment>
        )}
        {pending && (
          <div>
            <h3 className={styles.pending}>{t('message.pending')}</h3>
          </div>
        )}
        {verified && (
          <div>
            <Form layout="vertical" className={styles.form} hideRequiredMark>
              <Form.Item label={`${t('nationality.label')}`} {...sumbittedFormLayout}>
                <span>{this.props.currentUser.nationality}</span>
              </Form.Item>
              <Form.Item label={`${t('passport_number.label')}`} {...sumbittedFormLayout}>
                <span>{this.props.currentUser.passportNumber}</span>
              </Form.Item>
              <Form.Item label={`${t('first_name.label')}`} {...sumbittedFormLayout}>
                <span>{this.props.currentUser.firstName}</span>
              </Form.Item>
              <Form.Item label={`${t('last_name.label')}`} {...sumbittedFormLayout}>
                <span>{this.props.currentUser.lastName}</span>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    );
  }
}
