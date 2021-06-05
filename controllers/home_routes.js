//user facing routes
const router = require('express').Router();
/////////////////
const sequelize = require('../config/connection');
const{Post, User, Comment} = require('../models');

   
    router.get('/', (req, res) => {
        Post.findAll({
          attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'), 'likes']
          ],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
              model: User,
              attributes: ['username']
            }
          ]
        })
          .then(dbPostData => {
            // pass a single post object into the homepage template
            //console.log(dbPostData[0]);

            const posts = dbPostData.map(post => 
                post.get({plain: true}))
            res.render('homepage', { posts });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });
module.exports = router;