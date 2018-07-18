import React from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { Button } from 'antd';
import Exception from 'src/components/Exception';
import i18n from 'src/i18n';

const Action = (
  <Link to="/" replace>
    <Button type="primary">{i18n.t('common:return')}</Button>
  </Link>
);

const exceptionType = ['403', '404', '500'];

export default function ExceptionLayout({ location: { pathname = '' } = {} }) {
  let [, type] = pathname.match(/\/exception\/(\d{3})/);
  if (!exceptionType.includes(type)) {
    router.replace('/exception/404');
  }
  return (
    <Exception
      type={type}
      desc={i18n.t(`error:exception.${type}`)}
      style={{ minHeight: 500 }}
      actions={Action}
    />
  );
}
