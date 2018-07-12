import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import Result from 'components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/">
      <Button size="large">Return</Button>
    </Link>
  </div>
);

export default ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      location.state && (
        <div className={styles.title}>
          Account: {location.state.email} is successfully registered!
        </div>
      )
    }
    description="You will shortly receive a confirmation email that you need to complete the activation process."
    actions={actions}
    style={{ marginTop: 56 }}
  />
);
