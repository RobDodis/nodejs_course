'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserEvent extends Model {
    static associate({ User, Event }) {
      UserEvent.belongsTo(User, {
        as: 'user',
        foreignKey: 'userId',
      });
      UserEvent.belongsTo(Event, {
        as: 'event',
        foreignKey: 'eventId',
      });
    }
  }
  UserEvent.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      eventId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Event',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'UserEvent',
    }
  );
  return UserEvent;
};
