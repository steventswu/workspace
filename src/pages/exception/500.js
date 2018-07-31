import React from 'react';
import Link from 'umi/link';
import { Button } from 'antd';
import Exception from 'src/components/Exception';
import i18n from 'src/i18n';
import { HOME } from 'src/routes';

const Action = (
  <Link to={HOME} replace>
    <Button type="primary">{i18n.t('common:return')}</Button>
  </Link>
);

export default function Exception404() {
  return (
    <Exception
      type="500"
      desc={i18n.t(`error:exception.500`)}
      style={{ minHeight: 500 }}
      actions={Action}
    />
  );
}
