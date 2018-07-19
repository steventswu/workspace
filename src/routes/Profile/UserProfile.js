import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { translate } from 'react-i18next';
import { routerRedux } from 'dva/router';
import styles from './UserProfile.less';

@connect(({ user, loading }) => ({
  email: user.email,
  loading: loading.effects['profile/fetch'],
}))
@translate(['profile', 'common'])
export default class UserProfile extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'profile/fetch' });
  }

  handleButtonClick = () => {
    this.props.dispatch(routerRedux.push('/user/change-password'));
  };

  render() {
    const { t, email } = this.props;
    return (
      <React.Fragment>
        <h1>{t('user_profile')}</h1>
        <div className={styles.email}>
          {t('email')}
          <p>{email}</p>
        </div>
        <Button onClick={this.handleButtonClick}>{t('common:change_password')}</Button>
      </React.Fragment>
    );
  }
}
