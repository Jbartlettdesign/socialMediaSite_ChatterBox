const router = require('express').Router();
const session = require('express-session');
const multer = require('multer');
const uuid = require('uuid').v4;
/////////////////////
////////////////////
///////////////////
const storage = multer.diskStorage({
destination: (req, file, callBack) => {
callBack(null, 'public/uploads');
},
filename:(req, file, callBack) => {
    const {originalname} = file;
    callBack(null, originalname);
    console.log(file);
}
});
const upload = multer({ storage});

router.post('/upload', upload.single('filename'), (req,res)=> {
    //return res.json({status: 'OK'})
    //document.getElementsByName('picture')[0].placeholder='new text for lname';
    //console.log(upload);
});

/////////////////
/////////////////
//////////////////
const{Post, User, Likes, Comment} = require('../../models');
const sequelize = require('../../config/connection');
const { response } = require('express');
router.get('/', (req, res) => {
    Post.findAll({order:[['created_at', 'DESC']],
        attributes: ['id', 'post_url', 'title', 'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'), 'likes']
    ],
        //////////ORDER IS DESCENDING FROM NEWEST TO OLDEST
        
        include: [
            {
                model:Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include:{
                    model:User,
                    attributes:['username',  'user_pic']
                }
            },

            {
                model:User,
                attributes:['username', 'user_pic']
            }
        ]
    })
    .then(dbPostData => 
        res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id:req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'), 'likes']
    ],
        include:[
            {
                model:Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include:{
                    model:User,
                    attributes:['username']
                }
            },
            {
            model:User,
            attributes:['username']
            }
        ]
    }).then(dbPostData => {
        if(!dbPostData){
            //The 404 status code identifies a user error and will need a different request for a successful response.
            res.status(404).json({message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.post('/', (req, res) => {
    console.log(req.session.user_id)
    Post.create({
        title:req.body.title,
        post_url: req.body.post_url,
        //user_id: req.body.user_id
        user_id: req.session.user_id
    }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// PUT /api/posts/likes
/////////////liking a post
router.put('/likes', (req, res) => {
    /*Likes.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id
    }).then(() => {
        return Post.findOne({
            where: {
                id:req.body.post_id
            },
                attributes: [
                    'id', 'post_url', 'title', 'created_at',
                [
                sequelize.literal('(SELECT COUNT(*) FROM likes where post.id = likes.post_id)'),
                'likes'
                ]   
            ]
    })*/
    Post.liking(req.body, { Likes })
    
    .then(updatedPostData => 
        res.json(updatedPostData))
        .catch(err => { 
            
        res.status(400).json(err);
    
});
});

////////////////////////////
router.put('/:id', (req, res) => {
    Post.update({
        title: req.body.title
    },
    {
        where:{
            id: req.params.id
        }
    }).then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.delete('/:id', (req,res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//////////////////////
/*router.post('/saveImage', (req, res) => {
    const fileName = req.files.myFile.name
    const path = __dirname + '/images/' + fileName
  
    image.mv(path, (error) => {
      if (error) {
        console.error(error)
        res.writeHead(500, {
          'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({ status: 'error', message: error }))
        return
      }
  
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }))
    })
  })
*/
module.exports = router;
