export function getAuthority() {
  return localStorage.getItem('tixguru:authority');
}

export function setAuthority(authority) {
  return localStorage.setItem('tixguru:authority', authority);
}
