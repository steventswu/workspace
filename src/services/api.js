import request from 'src/utils/request';
import endpoint from 'src/utils/endpoint';

export const sessionKey = 'tixguru:session';
export const identityKey = 'tixguru:identity';

const getSession = () => {
  const session = JSON.parse(localStorage.getItem(sessionKey));
  if (!session) throw Error('No session data');
  return session;
};

export const getIdentity = () => {
  const identity = JSON.parse(localStorage.getItem(identityKey)) || {};
  if (!identity) throw Error('No identity data');
  return identity;
};

export async function queryCurrent({ memberId, jwt }) {
  return request(`${endpoint.api}/members/${memberId}`, {
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
  return request(`${endpoint.api}/members/${memberId}/${type}`, {
    method: 'POST',
    headers: { authorization: jwt },
    body: params,
  });
}

export async function postEmailVerification(token) {
  return request(`${endpoint.api}/email_verification`, {
    method: 'POST',
    body: { token },
  });
}

export async function queryPerformance() {
  return request(`${endpoint.data}/tg-cap.php?q=13`, {
    method: 'GET',
  });
}

export async function queryNavChartData() {
  return request(`${endpoint.data}/nav-capp13btc.php`, {
    method: 'GET',
  });
}

export async function queryAnalysisData() {
  return request(`${endpoint.data}/tg30.php`, {
    method: 'GET',
  });
}

export async function queryCoinData({ startDate, symbol }) {
  return request(`${endpoint.data}/tg-tv-tech.php?start=${startDate}&symbol=${symbol}`, {
    method: 'GET',
  });
}

export async function createMember(params) {
  return request(`${endpoint.api}/members`, {
    method: 'POST',
    body: params,
  });
}

export async function getAuthInfo(type, params) {
  return request(`${endpoint.api}/${type}_token`, {
    method: 'POST',
    body: params,
  });
}

export async function queryProfile() {
  const { jwt } = getSession();
  return request(`${endpoint.api}/v2/members/profile`, {
    method: 'GET',
    headers: { authorization: jwt },
  });
}

export async function updateIdentity(formData) {
  const { jwt } = getSession();
  return request(`${endpoint.api}/v2/members/identity-verification`, {
    method: 'POST',
    body: formData,
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

export async function postWhitelist(address) {
  const { jwt } = getSession();
  return request(`${endpoint.api}/v2/members/whitelist/add`, {
    method: 'POST',
    body: { address },
    headers: { authorization: jwt },
  });
}
