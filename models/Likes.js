const{ Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
 class Likes extends Model{}
 Likes.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'user',
                key:'id'
            }
        },
        liker:{
            type:DataTypes.STRING,
            allowNull:false
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'post',
              key: 'id'
            }
          }

    },
    {
        sequelize,
        timestamps: true,
        freezeTableName:true,
        underscored: true,
        modelName: 'likes'
    }
 );
 module.exports= Likes;