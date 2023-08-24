import { DataTypes } from "sequelize";

export default function (sequelize) {
  const User = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   allowNull: false,
    //   primaryKey: true,
    // },
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   isEmail: true,
    //   unique: true,
    // },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // },
    // {
    //   /**
    //    * Other model options go here
    //    */
    // }
  );

  User.prototype.toJSON = function () {
    let obj = this.dataValues;
    delete obj.password;
    return obj;
  };

  return User;
}
