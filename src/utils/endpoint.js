const endpoint = process.env.NODE_ENV === 'development' ? '/auth' : '/api';

export const perfEndpoint =
  process.env.NODE_ENV === 'development' ? '/perf' : 'http://coinhub.capital/cob/api';

export default endpoint;
