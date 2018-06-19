import fetch from 'dva/fetch';
import { notification } from 'antd';
import store from '../index';

const codeMessage = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'Success',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  406: 'Not Acceptable',
  410: 'Gone',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};
function checkStatus(response) {
  if (response.status === 409) return response;
  if (response.status >= 200 && response.status < 300) return response;

  const errorText = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `Response Error ${response.status}`,
    description: errorText,
  });

  const error = new Error(errorText);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  // const defaultOptions = {
  //   credentials: 'include',
  // };
  const newOptions = { ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'PATCH'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch(e => {
      const { dispatch } = store;
      const status = e.name;
      if (status === 400 || status === 404 || status >= 500) {
        return { error: true };
      }
      if (status === 401 || status === 403) {
        return dispatch({
          type: 'login/logout',
        });
      }
    });
}
