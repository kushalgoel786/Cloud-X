import { DataTypes } from "sequelize";

export default function (sequelize) {
  const User = sequelize.define("user2", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.prototype.toJSON = function () {
    let obj = this.dataValues;
    delete obj.password;
    return obj;
  };

  return User;
}
