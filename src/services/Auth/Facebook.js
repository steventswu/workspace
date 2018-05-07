class Facebook {
  constructor(props) {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: 2098112697085130,
        cookie: false, // enable cookies to allow the server to access
        xfbml: false, // parse social plugins on this page
        version: 'v2.12', // use version 2.1
      });
    };
    (function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      const js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  getFBToken() {
    return new Promise((resolve, reject) => {
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
}

export default new Facebook();
