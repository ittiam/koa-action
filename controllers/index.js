var User = require('../models').User;

module.exports = {
  index: function* () {
    yield this.render('index', {'title': 'koa demo'});
  },
  create: function* () {
    var body = this.request.body;

    var user = yield User.create({ name: body.username });
    this.body = user;
  },
  user: function* () {
    var name = this.params.name;
    var user = yield User.findByName(name);
    if (!user) {
      this.body = {
        error: 'user not found!',
        message: '未找到用户 ' + name
      }
      return;
    }
    yield this.render('user', user);
  }
}
