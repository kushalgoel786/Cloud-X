import { DataTypes } from "sequelize";

export default function (sequelize) {
  const File = sequelize.define("file2", {
    name: DataTypes.STRING,
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user2s",
        key: "id",
      },
    },
    // name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // owner: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });
  return File;
}
