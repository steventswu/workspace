import React from 'react';
import { connect } from 'dva';
import { translate } from 'react-i18next';
import styles from './UserProfile.less';

@connect(({ user, loading }) => ({
  email: user.email,
  loading: loading.effects['profile/fetch'],
}))
@translate('profile')
export default class UserProfile extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'profile/fetch' });
  }

  render() {
    const { t, email } = this.props;
    return (
      <React.Fragment>
        <h1>{t('user_profile')}</h1>
        <div className={styles.email}>
          Email
          <p>{email}</p>
        </div>
      </React.Fragment>
    );
  }
}
