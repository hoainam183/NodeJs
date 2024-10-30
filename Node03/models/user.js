"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasOne(models.Phone, {
      //   foreignKey:"user_id",
      //   as:'phone'
      // }),
      // User.hasMany(models.Post, {
      //   foreignKey:'user_id',
      // }),
      // User.belongsToMany(models.Course, {
      //   foreignKey:'user_id',
      //   through:'courses_users',
      //   as:'courses',
      // })

      User.belongsToMany(models.Role, {
        foreignKey: 'user_id',
        through: 'users_roles',
        as: 'roles'
      })
    }
  }
  User.init(
    {
      //Khai báo các cột trong table
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      provider_id: DataTypes.INTEGER
    },
    {
      //Options
      sequelize,
      modelName: "User",
      tableName: "users",
      //Mặc định sequelize sẽ tự động khai báo trường createdAt và UpdatedAt
      // Nếu muốn vô hiệu hóa 2 trường này, khai báo timestamp: false
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      // paranoid: true, // Kích hoạt xóa mềm (timestamps: true)
    }
  );
  return User;
};
