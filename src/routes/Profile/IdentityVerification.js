import React from 'react';
import { Form, Input, Upload, Button, Icon, Select, message } from 'antd';
import { COUNTRY } from 'src/utils/country';
import { identityKey, getIdentity } from 'src/services/api';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { translate } from 'react-i18next';

import { VERIFIED, PENDING, UNVERIFIED } from 'src/utils/status';
import styles from './IdentityVerification.less';

export const ROUTE = {
  ROOT: '/profile',
  HOME: '/profile/home',
  WALLET_VERIFICATION: '/profile/wallet',
  REDEEM: '/profile/redeem',
  VERIFICATION: '/profile/verification',
};

const formItemLayout = {
  wrapperCol: {
    span: 6,
  },
};

@Form.create()
@connect(({ user, profile }) => ({
  currentUser: user,
  profile,
}))
@translate('identityVerification')
export default class IdentityVerification extends React.Component {
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
          memberId: this.props.currentUser.id,
          passportImage: passFile,
        };
        Object.keys(values).forEach(key => {
          if (values[key].file) {
            return formData.append(key, values[key].file);
          }
          formData.append(key, values[key]);
        });
        localStorage.setItem(identityKey, JSON.stringify(values));
        formData.append('memberId', this.props.currentUser.id);
        this.setState({
          locked: true,
        });
        message.info(this.props.t('message.submitted'));
        this.props.dispatch({
          type: 'profile/validateIdentify',
          payload: { formData, formValues },
        });
        setTimeout(() => {
          this.props.dispatch({ type: 'user/fetchCurrent' });
          this.props.dispatch(routerRedux.push(ROUTE.VERIFICATION));
        }, 1000);
      }
    });
  };

  render() {
    const { nationality, passportNumber, firstName, lastName, passportImage } = getIdentity();
    const { currentUser: { isIdentityVerified } } = this.props;
    const unverified = isIdentityVerified === UNVERIFIED;
    const pending = isIdentityVerified === PENDING;
    const verified = isIdentityVerified === VERIFIED;
    const { form: { getFieldDecorator }, t } = this.props;
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
    return (
      <div>
        {unverified && (
          <React.Fragment>
            <h1>Identity Verification</h1>
            <Form layout="vertical" className={styles.form} hideRequiredMark>
              <Form.Item {...formItemLayout} label={t('nationality.label')}>
                {getFieldDecorator('nationality', {
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
                {getFieldDecorator('passportNumber', {
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
                    placeholder={t('passport_number.placeholder')}
                    disabled={this.state.locked}
                  />
                )
                // onKeyUp={localStorage.setItem('passportNumber', this.props.form.getFieldValue('passportNumber'))}
                }
              </Form.Item>
              <Form.Item {...formItemLayout} label={t('first_name.label')}>
                {getFieldDecorator('firstName', {
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
                  <Input placeholder={t('first_name.placeholder')} disabled={this.state.locked} />
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label={t('last_name.label')}>
                {getFieldDecorator('lastName', {
                  initialValue: lastName,
                  rules: [
                    {
                      required: true,
                      type: 'string',
                      message: t('last_name.required'),
                      whitespace: true,
                    },
                  ],
                })(<Input placeholder={t('last_name.placeholder')} disabled={this.state.locked} />)}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={t('passport_photo.label')}
                extra={t('passport_photo.description')}
              >
                {getFieldDecorator('passportImage', {
                  initialValue: passportImage,
                  rules: [{ required: true, message: t('passport_photo.required') }],
                })(
                  <Upload {...props}>
                    <Button disabled={this.state.locked}>
                      <Icon type="upload" />
                      {t('passport_photo.button')}
                    </Button>
                  </Upload>
                )}
              </Form.Item>
              <Form.Item {...formItemLayout}>
                <Button type="primary" onClick={this.handleFormSubmit} disabled={this.state.locked}>
                  {t('verify')}
                </Button>
              </Form.Item>
            </Form>
          </React.Fragment>
        )}
        {pending && <h2 className={styles.pending}>{t('message.pending')}</h2>}
        {verified && (
          <h2 className={styles.verified}>
            <Icon type="check-circle-o" />
            {t('message.verified')}
          </h2>
        )}
      </div>
    );
  }
}
