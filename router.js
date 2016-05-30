var controller = require('./controllers/index');

module.exports = function(router) {
  //首页
  router.get('/', controller.index);
  router.post('/create', controller.create);
  router.get('/user/:name', controller.user)
};
