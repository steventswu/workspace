import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import { translate } from 'react-i18next';
import Result from 'components/Result';
import styles from './RegisterResult.less';

const RegisterResult = ({ location, t }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      location.state && (
        <div className={styles.title}>{t('register.success', { email: location.state.email })}</div>
      )
    }
    description={t('register.success_message')}
    actions={
      <div className={styles.actions}>
        <Link to="/">
          <Button size="large">{t('common:return')}</Button>
        </Link>
      </div>
    }
    style={{ marginTop: 56 }}
  />
);

export default translate(['user', 'common'])(RegisterResult);
