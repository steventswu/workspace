import request from '../utils/request';
import endpoint from '../utils/endpoint';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent({ memberId, jwt }) {
  return request(`${endpoint}/members/${memberId}`, {
    method: 'GET',
    headers: { authorization: jwt },
  });
}
