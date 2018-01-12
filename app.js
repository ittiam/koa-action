const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello, koa2!</h1>';
});

// 在端口 8360 监听:
app.listen(8360);
console.log('app started at port 8360...');
