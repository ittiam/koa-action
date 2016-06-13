const User = require('../models').User;

module.exports = {
  * index() {
    yield this.render('index', {'title': 'koa demo'});
  },
  * create() {
    const body = this.request.body;

    const user = yield User.create({ name: body.username });
    this.body = user;
  },
  * user() {
    const name = this.params.name;
    const user = yield User.findByName(name);
    if (!user) {
      this.body = {
        error: 'user not found!',
        message: `未找到用户 + ${name}`
      };
      return;
    }
    yield this.render('user', user);
  }
};
