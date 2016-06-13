'use strict';
// 应用配置文件
const path = require('path');
const local = require('./local');
const _ = require('lodash');

let config = {
  title: '',
  // 默认生产环境
  env: '',
  appName: 'koa-action',
  // 端口号配置
  port: 3000,
  // 模板所在的目录
  viewDir: path.join(__dirname, '..', 'view'),
  // log所在的目录
  logDir: path.join(__dirname, '..', 'log'),
  // 静态文件所在的目录
  staticDir: path.join(__dirname, '..', 'public'),
  db: {
    host: '127.0.0.1',
    port: 3306,
    username: '',
    password: '',
    name: ''
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
};

// 当NODE_ENV环境变量值为local时
// 本地调试环境
if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development') {
  config = _.extend(config, local);
}

module.exports = config;
