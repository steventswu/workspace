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

export async function patchMember(walletAddress, { memberId, jwt }) {
  return request(`${endpoint}/members/${memberId}`, {
    method: 'PATCH',
    headers: { authorization: jwt },
    body: { walletAddress },
  });
}

export async function verifyEmail(token) {
  return request(`${endpoint}/email_verification`, {
    method: 'POST',
    body: { token },
  });
}
