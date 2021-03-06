import request from 'src/utils/request';
import endpoint from 'src/utils/endpoint';

export const identityKey = 'tixguru:identity';

export const getIdentity = () => {
  const identity = JSON.parse(localStorage.getItem(identityKey)) || {};
  if (!identity) throw Error('No identity data');
  return identity;
};

export async function queryPerformance() {
  return request(`${endpoint.data}/tg-cap2.php?q=13`, { method: 'GET' });
}

export async function queryNavChartData() {
  return request(`${endpoint.data}/nav-cap-chart.php`, { method: 'GET' });
}

export async function queryAnalysisData() {
  return request(`${endpoint.data}/tg30.php`, {
    method: 'GET',
  });
}

export async function queryCoinData({ startDate, symbol }) {
  return request(`${endpoint.data}/tg-tv-tech.php?start=${startDate}&symbol=${symbol}`, {
    method: 'GET',
  });
}
