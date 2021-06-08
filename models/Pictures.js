const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Picture extends Model{}
Picture.init({
    pic:
    {
        type: DataTypes.STRING,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },

    sequelize,
    timestamps: false,
    freezeTableName:true,
    underscored:true,
    modelName:'pic'
  
    });