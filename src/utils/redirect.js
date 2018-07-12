export const LAST_PATH = 'tixguru:lastPath';

const set = path => {
  localStorage.setItem(LAST_PATH, path);
};

const get = () => {
  return localStorage.getItem(LAST_PATH);
};

const destroy = () => {
  localStorage.removeItem(LAST_PATH);
};

export default { set, get, destroy };
