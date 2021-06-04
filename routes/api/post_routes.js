const router = require('express').Router();
const{Post, User, Likes, Comment} = require('../../models');
const sequelize = require('../../config/connection')
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
                    attributes:['username']
                }
            },

            {
                model:User,
                attributes:['username']
            }
        ]
    }).then(dbPostData => 
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
    Post.create({
        title:req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
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

module.exports = router;