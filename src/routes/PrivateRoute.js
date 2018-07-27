import { Route, Redirect } from 'react-router-dom';
import session from 'src/utils/session';

export default args => {
  const { render, ...rest } = args;
  if (!session.exist()) {
    return <Redirect to="/" />;
  }
  return <Route {...rest} render={props => <div>{render(props)}</div>} />;
};
