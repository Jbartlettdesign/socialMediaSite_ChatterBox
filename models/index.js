//model's index
const User = require('./User');
const Post = require('./Post');
const Likes = require('./Likes');
const Comment = require('./Comment');


//////model association
User.hasMany(Post, {
    foreignKey: 'user_id'
});
Post.belongsTo(User, {
    foreignKey:'user_id'
});
/////allows us to see which user liked a post
///cannot be the same as model name
User.belongsToMany(Post, {
    through: Likes,
    as: 'post_likes',
    foreignKey:'user_id'
});
Post.belongsToMany(User, {
    through: Likes,
    as: 'post_likes',
    foreignKey: 'post_id'
});

/////////////connecting post and likes and user and likes
Likes.belongsTo(User, {
    foreignKey: 'user_id'
});

Likes.belongsTo(Post, {
    foreignKey: 'post_id'
})
User.hasMany(Likes, {
    foreignKey: 'user_id'
});
Post.hasMany(Likes, {
    foreignKey: 'post_id'
});
///////////////////////

///comments no through table, don't need to access post through comment

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
Comment.belongsTo(Post, {
    foreignKey: 'post-id'
});
User.hasMany(Comment, {
    foreignKey: 'user_id',
});
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Likes, Comment };