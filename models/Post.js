const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model{
    static liking(body, models){
        return models.Likes.create({
            user_id:body.user_id,
            post_id:body.post_id,
            liker:body.liker
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'created_at',
                    [
                      sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'),
                      'likes'
                    ]
                  ]
            });
        });
    }
}

Post.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement:true
        },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    //////////////turn this off
    post_url:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isURL: true
        }
    },
    ///////////////////////FORIEGN KEY!!!!!!!!!!!!! user_id is what is taken and used
    user_id:
    {
        type:DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
    
},
{
    sequelize,
    timestamps: true,
    freezeTableName:true,
    underscored:true,
    modelName: 'post'
});

module.exports = Post;