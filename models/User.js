const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// use special Sequelize functions called hooks in the model. 
//Also known as lifecycle events, hooks are functions that are called before or after calls in Sequelize.
const bcrypt = require('bcrypt');
class User extends Model{
// set up method to run on instance data (per user) to check password comparing the plain text to hashed password
/////////////////////////////////important for checking password hash!!!!!!!!!!!!!
checkPassword(loginPw){
    return bcrypt.compareSync(loginPw, this.password);
    //////////////////////////////////////////////
}
}
//create the user
User.init({
    id:
    {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    user_pic:{
        type:DataTypes.STRING,
        allowNull:false,
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
    hooks: 
        {
        /*beforeCreate(userData){
            //10 is saltrounds/level of protection needed to break
            return bcrypt.hash(userData.password, 10). then(newUserData => {
                return newUserData
            });
        }*/
        //more elegant version from top code
        async beforeCreate(newUserData){
            //10 is saltrounds/level of protection needed to break
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
            },
            //protection on the update
            async beforeUpdate(newUserData){
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }
        },


    sequelize,
    timestamps: false,
    freezeTableName:true,
    underscored:true,
    modelName:'user'

}
);
module.exports = User;