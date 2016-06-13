// const debug = require('debug')('koa-action');
const koa = require('koa');
// 配置文件
const config = require('./config/config');

const app = koa();
app.use(function* (next) {
  // config 注入中间件，方便调用配置信息
  if (!this.config) {
    this.config = config;
  }
  yield next;
});

// log记录
const miniLogger = require('mini-logger');
const logger = miniLogger({
  dir: config.logDir,
  format: 'YYYY-MM-DD-[{category}][.log]'
});

// router use : this.logger.error(new Error(''))
app.context.logger = logger;

const onerror = require('koa-onerror');
onerror(app);

const views = require('koa-views');
app.use(views(__dirname + '/views', {
  map: {
    html: 'swig'
  }
}));

const session = require('koa-session');
app.use(session(app));

// post body 解析
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
// 数据校验
const validator = require('koa-validator');
app.use(validator());

// 静态文件cache
const staticCache = require('koa-static-cache');
const staticDir = config.staticDir;
app.use(staticCache(`${staticDir}/scripts`));
app.use(staticCache(`${staticDir}/styles`));

// 路由
const router = require('koa-router')();

// 应用路由
const appRouter = require('./router');
appRouter(router);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.port);
console.log('listening on port %s', config.port);

module.exports = app;

