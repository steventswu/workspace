import fetch from 'dva/fetch';
import endpoint from 'src/utils/endpoint';

export async function queryIndexOverall({ amount, start, end }) {
  return fetch(`${endpoint.data}/index_overall.php?amount=${amount}&start=${start}&end=${end}`).then(r => r.json());
}
