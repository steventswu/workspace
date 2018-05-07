class Google {
  constructor() {
    ((d, s, id) => {
      const gs = d.getElementsByTagName(s)[0];
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js';
      gs.parentNode.insertBefore(js, gs);
    })(document, 'script', 'google-platform');

    this.init = this.init.bind(this);
    this.getGoogleToken = this.getGoogleToken.bind(this);
  }

  init() {
    return new Promise((resolve, reject) => {
      window.gapi.load('auth2', () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init({
            client_id: '1098771771493-h535si5vhnrt3m88iqqf0014a0qosmrc.apps.googleusercontent.com',
            fetch_basic_profile: true,
            scope: 'profile email',
          });
          resolve();
        }
        resolve();
      });
    });
  }

  async getGoogleToken() {
    await this.init();
    const auth2 = window.gapi.auth2.getAuthInstance();
    const options = {
      prompt: 'select_account',
      scope: 'profile email',
    };
    const response = await auth2.signIn(options);
    const accessToken = response.Zi.access_token;
    const googleId = response.El;

    return { accessToken, googleId };
  }
}

export default new Google();
