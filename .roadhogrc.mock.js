import mockjs from 'mockjs';
import { portfolioData } from './mock/portfolio';
import { transactionsData } from './mock/transactions';
import { userData } from './mock/user';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

const randomPick = (data, empty) => {
  if (Math.random() > 0.5) return data;
  return empty;
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'GET /api/members/:memberId': (req, res) => res.send({ ...userData, id: req.params.memberId }),
  'GET /api/v2/members/portfolio': (req, res) => res.send(randomPick(portfolioData, [])),
  'GET /api/v2/members/transactions': (req, res) => res.send(transactionsData),
  'POST /api/v2/members/identity-verification': {},
  'POST /api/v2/members/whitelist/add': {},
  'POST /api/members/*': {},
  'POST /api/members': {},
  'POST /api/normal_token': (req, res) => {
    req.body.email === 'pr@tixguru.co'
      ? res.send({
          jwt:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjVhZmUzYzgxZmM4MTg3MDAwMWZiN2MxMyIsImVtYWlsIjoicHJAdGl4Z3VydS5jbyIsImV4cCI6MTUzMjU5NTc2OCwiaWF0IjoxNTMxOTkwOTY4fQ.-ByniA95v40QRMlwNC-C0R-6OtznpimGS8HDSwZzf8k',
          memberId: '5afe3c81fc81870001fb7c13',
        })
      : res.status(404).end();
  },
  'POST /api/google_token': {},
  'POST /api/facebook_token': {},
};

export default (noProxy ? {} : delay(proxy, 3000));
