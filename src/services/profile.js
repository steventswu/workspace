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
