import { DataTypes } from "sequelize";

export default function (sequelize) {
  const File = sequelize.define(
    "file",
    {
      name: DataTypes.STRING,
      owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user2s",
          key: "id",
        },
      },
    }
      // id: {
      //   type: DataTypes.INTEGER,
      //   autoIncrement: true,
      //   allowNull: false,
      //   primaryKey: true,
      // },
      // name: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // owner: {
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
  return File;
}
