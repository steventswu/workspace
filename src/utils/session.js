export const SESSION_KEY = 'tixguru:session';

let session = null;

const get = () => {
  if (session) return session;
  session = JSON.parse(localStorage.getItem(SESSION_KEY));
  if (!session) throw Error('No session data');
  return session;
};

const set = data => {
  session = data;
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
};

const destroy = () => {
  localStorage.removeItem(SESSION_KEY);
  session = null;
};

const exist = () => Boolean(localStorage.getItem(SESSION_KEY));

export default { get, set, destroy, exist };
