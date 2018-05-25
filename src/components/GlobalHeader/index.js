import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';

export default class GlobalHeader extends React.PureComponent {
  render() {
    const { currentUser, logo, onClick } = this.props;
    return (
      <React.Fragment>
        <Link to="/">
          <img src={logo} style={{ marginLeft: 15 }} alt="logo" />
        </Link>
        <div style={{ float: 'right' }}>
          <Link style={{ padding: '0 15px' }} to="/">
            Home
          </Link>
          <Link style={{ padding: '0 15px' }} to="/performance">
            Performance
          </Link>
          <Link style={{ padding: '0 15px' }} to="/buy">
            Buy CAP
          </Link>
          <Button type="primary" style={{ marginLeft: 8, marginRight: 15 }} onClick={onClick}>
            {currentUser.email ? 'Profile' : 'Login'}
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
