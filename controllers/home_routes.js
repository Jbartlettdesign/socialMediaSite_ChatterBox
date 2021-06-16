//user facing routes
const router = require('express').Router();
const { create } = require('express-handlebars');
/////////////////
const sequelize = require('../config/connection');
const{Post, User, Comment, Likes} = require('../models');

   
    router.get('/', (req, res) => {
      console.log(req.session);
        Post.findAll({order:[['created_at', 'DESC']],
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
                attributes: ['username', 'user_pic', 'id']
              }
            },
            {
              model: User,
              attributes: ['username','user_pic', 'id']
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
      
      ///////////////////////////////////////
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
                attributes: ['username','user_pic', 'id']
              }
            },
            {
              model: User,
              attributes: ['username','user_pic', 'id']
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
                  console.log(post);

            // pass data to template
            res.render('single-post', { post });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });

        });
      ///////////////////////////////////////////
      router.get('/user/posts/:id', (req, res) => {
        User.findOne({
          attributes: { exclude: ['password'] },

            where: {
                id: req.params.id
            },
            include:
            [{
              model:Post,
              attributes: ['id', 'title', 'post_url', 'created_at'],
              include:{
                model:User,
                attributes:['username', 'user_pic', 'id']
        }
             
          
        
      },
          
          
      {
              model:Post,
              attributes: ['title'],
              through: Likes,
              as: 'post_likes'
      }
      ]
       
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: "No user found with this id"});
                return;
            } var p = dbUserData.posts;
            const users = p.map(user => 

            user.get({plain: true}));
          res.render('user', { users });
              //console.log(dbUserData.posts)
            // pass data to template
            //res.json(dbUserData.posts);
          }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
    
module.exports = router;