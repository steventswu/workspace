const endpoint = process.env.NODE_ENV === 'development' ? '/auth' : '/api';

export const perfEndpoint =
  process.env.NODE_ENV === 'development'
    ? '/perf'
    : `${window.location.origin.replace('cap', 'data')}/cob/api`;

export default endpoint;
