module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    classMethods: {
      * findByName(name) {
        return yield this.find({ where: { name: name } });
      }
    }
  });

  return User;
};
