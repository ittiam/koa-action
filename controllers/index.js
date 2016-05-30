var User = require('../models').User;
var parse = require('co-body');

module.exports = {
  index: function* () {
    yield this.render('index', {'title': 'koa demo'});
  },
  create: function* () {
    var body = this.request.body;

    var user = yield User.create({ name: body.username });
    this.body = user;
  }
}
