const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Beerlist extends Model {}

Beerlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    beer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'beer',
          key: 'id',
        },
    },
    drank:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false,
    }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'beerlist',
      }  
);

module.exports = Beerlist;