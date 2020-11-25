'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static getOwnAttributes() {
      return ['firstName', 'lastName', 'email', 'id'];
    }

    static associate({ Event, UserEvent }) {
      User.hasMany(Event, { sourceKey: 'id', foreignKey: 'creatorId' });
      User.belongsToMany(Event, {
        through: UserEvent,
        as: 'participateIn',
        foreignKey: 'userId',
        otherKey: 'eventId',
      });
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
