import React from 'react';
import { Redirect } from 'dva/router';
import { EXCEPTION_404 } from 'src/routes';

export default () => <Redirect to={EXCEPTION_404} />;
