import Codebird from 'codebird';
import { parse } from 'qs';

class Twitter {
  constructor() {
    this.cb = new Codebird();
    this.cb.setConsumerKey(
      'DvI1YZQMbuQLi2s9Yli6HLanx',
      '93qjYncboLwTnI3ksaPIaElKeqjKP1dR1oc5sja0UHrHSen9BK'
    );
    this.getRequestToken = this.getRequestToken.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
  }

  getRequestToken(callbackUrl) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.cb.__call('oauth_requestToken', { oauth_callback: callbackUrl }, (reply, rate, err) => {
        if (err) return reject(err.error);
        if (!reply) return reject();
        localStorage.setItem('oauth_token', reply.oauth_token);
        localStorage.setItem('oauth_token_secret', reply.oauth_token_secret);
        this.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
        // eslint-disable-next-line no-underscore-dangle
        this.cb.__call('oauth_authorize', {}, authUrl => resolve(authUrl));
      });
    });
  }

  getAccessToken(qs) {
    return new Promise((resolve, reject) => {
      const parsed = parse(qs);
      this.cb.setToken(
        localStorage.getItem('oauth_token'),
        localStorage.getItem('oauth_token_secret')
      );

      // eslint-disable-next-line no-underscore-dangle
      this.cb.__call(
        'oauth_accessToken',
        {
          oauth_verifier: parsed.oauth_verifier,
        },
        (reply, rate, err) => {
          if (err) return reject(err.error);
          if (!reply) return reject();
          this.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
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
