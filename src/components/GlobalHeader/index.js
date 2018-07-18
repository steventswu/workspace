import React from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { Link } from 'dva/router';
import { translate } from 'react-i18next';

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
  return (
    <React.Fragment>
      <Link to="/">
        <img src={logo} style={{ marginLeft: 15 }} alt="logo" />
      </Link>
      <div style={{ float: 'right' }}>
        <Link style={{ padding: '0 15px' }} to="/">
          {t('home')}
        </Link>
        <Link style={{ padding: '0 15px' }} to="/performance">
          {t('performance')}
        </Link>
        <Link style={{ padding: '0 15px' }} to="/buy">
          {t('buy_cap')}
        </Link>
        {currentUser ? (
          <Dropdown overlay={menu} placement="bottomCenter">
            {button}
          </Dropdown>
        ) : (
          button
        )}
      </div>
    </React.Fragment>
  );
};

export default translate('header')(GlobalHeader);
