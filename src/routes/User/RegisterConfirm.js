import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { translate } from 'react-i18next';
import Result from 'components/Result';
import styles from './LoginResult.less';

@connect(({ loading }) => ({
  loading: loading.effects['user.verifyEmail'],
}))
@translate(['user', 'common'])
export default class RegisterConfirm extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'user/verifyEmail', payload: window.location.search.slice(7) });
  }

  render() {
    const { t } = this.props;
    return (
      <Result
        className={styles.registerResult}
        type="success"
        title={<div className={styles.title}>{t('register.confirm')}</div>}
        actions={
          <div className={styles.actions}>
            <Link to="/user/login">
              <Button size="large" type="primary">
                {t('common:login')}
              </Button>
            </Link>
          </div>
        }
        style={{ marginTop: 56 }}
      />
    );
  }
}
