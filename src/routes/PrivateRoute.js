import { Route, Redirect } from 'react-router-dom';
import session from 'src/utils/session';
import redirect from 'src/utils/redirect';

export default args => {
  const { render, ...rest } = args;
  if (!session.exist()) {
    redirect.set(args.path);
    return <Redirect to="/user/login" />;
  }
  return <Route {...rest} render={render} />;
};
