import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Result from 'components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/user/login">
      <Button size="large" type="primary">
        Login
      </Button>
    </Link>
  </div>
);

@connect(({ loading }) => ({
  loading: loading.effects['user.verify'],
}))
export default class RegisterConfirm extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'user/verify', payload: window.location.search.slice(7) });
  }

  render() {
    return (
      <Result
        className={styles.registerResult}
        type="success"
        title={<div className={styles.title}>Confirm registration</div>}
        actions={actions}
        style={{ marginTop: 56 }}
      />
    );
  }
}
