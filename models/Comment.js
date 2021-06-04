const{ Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model{}

Comment.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement:true
           },
        comment_text:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                //string length
                len: [1]
            }
        },
        post_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'post',
              key: 'id'
            }
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'user',
              key: 'id'
            }
        }
    

    },
    {
        sequelize,
        timestamps:true,
        freezeTableName: true,
        underscored:true,
        modelName: 'comment'
    }
);
module.exports = Comment;