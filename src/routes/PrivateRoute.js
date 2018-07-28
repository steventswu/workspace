import { Route, Redirect } from 'react-router-dom';
import session from 'src/utils/session';

export default args => {
  const { render, ...rest } = args;
  if (!session.exist()) {
    return <Redirect to="/user/login" />;
  }
  return <Route {...rest} render={render} />;
};
