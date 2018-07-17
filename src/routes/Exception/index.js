import React from 'react';
import { Link } from 'dva/router';
import { Button } from 'antd';
import Exception from 'src/components/Exception';
import i18n from 'src/i18n';

const Action = (
  <Link to="/" replace>
    <Button type="primary">{i18n.t('common:return')}</Button>
  </Link>
);

const Unauthorized = () => (
  <Exception
    type="403"
    desc={i18n.t('error:exception.403')}
    style={{ minHeight: 500 }}
    actions={Action}
  />
);

const NotFound = () => (
  <Exception
    type="404"
    desc={i18n.t('error:exception.404')}
    style={{ minHeight: 500 }}
    actions={Action}
  />
);

const InternalError = () => (
  <Exception
    type="500"
    desc={i18n.t('error:exception.500')}
    style={{ minHeight: 500 }}
    actions={Action}
  />
);

export default { Unauthorized, NotFound, InternalError };
