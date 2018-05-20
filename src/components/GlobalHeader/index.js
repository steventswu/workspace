import React, { PureComponent } from 'react';
import { Layout, Menu, Icon, Dropdown, Button } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {
  render() {
    const { currentUser = {}, logo, onMenuClick, onLogin } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item>
          <Icon type="user" />Profile
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />Logout
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout.Header>
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
          <Link style={{ padding: '0 15px' }} to="/faq">
            FAQ
          </Link>
          {currentUser.email ? (
            <Dropdown overlay={menu}>
              <span className={styles.name}>{currentUser.email}</span>
            </Dropdown>
          ) : (
            <Button type="primary" style={{ marginLeft: 8 }} onClick={onLogin}>
              Login
            </Button>
          )}
        </div>
      </Layout.Header>
    );
  }
}
