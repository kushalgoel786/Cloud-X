import { DataTypes } from "sequelize";

export default function (sequelize) {
  const File = sequelize.define(
    "file",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      sharedWith: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
    }
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   allowNull: false,
    //   primaryKey: true,
    // },
    // {
    //   /**
    //    * Other model options go here
    //    */
    // }
  );
  return File;
}
