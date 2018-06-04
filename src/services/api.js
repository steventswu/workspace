import request from 'src/utils/request';
import endpoint, { perfEndpoint } from 'src/utils/endpoint';

export const sessionKey = 'tixguru:session';

const getSession = () => {
  const session = JSON.parse(localStorage.getItem(sessionKey));
  if (!session) throw Error('No session data');
  return session;
};

export async function queryCurrent({ memberId, jwt }) {
  return request(`${endpoint}/members/${memberId}`, {
    method: 'GET',
    headers: { authorization: jwt },
  });
}

export const UPDATE_MEMBER_TYPE = {
  WALLET_ADDRESS: 'wallet_address',
  BUY_TERMS_LOG: 'buy_terms_log',
  TRANSACTION: 'transactions',
};

export async function updateMember(type, params) {
  const { memberId, jwt } = getSession();
  return request(`${endpoint}/members/${memberId}/${type}`, {
    method: 'POST',
    headers: { authorization: jwt },
    body: params,
  });
}

export async function postEmailVerification(token) {
  return request(`${endpoint}/email_verification`, {
    method: 'POST',
    body: { token },
  });
}

export async function queryPerformance() {
  return request(`${perfEndpoint}/tg-cap.php?q=13`, {
    method: 'GET',
  });
}

export async function queryCoinData({ startDate, symbol }) {
  return request(`${perfEndpoint}/tg-tv-tech.php?start=${startDate}&symbol=${symbol}`, {
    method: 'GET',
  });
}

export async function createMember(params) {
  return request(`${endpoint}/members`, {
    method: 'POST',
    body: params,
  });
}

export async function getAuthInfo(type, params) {
  return request(`${endpoint}/${type}_token`, {
    method: 'POST',
    body: params,
  });
}

export async function queryProfile() {
  const { memberId, jwt } = getSession();
  return request(`${endpoint}/members/${memberId}/profile`, {
    method: 'GET',
    headers: { authorization: jwt },
  });
}

export async function validateFacebookToken(accessToken) {
  return fetch(
    `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${accessToken}`
  )
    .then(response => response.json())
    .then(json => ({ ...json.data, accessToken }));
}
