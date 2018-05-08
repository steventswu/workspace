import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent({ memberId, jwt }) {
  return request(`/auth/members/${memberId}`, { method: 'GET', headers: { authorization: jwt } });
}
