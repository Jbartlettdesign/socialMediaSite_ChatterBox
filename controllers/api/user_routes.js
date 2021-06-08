
const router = require('express').Router();
const session = require('express-session');
const { User, Post, Likes } = require('../../models');
///////////////////////////// GET /api/users

router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    }).then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);

    });
});
///////////////////////// GET /api/users/1

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include:
    [{
        model:Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id'],
        include:{
            model:User,
            attributes:['username']
        }
    },
        {
            model:Post,
            attributes: ['id', 'title', 'post_url', 'created_at']
        },
        {
            model:Post,
            attributes: ['title'],
            through: Likes,
            as: 'post_likes'
        }
    ]
    /*{
  "id": 1,
  "username": "JohnBartlett",
  "email": "jbartlettdesign@gmail.com",
  "posts": [
    {
      "id": 1,
      "title": "hello test 1",
      "post_url": "www.helloworld.com",
      "created_at": "2021-06-04T01:39:53.000Z"
    }
  ],
  "post_likes": [
    {
      "title": "hello test 1",
      "likes": {
        "id": 1,
        "user_id": 1,
        "post_id": 1
      }
    }
  ]
}*/
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message: "No user found with this id"});
            return;
        }
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// POST /api/users
router.post('/', (req, res) => {
  
    User.create({
        user_pic:req.body.user_pic,
        username:req.body.username,
        email: req.body.email,
        password:req.body.password
    })
    //send it otherwise if theres an error tell the error
    /*.then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });*/
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            
console.log(session.user_id)
            res.json(dbUserData);        
        });
    });
});

// PUT /api/users/1 updating user
router.put('/:id', (req, res) => {
    User.update(req.body, {

        //we need this for hooking the bcrypt to work
        individualHooks: true,
        where: { 
            id: req.params.id
        }
    }).then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({message: "this user does not exist"});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)    
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message:  "this user does not exist"});
            return;
        }
        res.json(dbUserData);

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
////////////////api/users/login
router.post('/login', (req, res) => {
// expects {email: 'lernantino@gmail.com', password: 'password1234'}
User.findOne({
    where: {
        email: req.body.email
    }
}). then(dbUserData => {
    if(!dbUserData){
        res.status(404).json({message: "this user does not exist"});
        return;
    }
    //next verify password if email exists
    //calling User model 
    const validPassword = dbUserData.checkPassword(req.body.password);
    if(!validPassword){
        res.status(400).json({message: 'Incorrect password!'})    
        return;
}
//all good 
req.session.save(() => {
    // declare session variables
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;

res.json({user: dbUserData, message: 'You are now logged in!'});
});
});
  });

//////////////////////////////////////
router.post('/logout', (req, res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else{
        res.status(404).end();
        console.log("failed to load");
    }
});
module.exports = router;
