const path = require('path');
const sequelize = require('../common/db');

function load(name) {
  return sequelize.import(path.join(__dirname, name));
}

module.exports = {
  sequelize,
  User: load('user'),
  * query(sql, args) {
    const options = { replacements: args };
    const data = yield this.sequelize.query(sql, options);
    if (/select /i.test(sql)) {
      return data[0];
    }
    return data[1];
  },
  * queryOne(sql, args) {
    const rows = yield* this.query(sql, args);
    return rows && rows[0];
  }
};
