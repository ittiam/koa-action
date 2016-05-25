var controller = require('../controller/index');
module.exports = function(router){
  //首页
  router.get('/', controller.index);
};
