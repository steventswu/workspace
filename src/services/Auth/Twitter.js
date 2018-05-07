import Codebird from 'codebird';

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
    this.cb.__call('oauth_requestToken', { oauth_callback: 'oob' }, (reply, rate, err) => {
      if (err) {
        console.log('error response or timeout exceeded' + err.error);
      }
      if (reply) {
        // stores it
        this.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
        this.oauth_token = reply.oauth_token;
        this.oauth_token_secret = reply.oauth_token_secret;
        // gets the authorize screen URL
        this.cb.__call('oauth_authorize', {}, auth_url => {
          window.codebird_auth = window.open(auth_url, 'tixguru', 'height=500,width=800');
        });
      }
    });
  }

  getTwitterAccessToken(verifier) {
    return new Promise((resolve, reject) => {
      this.cb.__call('oauth_accessToken', { oauth_verifier: verifier }, (reply, rate, err) => {
        if (err) {
          console.log('error response or timeout exceeded' + err.error);
        }
        if (reply) {
          // store the authenticated token, which may be different from the request token (!)
          this.cb.setToken(reply.oauth_token, reply.oauth_token_secret);

          resolve(reply);
        }

        // if you need to persist the login after page reload,
        // consider storing the token in a cookie or HTML5 local storage
      });
    });
  }
}

export default new Twitter();
