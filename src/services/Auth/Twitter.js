import Codebird from 'codebird';
import QueryString from 'query-string';

class Twitter {
  constructor() {
    this.cb = new Codebird();
    this.cb.setConsumerKey(
      'DvI1YZQMbuQLi2s9Yli6HLanx',
      '93qjYncboLwTnI3ksaPIaElKeqjKP1dR1oc5sja0UHrHSen9BK'
    );
    this.getTwitterToken = this.getTwitterRequestToken.bind(this);
  }

  async getTwitterRequestToken() {
    this.cb.__call(
      'oauth_requestToken',
      { oauth_callback: 'http://localhost:3000/login' },
      (reply, rate, err) => {
        if (err) {
          console.log('error response or timeout exceeded' + err.error);
        }
        if (reply) {
          localStorage.setItem('oauth_token', reply.oauth_token);
          localStorage.setItem('oauth_token_secret', reply.oauth_token_secret);
          this.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
          this.cb.__call('oauth_authorize', {}, auth_url => {
            window.location = auth_url;
          });
        }
      }
    );
  }

  getTwitterAccessToken(verifier) {
    return new Promise((resolve, reject) => {
      const parsed = QueryString.parse(window.location.search);

      this.cb.setToken(
        localStorage.getItem('oauth_token'),
        localStorage.getItem('oauth_token_secret')
      );

      this.cb.__call(
        'oauth_accessToken',
        {
          oauth_verifier: parsed.oauth_verifier,
        },
        (reply, rate, err) => {
          if (err) {
            console.log('error response or timeout exceeded' + err.error);
          }
          if (reply) {
            this.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
            resolve(reply);
          }
        }
      );
    });
  }
}

export default new Twitter();
