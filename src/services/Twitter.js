import Codebird from 'codebird';

class Twitter {
  constructor() {
    this.cb = new Codebird();
    this.cb.setConsumerKey('EksjWHFxP3kB7wyyI3Kb2xsF3', process.env.TWITTER_SECRET);
    this.getRequestToken = this.getRequestToken.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
  }

  getRequestToken(callbackUrl) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.cb.__call('oauth_requestToken', { oauth_callback: callbackUrl }, (reply, rate, err) => {
        if (err || reply.error) return reject(err.error || reply.error);
        if (!reply) return reject();
        localStorage.setItem('oauth_token', reply.oauth_token);
        localStorage.setItem('oauth_token_secret', reply.oauth_token_secret);
        this.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
        // eslint-disable-next-line no-underscore-dangle
        this.cb.__call('oauth_authorize', {}, authUrl => resolve(authUrl));
      });
    });
  }

  getAccessToken({ oauth_verifier: verifier }) {
    return new Promise((resolve, reject) => {
      this.cb.setToken(
        localStorage.getItem('oauth_token'),
        localStorage.getItem('oauth_token_secret')
      );
      localStorage.removeItem('oauth_token');
      localStorage.removeItem('oauth_token_secret');

      // eslint-disable-next-line no-underscore-dangle
      this.cb.__call(
        'oauth_accessToken',
        {
          oauth_verifier: verifier,
        },
        (reply, rate, err) => {
          if (err) return reject(err.error);
          if (!reply) return reject();
          resolve({
            accessToken: reply.oauth_token,
            accessTokenSecret: reply.oauth_token_secret,
          });
        }
      );
    });
  }
}

export default new Twitter();
