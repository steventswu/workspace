import request from '../utils/request';
import endpoint, { perfEndpoint } from '../utils/endpoint';

export async function queryCurrent({ memberId, jwt }) {
  return request(`${endpoint}/members/${memberId}`, {
    method: 'GET',
    headers: { authorization: jwt },
  });
}

export const POST_MEMBER_TYPE = {
  WALLET_ADDRESS: 'wallet_address',
  BUY_TERMS_LOG: 'buy_terms_log',
};

export async function postMember({ walletAddress, type }, { memberId, jwt }) {
  return request(`${endpoint}/members/${memberId}/${type}`, {
    method: 'POST',
    headers: { authorization: jwt },
    body: { walletAddress },
  });
}

export async function postEmailVerification(token) {
  return request(`${endpoint}/email_verification`, {
    method: 'POST',
    body: { token },
  });
}

export async function queryPerformance() {
  return request(`${perfEndpoint}/tg-cap.php?q=20`, {
    method: 'GET',
  });
}
