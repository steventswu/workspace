import React from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { Link } from 'dva/router';
import { translate } from 'react-i18next';

import Container from '../Container';
import styles from './index.less';
import { PROFILE, PORTFOLIO, TRANSACTIONS, REDEEM, PERFORMANCE, BUY, HOME } from 'src/routes';

const menuRoutes = [PROFILE, PORTFOLIO, TRANSACTIONS, REDEEM];

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
          <Link to={item}>{t(item.substring(1))}</Link>
        </Menu.Item>
      ))}
      <Menu.Divider />
      <Menu.Item key="logout">{t('logout')}</Menu.Item>
    </Menu>
  );
  const Links = {
    performance: (
      <Link style={{ padding: 15 }} to={PERFORMANCE}>
        {t('performance')}
      </Link>
    ),
    buy: (
      <Link style={{ padding: 15 }} to={BUY}>
        {t('buy_cap')}
      </Link>
    ),
    faq: (
      <a
        style={{ padding: 15 }}
        target="_blank"
        rel="noopener noreferrer"
        href="https://medium.com/tixguru/cap-faq-7f5a5439a72f"
      >
        {t('faq')}
      </a>
    ),
  };
  const menuButton = (
    <Dropdown
      className={styles.linksMenu}
      trigger={['click']}
      overlay={
        <Menu>
          <Menu.Item>{Links.performance}</Menu.Item>
          <Menu.Item>{Links.buy}</Menu.Item>
          <Menu.Item>{Links.faq}</Menu.Item>
        </Menu>
      }
      placement="bottomCenter"
    >
      <span style={{ padding: 15 }}>MENU</span>
    </Dropdown>
  );
  return (
    <Container>
      <div className={styles.container}>
        <Link to={HOME}>
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
        <div className={styles.linkContainer}>
          <div className={styles.links}>
            {Links.performance}
            {Links.buy}
            {Links.faq}
          </div>
          <div className={styles.btn}>
            {menuButton}
            {currentUser ? (
              <Dropdown trigger={['click']} overlay={menu} placement="bottomCenter">
                {button}
              </Dropdown>
            ) : (
              button
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default translate('header')(GlobalHeader);
