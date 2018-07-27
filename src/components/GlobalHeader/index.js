import React from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { Link } from 'dva/router';
import { translate } from 'react-i18next';

import styles from './index.less';

const menuRoutes = ['profile', 'portfolio', 'transactions', 'redeem'];

const GlobalHeader = ({ currentUser, logo, onClickLogout, onClickLogin, isLoading, t }) => {
  const button = (
    <Button
      type="primary"
      style={{ marginLeft: 8, marginRight: 15 }}
      onClick={currentUser ? undefined : onClickLogin}
      loading={isLoading}
    >
      {isLoading ? '' : t(currentUser ? 'account' : 'login')}
    </Button>
  );
  const menu = (
    <Menu onClick={e => e.key === 'logout' && onClickLogout()}>
      {menuRoutes.map(item => (
        <Menu.Item key={item}>
          <Link to={`/${item}`}>{t(item)}</Link>
        </Menu.Item>
      ))}
      <Menu.Divider />
      <Menu.Item key="logout">{t('logout')}</Menu.Item>
    </Menu>
  );
  const menuButton = (
    <Dropdown
      className={styles.linksMenu}
      trigger={['click']}
      overlay={
        <Menu>
          <Menu.Item>
            <Link style={{ padding: 15 }} to="/performance">
              {t('performance')}
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link style={{ padding: 15 }} to="/buy">
              {t('buy_cap')}
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link style={{ padding: 15 }} to="/faq">
              {t('faq')}
            </Link>
          </Menu.Item>
        </Menu>
      }
      placement="bottomCenter"
    >
      <span style={{ padding: 15 }}>MENU</span>
    </Dropdown>
  );
  return (
    <div className={styles.container}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>
      <div className={styles.linkContainer}>
        <div className={styles.links}>
          <Link style={{ padding: '0 15px' }} to="/performance">
            {t('performance')}
          </Link>
          <Link style={{ padding: '0 15px' }} to="/buy">
            {t('buy_cap')}
          </Link>
          <Link style={{ padding: '0 15px' }} to="/faq">
            {t('faq')}
          </Link>
        </div>
        <div className={styles.btn}>
          {menuButton}
          {currentUser ? (
            <Dropdown overlay={menu} placement="bottomCenter">
              {button}
            </Dropdown>
          ) : (
            button
          )}
        </div>
      </div>
    </div>
  );
};

export default translate('header')(GlobalHeader);
