class Facebook {
  constructor() {
    window.fbAsyncInit = function fbAsyncInit() {
      window.FB.init({
        appId: 2098112697085130,
        cookie: false, // enable cookies to allow the server to access
        xfbml: false, // parse social plugins on this page
        version: 'v2.12', // use version 2.1
      });
    };
    (function fbAsyncInitSdk(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      const js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  /* eslint-disable class-methods-use-this */
  getFBToken() {
    return new Promise(resolve => {
      window.FB.login(
        response => {
          resolve({
            accessToken: response.authResponse.accessToken,
            facebookId: response.authResponse.userID,
          });
        },
        { scope: 'email' }
      );
    });
  }
  /* eslint-enable class-methods-use-this */
}

export default new Facebook();
