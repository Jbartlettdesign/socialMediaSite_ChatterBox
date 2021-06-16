const router = require('express').Router();
const session = require('express-session');
const{Post, User, Likes, Comment} = require('../../models');
const sequelize = require('../../config/connection');
const { response } = require('express');
router.get('/', (req, res) => {
    Likes.findAll({        

        attributes: ['id', 'post_id', 'user_id', 'liker'],
        /*where: {
            id: req.session.user_id,
            //id: req.params.id
        }*/
        
        
        include: [
            {
                model:Post,
                attributes:['title']
            }
            ,
            {
                model:User,
                attributes:['username', 'id']
            }
        ]
    })
    .then(dbLikeData => 
        //console.log(dbLikeData))
        res.json(dbLikeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
        
});

module.exports = router;