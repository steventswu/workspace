import request from 'src/utils/request';
import session from 'src/utils/session';

export async function fetchPortfolio() {
  const { jwt } = session.get();
  return request('/api/v2/members/portfolio', {
    method: 'GET',
    headers: { authorization: jwt },
  });
}

export async function fetchTransactions() {
  const { jwt } = session.get();
  return request('/api/v2/members/transactions', {
    method: 'GET',
    headers: { authorization: jwt },
  });
}

export async function fetchProfile() {
  const { jwt } = session.get();
  return request('/api/v2/members/profile', {
    method: 'GET',
    headers: { authorization: jwt },
  });
}

export async function updateIdentity(formData) {
  const { jwt } = session.get();
  return request('/api/v2/members/identity-verification', {
    method: 'POST',
    body: formData,
    headers: { authorization: jwt },
  });
}

export async function addWhitelist(address) {
  const { jwt } = session.get();
  return request('/api/v2/members/whitelist/add', {
    method: 'POST',
    body: { address },
    headers: { authorization: jwt },
  });
}

export async function createMember(params) {
  return request(`/api/members`, {
    method: 'POST',
    body: params,
  });
}

export async function updateMemberWallet(params) {
  const { memberId, jwt } = session.get();
  return request(`/api/members/${memberId}/wallet_address`, {
    method: 'POST',
    headers: { authorization: jwt },
    body: params,
  });
}

export async function updateMemberLog(params) {
  const { memberId, jwt } = session.get();
  return request(`/api/members/${memberId}/buy_terms_log`, {
    method: 'POST',
    headers: { authorization: jwt },
    body: params,
  });
}

export async function updateMemberTransactions(params) {
  const { memberId, jwt } = session.get();
  return request(`/api/members/${memberId}/transactions`, {
    method: 'POST',
    headers: { authorization: jwt },
    body: params,
  });
}

export async function forgotPassword({ email }) {
  return request(`/api/v2/members/forgot-password`, {
    method: 'POST',
    body: { email },
  });
}

export async function updateMemberPassword({ oldPassword, newPassword }) {
  const { jwt } = session.get();
  return request(`/api/v2/members/password`, {
    method: 'PATCH',
    headers: { authorization: jwt },
    body: { oldPassword, newPassword },
  });
}
