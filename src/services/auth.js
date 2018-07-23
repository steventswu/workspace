import fetch from 'dva/fetch';
import request from 'src/utils/request';
import session from 'src/utils/session';
import i18n from 'src/i18n';

export async function fetchMember() {
  const { memberId, jwt } = session.get();
  return request(`/api/members/${memberId}`, {
    method: 'GET',
    headers: { authorization: jwt },
  });
}

export async function verifyEmail(token) {
  return request(`/api/email_verification`, {
    method: 'POST',
    body: { token },
  });
}

export async function authenticate(type, params) {
  return request(`/api/${type}_token`, {
    method: 'POST',
    body: params,
  });
}

export async function validateFacebookToken(accessToken) {
  return fetch(
    `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${accessToken}`
  )
    .then(response => response.json())
    .then(json => ({ ...json.data, accessToken }));
}

export async function validateEmailPermission(accessToken) {
  const { data } = await fetch(
    `https://graph.facebook.com/me/permissions?access_token=${accessToken}`
  ).then(res => res.json());
  const emailPermission = data.find(i => i.permission === 'email');
  if (emailPermission.status === 'declined')
    throw Error(i18n.t('message:facebook_email_permission'));
}
