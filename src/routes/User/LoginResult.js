import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import { translate } from 'react-i18next';
import Result from 'components/Result';
import styles from './LoginResult.less';

const LoginResult = ({
  location: { state: { email = 'you@example.com', type = 'reset', link = { to: '/' } } = {} },
  t,
}) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={<div className={styles.title}>{t(`${type}.success`, { email })}</div>}
    description={t(`${type}.success_message`)}
    actions={
      <div className={styles.actions}>
        <Link to={link.to}>
          <Button size="large">
            {link.route ? t('common:return_to', { route: link.route }) : t('common:return')}
          </Button>
        </Link>
      </div>
    }
    style={{ marginTop: 56 }}
  />
);

export default translate(['user', 'common'])(LoginResult);
