const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class User extends Model{}
//create the user
User.init({
    id:
    {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    username:
    {
        type:DataTypes.STRING,
        allowNull:false  
    },
    email: 
    {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password: 
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            //pass length
            len: [5]
        }

    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName:true,
    underscored:true,
    modelName:'user'

});
module.exports = User;