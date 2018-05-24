const endpoint = process.env.NODE_ENV === 'development' ? '/auth' : '/api';

export const perfEndpoint =
  process.env.NODE_ENV === 'development' ? '/perf' : 'https://data.tixguru.co/cob/api';

export default endpoint;
