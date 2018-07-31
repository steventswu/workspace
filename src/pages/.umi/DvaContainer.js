import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());

app.model({ namespace: 'auth', ...(require('/Users/Shawn/tixguru/cap-performance/src/models/auth.js').default) });
app.model({ namespace: 'login', ...(require('/Users/Shawn/tixguru/cap-performance/src/models/login.js').default) });
app.model({ namespace: 'performance', ...(require('/Users/Shawn/tixguru/cap-performance/src/models/performance.js').default) });
app.model({ namespace: 'profile', ...(require('/Users/Shawn/tixguru/cap-performance/src/models/profile.js').default) });
app.model({ namespace: 'token', ...(require('/Users/Shawn/tixguru/cap-performance/src/models/token.js').default) });
app.model({ namespace: 'user', ...(require('/Users/Shawn/tixguru/cap-performance/src/models/user.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
