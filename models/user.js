module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    classMethods: {
      findByName: function* (name) {
        return yield this.find({ where: { name: name } })
      }
    }
  });

  return User;
}
