var debug = require('debug')('koa-action');
var koa = require('koa');
//配置文件
var config = require('./config/config');

var app = koa();
app.use(function* (next){
  //config 注入中间件，方便调用配置信息
  if (!this.config) {
    this.config = config;
  }
  yield next;
});

//log记录
var Logger = require('mini-logger');
var logger = Logger({
  dir: config.logDir,
  format: 'YYYY-MM-DD-[{category}][.log]'
});

//router use : this.logger.error(new Error(''))
app.context.logger = logger;

var onerror = require('koa-onerror');
onerror(app);

var views = require('koa-views');
app.use(views(__dirname + '/views', {
  map: {
    html: 'swig'
  }
}));

var session = require('koa-session');
app.use(session(app));

//post body 解析
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());
//数据校验
var validator = require('koa-validator');
app.use(validator());

//静态文件cache
var staticCache = require('koa-static-cache');
var staticDir = config.staticDir;
app.use(staticCache(staticDir + '/scripts'));
app.use(staticCache(staticDir + '/styles'));

//路由
var router = require('koa-router')();

//应用路由
var appRouter = require('./router');
appRouter(router);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.port);
console.log('listening on port %s', config.port);

module.exports = app;

