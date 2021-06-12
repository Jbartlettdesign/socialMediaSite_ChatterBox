//user facing routes
const router = require('express').Router();
const { create } = require('express-handlebars');
/////////////////
const sequelize = require('../config/connection');
const{Post, User, Comment} = require('../models');

   
    router.get('/', (req, res) => {
      console.log(req.session);
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
              attributes: ['id', 'comment_text', 'post_id', 'user_id','created_at'],
              include: {
                model: User,
                attributes: ['username', 'user_pic']
              }
            },
            {
              model: User,
              attributes: ['username','user_pic']
            }
          ]
        })
          .then(dbPostData => {
            // pass a single post object into the homepage template
            //console.log(dbPostData[0]);

            const posts = dbPostData.map(post => 
                post.get({plain: true}))
            res.render('homepage', { posts });
            //console.log(posts[0].comments);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });
      router.get('/login', (req,res) => {
        if (req.session.loggedIn) {
          res.redirect('/');
          return;
        }
        res.render('login');
      });

      ///////////////////////////////////////
      router.get('/post/:id', (req, res) => {
        /*const post = {
          id: 1,
          post_url: 'https://handlebarsjs.com/guide/',
          title: 'Handlebars Docs',
          created_at: new Date(),
          vote_count: 10,
          comments: [{}, {}],
          user: {
            username: 'test_user'
          }
        };*/
        Post.findOne({
          where:{
            id:req.params.id
          },
          attributes:[
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'), 'likes']

          ],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
            if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
            }
      
            // serialize the data
            const post = dbPostData.get({ plain: true });
      
            // pass data to template
            res.render('single-post', { post });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });

        });
      ///////////////////////////////////////////
module.exports = router;