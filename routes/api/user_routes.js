
const router = require('express').Router();
const { User } = require('../../models');
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
        }
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
        username:req.body.username,
        email: req.body.email,
        password:req.body.password
    })
    //send it otherwise if theres an error tell the error
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
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
res.json({user: dbUserData, message: 'You are now logged in!'});
});
  
  });
module.exports = router;
