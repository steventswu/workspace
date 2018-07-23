import { notification } from 'antd';
import i18n from 'src/i18n';

const redirectKey = 'LOGIN_REDIRECT';

export const redirect = (time = 5) =>
  new Promise(resolve => {
    let sec = time;
    notification.open({
      key: redirectKey,
      message: i18n.t('message:login_redirect', { sec }),
    });
    const timer = setInterval(() => {
      sec -= 1;
      if (sec === 0) {
        clearInterval(timer);
        notification.destroy();
        return resolve();
      }
      notification.open({
        key: redirectKey,
        message: i18n.t('message:login_redirect', { sec }),
      });
    }, 1000);
  });
