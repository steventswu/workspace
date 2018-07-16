import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import { translate } from 'react-i18next';

export default translate('header')(({ currentUser, logo, onClick, isLoading, t }) => {
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
        <Button
          type="primary"
          style={{ marginLeft: 8, marginRight: 15 }}
          onClick={onClick}
          loading={isLoading}
        >
          {isLoading ? '' : t(currentUser ? 'profile' : 'login')}
        </Button>
      </div>
    </React.Fragment>
  );
});
