const endpoint = process.env.NODE_ENV === 'development' ? '/auth' : '/api';

export default endpoint;
