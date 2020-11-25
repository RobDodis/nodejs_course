'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static getOwnAttributes() {
      return ['id', 'title', 'date', 'location', 'creatorId'];
    }

    static associate({ User, UserEvent }) {
      Event.Creator = Event.belongsTo(User, {
        as: 'creator',
        foreignKey: 'creatorId',
      });
      Event.Participants = Event.belongsToMany(User, {
        through: UserEvent,
        as: 'participants',
        foreignKey: 'eventId',
        otherKey: 'userId',
      });
    }
  }
  Event.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      creatorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      title: {
        type: DataTypes.STRING,
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
        set(value) {
          this.setDataValue('date', new Date(value));
        },
      },
    },
    {
      sequelize,
      modelName: 'Event',
    }
  );
  return Event;
};
