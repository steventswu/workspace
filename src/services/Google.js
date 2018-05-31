const init = () => {
  return new Promise(resolve => {
    ((d, s, id) => {
      const gs = d.getElementsByTagName(s)[0];
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=onLoadCallback';
      gs.parentNode.insertBefore(js, gs);
    })(document, 'script', 'google-platform');

    window.onLoadCallback = () => {
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
    };
  });
};

const signIn = async () => {
  await init();
  const authInstance = window.gapi.auth2.getAuthInstance();
  return authInstance.signIn({
    prompt: 'select_account',
    scope: 'profile email',
    ux_mode: 'redirect',
  });
};

const getAccessToken = () =>
  new Promise(async resolve => {
    await init();

    const authInstance = window.gapi.auth2.getAuthInstance();

    const timer = setInterval(() => {
      if (authInstance.isSignedIn.get()) {
        const user = authInstance.currentUser.get();
        resolve({
          accessToken: user.getAuthResponse().access_token,
          googleId: user.getId(),
        });
        clearInterval(timer);
      }
    }, 1000);
  });

export default { signIn, getAccessToken };
