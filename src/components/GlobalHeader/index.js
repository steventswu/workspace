import React, { PureComponent } from 'react';
import { Menu, Icon, Dropdown, Button } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {
  render() {
    const { currentUser = {}, logo, onMenuClick, onLogin } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        {/* <Menu.Item key="profile">
          <Icon type="user" />Profile
        </Menu.Item> */}
        <Menu.Item key="logout">
          <Icon type="logout" />Logout
        </Menu.Item>
      </Menu>
    );
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
          <a
            style={{ padding: '0 15px' }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://medium.com/@pr_48521/cap-faq-3c0b5d0d0303"
          >
            FAQ
          </a>
          {currentUser.email ? (
            <Dropdown overlay={menu}>
              <Button style={{ marginLeft: 8 }}>
                {currentUser.email} <Icon type="down" />
              </Button>
            </Dropdown>
          ) : (
            <Button type="primary" style={{ marginLeft: 8 }} onClick={onLogin}>
              Login
            </Button>
          )}
        </div>
      </React.Fragment>
    );
  }
}
