import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import session from 'src/utils/session';

import Home from './Home';

@connect(({ user, loading }) => ({
  currentUser: user.email,
  isLoading: loading.models.auth,
}))
export default class HomePage extends React.Component {
  state = {
    selectedCard: null,
  };

  componentDidMount() {
    if (!this.props.currentUser && session.exist()) {
      this.props.dispatch({ type: 'auth/fetchMember' });
    }
  }

  handleLogout = () => {
    this.props.dispatch({ type: 'login/logout' });
  };

  handleLogin = () => {
    this.props.dispatch(routerRedux.push('/user/login'));
  };

  handleSelect = selected => {
    if (this.state.selected === selected) return this.setState({ selectedCard: null });
    this.setState({ selected });
  };

  handleClick = id => () => {
    this.props.dispatch(routerRedux.push({ pathname: '/performance', state: { id } }));
  };

  render() {
    return (
      <Home
        {...this.props}
        {...this.state}
        onClickLogout={this.handleLogout}
        onClickLogin={this.handleLogin}
        onSelectCard={this.handleSelect}
        onClickDetails={this.handleClick}
      />
    );
  }
}
