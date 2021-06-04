//index in routes/api
const router = require('express').Router();

const userRoutes = require('./user_routes');
const postRoutes = require('./post_routes');
//const likeRoutes = require('./like_routes');
const commentRoutes = require('./comment_routes');
//this is where the users after api comes from
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
//router.use('/likes', likeRoutes);
router.use('/comments', commentRoutes);
module.exports = router;