//本地调试环境配置
var path = require('path');
module.exports = {
  'env': 'local',
  'debug': true,
  'db': {
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'sP7mi2uazQAX',
    name: 'koa-action'
  },
  'redis': {
    host: '127.0.0.1',
    port: 6379
  }
};
